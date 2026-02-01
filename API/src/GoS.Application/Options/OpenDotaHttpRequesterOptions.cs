namespace GoS.Application.Options;

public class OpenDotaHttpRequesterOptions
{
    public const string ConfigurationPath = "OpenDotaRequester";

    public string? BaseAddress { get; set; }
    public int TimeoutSeconds { get; set; } = 60;
    public string? ApiKey { get; set; }
}
