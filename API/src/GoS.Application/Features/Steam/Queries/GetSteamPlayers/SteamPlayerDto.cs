namespace GoS.Application.Features.Steam.Queries.GetSteamPlayers;

public class SteamPlayerDto
{
    public string SteamId32 { get; set; } = string.Empty;
    public string SteamName { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
}
