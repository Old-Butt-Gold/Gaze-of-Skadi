using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Infrastructure.Steam.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureSteamAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = SteamAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.Cookie.SameSite = SameSiteMode.Lax; 
                options.ExpireTimeSpan = TimeSpan.FromHours(24);
            })
            .AddSteam(options =>
            {
                options.ApplicationKey = configuration["Steam:ApplicationKey"];
            });
    }
}