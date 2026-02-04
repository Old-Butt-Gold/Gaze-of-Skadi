namespace GoS.Application.Options;

public class StratzHttpRequesterOptions
{
    public const string ConfigurationPath = "StratzRequester";

    public string? BaseAddress { get; set; }
    public int TimeoutSeconds { get; set; } = 60;
    public string? ApiKey { get; set; }
}
