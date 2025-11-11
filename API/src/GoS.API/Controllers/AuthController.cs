using System.Security.Claims;
using AspNet.Security.OpenId.Steam;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        var steamId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var steamName = user.Identity?.Name;

        return Ok(new
        {
            IsAuthenticated = user.Identity?.IsAuthenticated ?? false,
            SteamId = steamId,
            SteamName = steamName,
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