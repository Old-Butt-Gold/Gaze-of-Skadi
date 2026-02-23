using GoS.Application.Abstractions;
using GoS.Application.Extensions;
using GoS.Application.Options;
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
                options.Cookie.SameSite = SameSiteMode.None;
                options.ExpireTimeSpan = TimeSpan.FromDays(7);
                options.Cookie.Name = "GoS.Auth";
            })
            .AddSteam(options =>
            {
                options.ApplicationKey = configuration[
                    $"{SteamHttpRequesterOptions.ConfigurationPath}:{nameof(SteamHttpRequesterOptions.ApiKey)}"];
            });
    }

    public static void ConfigureSteamServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ISteamIdConverter, SteamIdConverter>();

        services.Configure<SteamHttpRequesterOptions>(configuration.GetSection(SteamHttpRequesterOptions.ConfigurationPath));

        services.AddResilientHttpClient<IRequester<SteamHttpRequesterOptions>, SteamHttpRequester, SteamHttpRequesterOptions>(
            pipelineName: "steam-resilience");
    }
}
