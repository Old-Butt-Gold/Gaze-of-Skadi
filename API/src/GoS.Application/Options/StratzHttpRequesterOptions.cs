using System.ComponentModel.DataAnnotations;

namespace GoS.Application.Options;

public sealed class StratzHttpRequesterOptions : HttpRequesterOptions
{
    public const string ConfigurationPath = "StratzRequester";

    [Required(AllowEmptyStrings = false)]
    public new string? ApiKey { get; set; }
}
