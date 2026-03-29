namespace GoS.Application.Options;

using System.ComponentModel.DataAnnotations;

public abstract class HttpRequesterOptions
{
    [Required, Url]
    public string? BaseAddress { get; set; }

    [Range(1, 300)]
    public int TimeoutSeconds { get; set; } = 30;

    // Опционально, валидируется в наследниках при необходимости
    public string? ApiKey { get; set; }

    [Range(0, 10)]
    public int RetryCount { get; set; } = 3;

    [Range(0.1, 60.0)]
    public double RetryMedianDelaySeconds { get; set; } = 1.0;

    [Range(1, 100)]
    public int CircuitBreakerFailureThreshold { get; set; } = 5;

    [Range(1, 300)]
    public int CircuitBreakerBreakDurationSeconds { get; set; } = 30;
}

