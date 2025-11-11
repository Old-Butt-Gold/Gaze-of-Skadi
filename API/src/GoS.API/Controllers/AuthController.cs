using System.Security.Claims;
using AspNet.Security.OpenId.Steam;
using GoS.Application.Abstractions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISteamService _steamService;

    public AuthController(ISteamService steamService)
    {
        _steamService = steamService;
    }
    
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
    public async Task<IActionResult> GetProfile()
    {
        var user = User;
        var steamId64 = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var steamName = user.Identity?.Name;

        var playerSummary = await _steamService.GetPlayerSummaryAsync(steamId64);
        var steamId32 = _steamService.ConvertSteamIdTo32(playerSummary.SteamId);

        return Ok(new
        {
            IsAuthenticated = user.Identity?.IsAuthenticated ?? false,
            SteamId64 = playerSummary.SteamId,
            SteamId32 = steamId32,
            SteamName = steamName,
            playerSummary.ProfileUrl,
            Avatar = new 
            {
                Small = playerSummary.Avatar,
                Medium = playerSummary.AvatarMedium,
                Full = playerSummary.AvatarFull
            },
            playerSummary.RealName,
            ProfileCreated = playerSummary.TimeCreated > 0 ? 
                DateTimeOffset.FromUnixTimeSeconds(playerSummary.TimeCreated).DateTime : (DateTime?)null,
            LastLogoff = playerSummary.LastLogoff > 0 ? 
                DateTimeOffset.FromUnixTimeSeconds(playerSummary.LastLogoff).DateTime : (DateTime?)null,
        });
    }

    [HttpGet("status")]
    public IActionResult GetAuthStatus() =>
        Ok(new
        {
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
            UserName = User.Identity?.Name
        });
}