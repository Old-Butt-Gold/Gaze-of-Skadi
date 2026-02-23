namespace GoS.Application.Options;

public abstract class HttpRequesterOptions
{
    public string? BaseAddress { get; set; }
    public int TimeoutSeconds { get; set; } = 30;
    public string? ApiKey { get; set; }
    
    public int RetryCount { get; set; } = 3;
    
    public double RetryMedianDelaySeconds { get; set; } = 1.0;
    
    public int CircuitBreakerFailureThreshold { get; set; } = 5;
    
    public int CircuitBreakerBreakDurationSeconds { get; set; } = 30;
}

