namespace GoS.Application.Features.Steam.Queries.GetSteamPlayers;

public class SteamPlayerDto
{
    public required string SteamId32 { get; set; }
    public string? SteamName { get; set; }
    public string? Avatar { get; set; }
}
