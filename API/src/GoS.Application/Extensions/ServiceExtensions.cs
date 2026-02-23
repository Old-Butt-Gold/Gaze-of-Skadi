using System.Net;
using FluentValidation;
using GoS.Application.Behaviors;
using GoS.Application.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http.Resilience;
using Microsoft.Extensions.Options;
using Polly;

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
        /*
            services.AddAutoMapper(cfg => {
                cfg.AddMaps(typeof(AssemblyReference).Assembly);
            });
        */
        services.AddAutoMapper((serviceProvider, config) =>
        {
            config.ConstructServicesUsing(serviceProvider.GetRequiredService);
        }, typeof(AssemblyReference).Assembly);
    }

    public static IHttpClientBuilder AddResilientHttpClient<TClientInterface, TClient, TOptions>(this IServiceCollection services, string pipelineName, 
        Action<IServiceProvider, HttpClient>? configureClient = null)
        where TClientInterface : class
        where TClient : class, TClientInterface
        where TOptions : HttpRequesterOptions
    {
        var builder = services
            .AddHttpClient<TClientInterface, TClient>((sp, client) =>
            {
                var opts = sp.GetRequiredService<IOptionsMonitor<TOptions>>().CurrentValue;
                client.BaseAddress = new Uri(opts.BaseAddress!);
                client.Timeout = Timeout.InfiniteTimeSpan;
                configureClient?.Invoke(sp, client);
            })
            .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                AutomaticDecompression = DecompressionMethods.GZip |
                                         DecompressionMethods.Deflate |
                                         DecompressionMethods.Brotli
            });

        builder.AddResilienceHandler(pipelineName, (resilienceBuilder, ctx) =>
        {
            var opts = ctx.ServiceProvider
                .GetRequiredService<IOptionsMonitor<TOptions>>()
                .CurrentValue;

            // Layer 1 – total deadline covering all retries combined
            resilienceBuilder.AddTimeout(TimeSpan.FromSeconds(opts.TimeoutSeconds * (opts.RetryCount + 1)));

            // Layer 2 – retry with exponential back-off + full jitter (prevents thundering-herd)
            resilienceBuilder.AddRetry(new HttpRetryStrategyOptions
            {
                MaxRetryAttempts = opts.RetryCount,
                BackoffType = DelayBackoffType.Exponential,
                UseJitter = true,
                Delay = TimeSpan.FromSeconds(opts.RetryMedianDelaySeconds),
                // Only retry on transient errors; deterministic failures (400, 401, 404…) are not retried.
                ShouldHandle = static args => args.Outcome switch
                {
                    { Exception: HttpRequestException } => PredicateResult.True(),
                    { Result.StatusCode: HttpStatusCode.TooManyRequests } => PredicateResult.True(),
                    { Result.StatusCode: HttpStatusCode.ServiceUnavailable } => PredicateResult.True(),
                    { Result.StatusCode: HttpStatusCode.GatewayTimeout } => PredicateResult.True(),
                    { Result.StatusCode: HttpStatusCode.BadGateway } => PredicateResult.True(),
                    _ => PredicateResult.False()
                }
            });

            // Layer 3 – circuit-breaker: fast-fails when upstream is clearly down
            resilienceBuilder.AddCircuitBreaker(new HttpCircuitBreakerStrategyOptions
            {
                MinimumThroughput = opts.CircuitBreakerFailureThreshold,
                FailureRatio = 0.5,
                SamplingDuration = TimeSpan.FromSeconds(30),
                BreakDuration = TimeSpan.FromSeconds(opts.CircuitBreakerBreakDurationSeconds),
                ShouldHandle = static args => args.Outcome switch
                {
                    { Exception: HttpRequestException } => PredicateResult.True(),
                    { Result.StatusCode: HttpStatusCode.ServiceUnavailable } => PredicateResult.True(),
                    { Result.StatusCode: HttpStatusCode.GatewayTimeout } => PredicateResult.True(),
                    _ => PredicateResult.False()
                }
            });

            // Layer 4 – per-attempt timeout (innermost)
            resilienceBuilder.AddTimeout(TimeSpan.FromSeconds(opts.TimeoutSeconds));
        });

        return builder;
    }
}