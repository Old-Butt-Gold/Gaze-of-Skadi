using GoS.API.Extensions;
using GoS.Application.Extensions;
using GoS.Infrastructure.OptionsProvider.Extensions;
using GoS.Infrastructure.Requester.Extensions;
using GoS.Infrastructure.ResourceManager.Extensions;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.ConfigureControllers();
builder.Services.ConfigureCors();
builder.Services.ConfigureSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSerializationOptionsProvider();
builder.Services.ConfigureResourceManager();
builder.Services.ConfigureRequester(builder.Configuration);
builder.Services.ConfigureMemoryCache();
builder.Services.ConfigureMediatR();
builder.Services.ConfigureFluentValidation();

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

app.MapControllers();

app.Run();
