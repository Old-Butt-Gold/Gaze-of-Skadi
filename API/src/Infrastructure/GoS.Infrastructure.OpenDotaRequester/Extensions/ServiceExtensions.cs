using System.Net;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace GoS.Infrastructure.Requester.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureRequester(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<OpenDotaHttpRequesterOptions>(configuration.GetSection(OpenDotaHttpRequesterOptions.ConfigurationPath));

        services.AddHttpClient<IRequester<OpenDotaHttpRequesterOptions>, OpenDotaRequester>((sp, client) =>
        {
            var opts = sp.GetRequiredService<IOptionsMonitor<OpenDotaHttpRequesterOptions>>().CurrentValue;
            client.BaseAddress = new Uri(opts.BaseAddress!);
            client.Timeout = TimeSpan.FromSeconds(opts.TimeoutSeconds);
        }).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate | DecompressionMethods.Brotli
        });
    }
}
