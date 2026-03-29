using System.ComponentModel.DataAnnotations;

namespace GoS.Application.Options;

public sealed class SteamHttpRequesterOptions : HttpRequesterOptions
{
    public const string ConfigurationPath = "SteamRequester";

    [Required(AllowEmptyStrings = false)]
    public new string? ApiKey { get; set; }
}
