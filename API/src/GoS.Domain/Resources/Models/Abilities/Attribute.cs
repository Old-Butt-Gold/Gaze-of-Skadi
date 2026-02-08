using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Resources.Models.Abilities;

public class Attribute
{
    [JsonPropertyName("key")]
    public required string Key { get; set; }

    [JsonPropertyName("header")]
    public required string Header { get; set; }

    [JsonPropertyName("value")]
    public required List<string> Values { get; set; }

    [JsonPropertyName("generated")]
    public BooleanState? Generated { get; set; }
}
