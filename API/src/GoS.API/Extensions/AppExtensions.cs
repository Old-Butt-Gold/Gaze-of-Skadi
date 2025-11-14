using AutoMapper;
using GoS.API.Middleware;

namespace GoS.API.Extensions;

public static class AppExtensions
{
    public static IApplicationBuilder UseApiExceptionHandler(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionHandlerMiddleware>();
    }
    
    public static void AssertAutoMapperConfigurationValid(this IApplicationBuilder app, IServiceProvider services)
    {
        using var scope = services.CreateScope();

        var serviceProvider = scope.ServiceProvider;

        var mapper = serviceProvider.GetRequiredService<IMapper>();
        var configProvider = mapper.ConfigurationProvider;
        
        configProvider.AssertConfigurationIsValid();
        configProvider.CompileMappings();
    }
}
