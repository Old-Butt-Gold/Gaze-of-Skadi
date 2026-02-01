using System.Net;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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

    public static void ConfigureSteamServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ISteamIdConverter, SteamIdConverter>();

        services.Configure<SteamHttpRequesterOptions>(configuration.GetSection(SteamHttpRequesterOptions.ConfigurationPath));

        services.AddHttpClient<IRequester<SteamHttpRequesterOptions>, SteamHttpRequester>((sp, client) =>
        {
            var opts = sp.GetRequiredService<IOptionsMonitor<SteamHttpRequesterOptions>>().CurrentValue;
            client.BaseAddress = new Uri(opts.BaseAddress!);
            client.Timeout = TimeSpan.FromSeconds(opts.TimeoutSeconds);
        }).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate | DecompressionMethods.Brotli
        });
    }
}
