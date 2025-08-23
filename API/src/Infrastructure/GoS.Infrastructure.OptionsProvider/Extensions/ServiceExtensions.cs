using GoS.Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Infrastructure.OptionsProvider.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureSerializationOptionsProvider(this IServiceCollection services)
    {
        services.AddSingleton<ISerializationOptionsProvider, SerializationOptionsProvider>();
    }
}