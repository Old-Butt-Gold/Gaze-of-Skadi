using GoS.Domain.BaseEnums;
using GoS.Domain.Players.Models;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

public class PlayerCountDto
{
    public Dictionary<LeaverStatus, PlayerCountStats> LeaverStatus { get; init; } = new();

    public Dictionary<GameMode, PlayerCountStats> GameMode { get; init; } = new();

    public Dictionary<LobbyType, PlayerCountStats> LobbyType { get; init; } = new();

    public Dictionary<LaneRole, PlayerCountStats> LaneRole { get; init; } = new();

    public Dictionary<Region, PlayerCountStats> Region { get; init; } = new();

    public Dictionary<Patch, PlayerCountStats> Patch { get; init; } = new();

    public Dictionary<TeamEnum, PlayerCountStats> IsRadiant { get; init; } = new();
}

