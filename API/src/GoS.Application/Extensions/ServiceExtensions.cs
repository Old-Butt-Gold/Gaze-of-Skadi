using FluentValidation;
using GoS.Application.Behaviors;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis.Profiling;

namespace GoS.Application.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureExchangeRedis(this IServiceCollection services, IConfiguration configuration)
    {
        var redisSection = configuration.GetSection("Redis");
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisSection["Configuration"];
            options.InstanceName = redisSection["InstanceName"];
        });
    }

    public static void ConfigureMediatR(this IServiceCollection services)
    {
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(typeof(AssemblyReference).Assembly);
            config.AddOpenBehavior(typeof(LoggingBehavior<,>));
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
            config.AddOpenBehavior(typeof(CachingBehavior<,>));
        });
    }

    public static void ConfigureFluentValidation(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddValidatorsFromAssemblyContaining(typeof(AssemblyReference));
    }
}
