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
        return Ok(User.Claims
            .Where(x => x.Type.StartsWith(SteamAuthenticationDefaults.AuthenticationScheme))
            .ToDictionary(x => x.Type.ToLowerInvariant(), x => x.Value));
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