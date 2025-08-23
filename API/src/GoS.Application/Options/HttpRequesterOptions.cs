namespace GoS.Application.Options;

public class HttpRequesterOptions
{
    public const string ConfigurationPath = "HttpRequester";
    
    public string? BaseAddress { get; set; }
    public int TimeoutSeconds { get; set; } = 60;
    public string? ApiKey { get; set; }
}