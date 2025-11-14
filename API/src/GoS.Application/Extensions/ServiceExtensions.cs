using FluentValidation;
using GoS.Application.Behaviors;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Application.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureExchangeRedis(this IServiceCollection services, IConfiguration configuration)
    {
        var redisSection = configuration.GetSection("Redis");
        var isEnabled = redisSection.GetValue<bool>("Enabled");
    
        if (isEnabled)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = redisSection["Configuration"];
                options.InstanceName = redisSection["InstanceName"];
            });
        }
    }

    public static void ConfigureMediatR(this IServiceCollection services, IConfiguration configuration)
    {
        var isRedisEnabled = configuration.GetSection("Redis").GetValue<bool>("Enabled");

        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(typeof(AssemblyReference).Assembly);
            config.AddOpenBehavior(typeof(LoggingBehavior<,>));
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
        
            if (isRedisEnabled)
            {
                config.AddOpenBehavior(typeof(CachingBehavior<,>));
            }
        });
    }

    public static void ConfigureFluentValidation(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddValidatorsFromAssemblyContaining(typeof(AssemblyReference));
    }
    
    public static void ConfigureAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg => {
            cfg.AddMaps(typeof(AssemblyReference).Assembly);
        });
    }
}
