using System.Net.Http.Headers;
using GoS.Application.Abstractions;
using GoS.Application.Extensions;
using GoS.Application.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Infrastructure.Requester.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureOpenDotaRequester(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<OpenDotaHttpRequesterOptions>(
            configuration.GetSection(OpenDotaHttpRequesterOptions.ConfigurationPath));

        services.AddResilientHttpClient<IRequester<OpenDotaHttpRequesterOptions>, OpenDotaRequester, OpenDotaHttpRequesterOptions>(
            pipelineName: "opendota-resilience",
            configureClient: static (_, client) =>
            {
                client.DefaultRequestHeaders.AcceptEncoding.Clear();
                client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));
                client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("deflate"));
                client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("br"));
                client.DefaultRequestHeaders.Add("origin", "https://www.opendota.com");
                client.DefaultRequestHeaders.Add("referer", "https://www.opendota.com");
            });
    }
}
