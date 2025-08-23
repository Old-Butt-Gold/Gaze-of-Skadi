namespace GoS.Application.Options;

public class HttpRequesterOptions
{
    public const string ConfigurationPath = "HttpRequester";
    public string BaseAddress = "https://api.opendota.com/api/";
    public int TimeoutSeconds { get; set; } = 60;
    public string? ApiKey { get; set; }
}