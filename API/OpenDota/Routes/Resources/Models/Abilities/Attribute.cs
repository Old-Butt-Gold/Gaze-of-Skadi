using System.Text.Json.Serialization;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Resources.Models.Abilities;

public class Attribute
{
    [JsonPropertyName("key")]
    public string Key { get; set; }

    [JsonPropertyName("header")]
    public string Header { get; set; }

    [JsonPropertyName("value")]
    public List<string> Values { get; set; }

    [JsonPropertyName("generated")]
    public BooleanState? Generated { get; set; }
}
