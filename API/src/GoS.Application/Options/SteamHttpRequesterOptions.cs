namespace GoS.Application.Options;

public class SteamHttpRequesterOptions
{
    public const string ConfigurationPath = "SteamRequester";

    public string? BaseAddress { get; set; }
    public int TimeoutSeconds { get; set; } = 60;
    public string? ApiKey { get; set; }
}
