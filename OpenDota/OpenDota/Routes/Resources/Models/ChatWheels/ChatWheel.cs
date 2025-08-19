using System.Text.Json.Serialization;
using OpenDota.Enums.Permanent;

namespace OpenDota.Routes.Resources.Models.ChatWheels;

public class ChatWheel
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("label")]
    public string? Label { get; set; }

    [JsonPropertyName("message")]
    public string? Message { get; set; }

    [JsonPropertyName("image")]
    public string? Image { get; set; }

    [JsonPropertyName("sound_ext")]
    public string? SoundExtension { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }

    [JsonPropertyName("all_chat")]
    public BooleanState? AllChat { get; set; }
}
