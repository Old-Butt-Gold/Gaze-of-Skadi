using GoS.Infrastructure.Steam;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    [HttpGet("login")]
    public IActionResult Login(string returnUrl = "/") 
        => Challenge(new AuthenticationProperties { RedirectUri = returnUrl }, SteamAuthenticationDefaults.AuthenticationScheme);

    [Authorize]
    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        
        return Ok(new { message = "Successfully logged out" });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var user = User;
        
        var steamId64 = user.FindFirst(SteamClaimTypes.SteamId64)?.Value;
        var steamId32 = user.FindFirst(SteamClaimTypes.SteamId32)?.Value;
        var profileUrl = user.FindFirst(SteamClaimTypes.ProfileUrl)?.Value;
        var steamName = user.FindFirst(SteamClaimTypes.SteamName)?.Value;
        var realName = user.FindFirst(SteamClaimTypes.RealName)?.Value;
        
        var avatarSmall = user.FindFirst(SteamClaimTypes.Avatar)?.Value;
        var avatarMedium = user.FindFirst(SteamClaimTypes.AvatarMedium)?.Value;
        var avatarFull = user.FindFirst(SteamClaimTypes.AvatarFull)?.Value;
        
        var timeCreatedClaim = user.FindFirst(SteamClaimTypes.TimeCreated)?.Value;
        var lastLogoffClaim = user.FindFirst(SteamClaimTypes.LastLogoff)?.Value;
        
        DateTime? profileCreated = null;
        DateTime? lastLogoff = null;
        
        if (long.TryParse(timeCreatedClaim, out var timeCreatedLong))
        {
            profileCreated = DateTimeOffset.FromUnixTimeSeconds(timeCreatedLong).DateTime;
        }
        
        if (long.TryParse(lastLogoffClaim, out var lastLogoffLong))
        {
            lastLogoff = DateTimeOffset.FromUnixTimeSeconds(lastLogoffLong).DateTime;
        }

        return Ok(new
        {
            IsAuthenticated = user.Identity?.IsAuthenticated ?? false,
            SteamId64 = steamId64,
            SteamId32 = steamId32,
            SteamName = steamName,
            ProfileUrl = profileUrl,
            RealName = realName,
            Avatar = new 
            {
                Small = avatarSmall,
                Medium = avatarMedium,
                Full = avatarFull
            },
            ProfileCreated = profileCreated,
            LastLogoff = lastLogoff,
        });
    }

    [HttpGet("status")]
    public IActionResult GetAuthStatus()
    {
        var user = User;
        
        return Ok(new
        {
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
            UserName = user.FindFirst(SteamClaimTypes.SteamName)?.Value
        });
    }
}