using GoS.API.Extensions;
using GoS.Application.Extensions;
using GoS.Infrastructure.OptionsProvider.Extensions;
using GoS.Infrastructure.Requester.Extensions;
using GoS.Infrastructure.ResourceManager.Extensions;
using GoS.Infrastructure.Steam.Extensions;
using GoS.Infrastructure.StratzRequester.Extensions;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.ConfigureControllers();
builder.Services.ConfigureCors();
builder.Services.ConfigureSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSerializationOptionsProvider();
builder.Services.ConfigureResourceManager();
builder.Services.ConfigureOpenDotaRequester(builder.Configuration);
builder.Services.ConfigureStratzServices(builder.Configuration);
builder.Services.ConfigureMemoryCache();
builder.Services.ConfigureMediatR(builder.Configuration);
builder.Services.ConfigureFluentValidation();
builder.Services.ConfigureExchangeRedis(builder.Configuration);
builder.Services.ConfigureSteamAuthentication(builder.Configuration);
builder.Services.ConfigureSteamServices(builder.Configuration);
builder.Services.ConfigureAutoMapper();
builder.Services.AddHealthChecks();

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
});

var app = builder.Build();

app.UseApiExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


// For correct IP definition
app.UseForwardedHeaders(new ForwardedHeadersOptions()
{
    ForwardedHeaders = ForwardedHeaders.All
});

app.UseCors("CorsGlobalPolicy");

app.UseAuthorization();
app.UseResponseCompression();

app.MapControllers();

app.MapHealthChecks("/health");

app.AssertAutoMapperConfigurationValid(app.Services);

app.Run();
