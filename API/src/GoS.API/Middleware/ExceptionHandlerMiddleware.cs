using System.Diagnostics;
using System.Net;
using System.Text.Json;
using FluentValidation;
using GoS.Infrastructure.Steam;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GoS.API.Middleware;

public sealed class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlerMiddleware> _logger;
    private readonly ProblemDetailsFactory _problemDetailsFactory;
    private readonly IHostEnvironment _env;

    public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger,
        ProblemDetailsFactory problemDetailsFactory, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _problemDetailsFactory = problemDetailsFactory;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext httpContext, Exception ex)
    {
        var status = MapToStatusCode(ex);
        httpContext.Response.StatusCode = status;
        httpContext.Response.ContentType = "application/problem+json";

        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;
        var userId = httpContext.User.FindFirst(SteamClaimTypes.SteamId32)?.Value ?? "Anonymous";


        if (_env.IsDevelopment())
        {
            _logger.LogError(ex, "Exception caught by middleware, Message: {Message} | Type: {Type} | User: {User} | Path: {Path} | Method: {Method} | Status: {Status} | TraceId: {TraceId}", ex.Message, ex.GetType().Name, userId, httpContext.Request.Path, httpContext.Request.Method, status, traceId);
        }
        else
        {
            _logger.LogError("Exception caught by middleware | Type: {Type} | User: {User} | Path: {Path} | Method: {Method} | Status: {Status} | TraceId: {TraceId} | Message: {Message}", ex.GetType().Name, userId, httpContext.Request.Path, httpContext.Request.Method, status, traceId, ex.Message);
        }

        object problemDetails;

        if (ex is ValidationException vex)
        {
            var modelState = new ModelStateDictionary();
            foreach (var failure in vex.Errors)
            {
                var key = string.IsNullOrWhiteSpace(failure.PropertyName) ? "_" : failure.PropertyName;
                modelState.AddModelError(key, failure.ErrorMessage);
            }

            var vpd = _problemDetailsFactory.CreateValidationProblemDetails(
                httpContext,
                modelState,
                status,
                detail: _env.IsDevelopment() ? "Validation failed." : "One or more validation errors occurred.",
                instance: httpContext.Request.Path);

            vpd.Extensions["traceId"] = traceId;

            problemDetails = vpd;
        }
        else
        {
            var detail = (_env.IsDevelopment() || status != (int)HttpStatusCode.InternalServerError)
                ? ex.Message
                : "An internal server error occurred.";

            var pd = _problemDetailsFactory.CreateProblemDetails(
                httpContext, status,
                detail: detail, instance: httpContext.Request.Path);

            pd.Extensions["traceId"] = traceId;
            problemDetails = pd;
        }

        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
        };

        return httpContext.Response.WriteAsJsonAsync(problemDetails, jsonOptions);
    }

    private static int MapToStatusCode(Exception ex) =>
        ex switch
        {
            UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
            _ when ex.GetType().Name == "ConflictException" => StatusCodes.Status409Conflict,
            ValidationException => StatusCodes.Status400BadRequest,
            KeyNotFoundException => StatusCodes.Status404NotFound,
            TimeoutException => StatusCodes.Status504GatewayTimeout,
            OperationCanceledException => 499,
            HttpRequestException => StatusCodes.Status502BadGateway,
            _ => StatusCodes.Status500InternalServerError
        };
}
