using System.Net;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace GoS.Infrastructure.StratzRequester.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureStratzServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<StratzHttpRequesterOptions>(configuration.GetSection(StratzHttpRequesterOptions.ConfigurationPath));

        services.AddHttpClient<IRequester<StratzHttpRequesterOptions>, StratzHttpRequester>((sp, client) =>
        {
            var opts = sp.GetRequiredService<IOptionsMonitor<StratzHttpRequesterOptions>>().CurrentValue;
            client.BaseAddress = new Uri(opts.BaseAddress!);
            client.Timeout = TimeSpan.FromSeconds(opts.TimeoutSeconds);
        }).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate | DecompressionMethods.Brotli
        });
    }
}
