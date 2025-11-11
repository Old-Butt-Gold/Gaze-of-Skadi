using System.Reflection;
using System.Text.Json.Serialization;
using AspNet.Security.OpenId.Steam;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.OpenApi.Models;

namespace GoS.API.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureControllers(this IServiceCollection services)
    {
        /*services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });*/
        services.AddControllers(config =>
        {
            config.RespectBrowserAcceptHeader = true;
            config.ReturnHttpNotAcceptable = true;
            
        }).AddJsonOptions(opts => opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())); ;
    }
    
    public static void ConfigureMemoryCache(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMemoryCache();
    }

    public static void ConfigureSteamAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = SteamAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.LoginPath = "/api/login";
                options.LogoutPath = "/api/logout";
                options.Cookie.SameSite = SameSiteMode.Lax; 
                options.ExpireTimeSpan = TimeSpan.FromHours(24);
            })
            .AddSteam(options =>
            {
                options.ApplicationKey = configuration["Steam:ApplicationKey"];
                options.CallbackPath = "/api/steam-callback";
            });
    }
    
    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("CorsGlobalPolicy", builder =>
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
    }
    
    public static void ConfigureSwaggerGen(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo()
            {
                Version = "v1",
                Title = "Gaze of Skadi API",
                Contact = new OpenApiContact
                {
                    Name = "Andrey",
                    Url = new("https://github.com/Old-Butt-Gold"),
                    Email = "andrey2004andrey2021@gmail.com",
                },
                License = new OpenApiLicense
                {
                    Name = "MIT License",
                }
            });
            
            var basePath = AppContext.BaseDirectory;
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(basePath, xmlFile);
            options.IncludeXmlComments(xmlPath);
            
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.ApiKey,
                Description = "Enter 'Bearer' [space] and then your token in the text input below.\n\nExample: \"Bearer <token>\"",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Scheme = "Bearer",
                BearerFormat = "JWT",
            });
            
            options.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                    },
                    []
                }
            });
        });
    }
}