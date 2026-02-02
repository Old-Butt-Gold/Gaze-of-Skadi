using System.Text.Json.Serialization;

namespace GoS.Domain.Steam;

public class SteamPlayer
{
    [JsonPropertyName("steamid")]
    public required string SteamId { get; set; }

    [JsonPropertyName("personaname")]
    public string? SteamName { get; set; }

    [JsonPropertyName("avatar")]
    public string? Avatar { get; set; }

    [JsonPropertyName("avatarmedium")]
    public string? AvatarMedium { get; set; }

    [JsonPropertyName("avatarfull")]
    public string? AvatarFull { get; set; }

    [JsonPropertyName("profileurl")]
    public string? ProfileUrl { get; set; }

    [JsonPropertyName("realname")]
    public string? RealName { get; set; }

    [JsonPropertyName("timecreated")]
    public long? TimeCreated { get; set; }

    [JsonPropertyName("lastlogoff")]
    public long? LastLogoff { get; set; }
}

public class SteamPlayersResponse
{
    [JsonPropertyName("players")]
    public required IEnumerable<SteamPlayer> Players { get; set; }
}

public class SteamPlayerResponse
{
    [JsonPropertyName("response")]
    public required SteamPlayersResponse Response { get; set; }
}
