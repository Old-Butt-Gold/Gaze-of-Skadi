using GoS.Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Infrastructure.ResourceManager.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureResourceManager(this IServiceCollection services)
    {
        services.AddScoped<FileResourceManager>();
        services.AddScoped<IResourceManager, CachedFileResourceManager>();
    }
}