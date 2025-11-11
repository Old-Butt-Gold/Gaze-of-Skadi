using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;

namespace GoS.Application.Abstractions;

public interface ISteamService
{
    Task<SteamPlayerSummary?> GetPlayerSummaryAsync(string steamId);
    string? ConvertSteamIdTo32(string steamId64);
}

public class SteamService : ISteamService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public SteamService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<SteamPlayerSummary?> GetPlayerSummaryAsync(string steamId)
    {
        var apiKey = _configuration["Steam:ApplicationKey"];
        var url = $"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={apiKey}&steamids={steamId}";
        
        var response = await _httpClient.GetAsync(url);
        if (response.IsSuccessStatusCode)
        {
            var json = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<SteamApiResponse>(json);
            return data?.Response?.Players?.FirstOrDefault();
        }
        
        return null;
    }

    public string? ConvertSteamIdTo32(string steamId64)
    {
        if (ulong.TryParse(steamId64, out var steamId))
        {
            var steamId32 = (steamId - 76561197960265728) & 0xFFFFFFFF;
            return steamId32.ToString();
        }
        return null;
    }
}

public class SteamApiResponse
{
    [JsonPropertyName("response")]
    public required SteamPlayerResponse Response { get; set; }
}

public class SteamPlayerResponse
{
    [JsonPropertyName("players")]
    public required List<SteamPlayerSummary> Players { get; set; }
}

public class SteamPlayerSummary
{
    [JsonPropertyName("steamid")]
    public string SteamId { get; set; }
    
    [JsonPropertyName("profileurl")]
    public string ProfileUrl { get; set; }

    [JsonPropertyName("avatar")]
    public string Avatar { get; set; }

    [JsonPropertyName("avatarmedium")]
    public string AvatarMedium { get; set; }

    [JsonPropertyName("avatarfull")]
    public string AvatarFull { get; set; }

    [JsonPropertyName("lastlogoff")]
    public long LastLogoff { get; set; }
    
    [JsonPropertyName("realname")]
    public string RealName { get; set; }
    
    [JsonPropertyName("timecreated")]
    public long TimeCreated { get; set; }
}