using GoS.Application.Abstractions;
using GoS.Application.Extensions;
using GoS.Application.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Infrastructure.StratzRequester.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureStratzServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<StratzHttpRequesterOptions>(
            configuration.GetSection(StratzHttpRequesterOptions.ConfigurationPath));

        services.AddResilientHttpClient<IRequester<StratzHttpRequesterOptions>, StratzHttpRequester, StratzHttpRequesterOptions>(
            pipelineName: "stratz-resilience",
            configureClient: static (_, client) =>
            {
                client.DefaultRequestHeaders.UserAgent.ParseAdd("STRATZ_API");
            });
    }
}
