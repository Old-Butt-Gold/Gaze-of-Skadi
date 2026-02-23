using GoS.Application.Dto;
using GoS.Application.Features.Common.Queries.GetLeagues;
using GoS.Application.Features.Matches.Queries.GetMatchPlayersById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

public record PickBanDto
{
    public required int Order { get; init; }
    public required bool? IsPick { get; init; }
    public required BaseEnumDto<TeamEnum> Team { get; init; }
    public required long HeroId { get; init; }
}

public record ItemPurchaseDto
{
    public required long ItemId { get; init; }
    public required long? FirstPurchaseTime { get; set; }
    public int ItemIndex { get; set; }
}

public record AbilityUpgradeDto
{
    public required int AbilityId { get; init; }
}

public record ObjectiveDataDto
{
    public required string Key { get; init; }
    public required int Value { get; init; }
}

public record PlayerOverviewDto
{
    public required bool AghanimShardBuff { get; init; }
    public required bool AghanimBuff { get; init; }
    public required IEnumerable<PermanentBuffDto> PermanentBuff { get; init; }
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required long Kills { get; init; }
    public required int Deaths { get; init; }
    public required long Assists { get; init; }
    public required double Kda { get; init; }
    public required int LastHits { get; init; }
    public required int Denies { get; init; }
    public required int NetWorth { get; init; }
    public required int GoldPerMin { get; init; }
    public required int XpPerMin { get; init; }
    public required long HeroDamage { get; init; }
    public required int TowerDamage { get; init; }
    public required long HeroHealing { get; init; }
    public required int? NeutralItem { get; init; }
    public required int? NeutralAura { get; init; }
    public required BaseEnumDto<BooleanState>? PredVict { get; init; }
    public required BaseEnumDto<BooleanState>? Randomed { get; init; }
    public required IEnumerable<ItemPurchaseDto> Items { get; init; }
    public required IEnumerable<ItemPurchaseDto> BackpackItems { get; init; }
    public required IEnumerable<AbilityUpgradeDto> AbilityUpgrades { get; init; }
    public required IEnumerable<ObjectiveDataDto> Objectives { get; init; }
}

public record PermanentBuffDto
{
    public required BaseEnumDto<PermanentBuffEnum> PermanentBuffEnum { get; init; }

    public required long StackCount { get; init; }
}

public class MatchTeamDto
{
    public int TeamId { get; init; }

    public string Name { get; init; } = string.Empty;

    public Uri? LogoUrl { get; init; }
}

public record MatchOverviewDto
{
    public required BaseEnumDto<TeamEnum> Winner { get; init; }
    public required int RadiantScore { get; init; }
    public required int DireScore { get; init; }
    public required BaseEnumDto<GameMode> GameMode { get; init; }
    public required BaseEnumDto<LobbyType> LobbyType { get; set; }
    public required int Duration { get; init; }
    public long StartTime { get; set; }
    public required long EndTime { get; init; }
    public required long MatchId { get; init; }
    public required BaseEnumDto<Region> Region { get; init; }
    public required Uri? ReplayUrl { get; init; }
    public required IEnumerable<PickBanDto> PicksBans { get; init; }
    public required IEnumerable<PlayerOverviewDto> Players { get; init; }
    public required BaseEnumDto<BarracksStatus> DireBarracksStatus { get; init; }
    public required BaseEnumDto<BarracksStatus> RadiantBarracksStatus { get; init; }
    public required BaseEnumDto<TowerStatus> RadiantTowersStatus { get; init; }
    public required BaseEnumDto<TowerStatus> DireTowersStatus { get; init; }
    public required BaseEnumDto<BooleanState> IsParsed { get; set; }
    public required BaseEnumDto<Patch> Patch { get; set; }
    public required MatchTeamDto? RadiantTeam { get; set; }
    public required MatchTeamDto? DireTeam { get; set; }
    public required LeagueDto? League { get; set; }
}
