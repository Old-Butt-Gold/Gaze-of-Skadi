using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Domain.Resources.Models.ChatWheels;

public class ChatWheel
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("label")]
    public string? Label { get; set; }

    [JsonPropertyName("message")]
    public string? Message { get; set; }

    [JsonPropertyName("image")]
    public string? Image { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }
}
