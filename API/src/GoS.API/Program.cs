using GoS.API.Extensions;
using GoS.Application.Extensions;
using GoS.Infrastructure.OptionsProvider.Extensions;
using GoS.Infrastructure.Requester.Extensions;
using GoS.Infrastructure.ResourceManager.Extensions;

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsGlobalPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();