using GoS.Application.Dto;
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

public record TeamAdvantageDto
{
    public required int Minute { get; init; }
    public required int RadiantGoldAdvantage { get; init; }
    public required int RadiantXpAdvantage { get; init; }
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
    public required BaseEnumDto<LaneRole> LaneRole { get; init; }
    public required int? RankTier { get; init; }
    public required int Level { get; init; }
    public required long Kills { get; init; }
    public required int Deaths { get; init; }
    public required long Assists { get; init; }
    public required int LastHits { get; init; }
    public required int Denies { get; init; }
    public required int NetWorth { get; init; }
    public required int GoldPerMin { get; init; }
    public required int XpPerMin { get; init; }
    public required long HeroDamage { get; init; }
    public required int TowerDamage { get; init; }
    public required long HeroHealing { get; init; }
    public required IEnumerable<ItemPurchaseDto> Items { get; init; }
    public required IEnumerable<ItemPurchaseDto> BackpackItems { get; init; }
    public required int? NeutralItem { get; init; }
    public required int? NeutralAura { get; init; }
    public required IEnumerable<AbilityUpgradeDto> AbilityUpgrades { get; init; }
    public required IEnumerable<ObjectiveDataDto> Objectives { get; init; }
}

public record PermanentBuffDto
{
    public required BaseEnumDto<PermanentBuffEnum> PermanentBuffEnum { get; init; }

    public required long StackCount { get; init; }
}

public record MatchOverviewDto
{
    public required BaseEnumDto<TeamEnum> Winner { get; init; }
    public required int RadiantScore { get; init; }
    public required int DireScore { get; init; }
    public required BaseEnumDto<GameMode> GameMode { get; init; }
    public required int Duration { get; init; }
    public long StartTime { get; set; }
    public required long EndTimeUnix { get; init; }
    public required long MatchId { get; init; }
    public required BaseEnumDto<Region> Region { get; init; }
    public required Uri? ReplayUrl { get; init; }
    public required IEnumerable<PickBanDto> PicksBans { get; init; }
    public required IEnumerable<PlayerOverviewDto> Players { get; init; }
    public required IEnumerable<TeamAdvantageDto> TeamAdvantages { get; init; }
    public required BaseEnumDto<BarracksStatus> DireBarracksStatus { get; init; }
    public required BaseEnumDto<BarracksStatus> RadiantBarracksStatus { get; init; }
    public required BaseEnumDto<TowerStatus> RadiantTowersStatus { get; init; }
    public required BaseEnumDto<TowerStatus> DireTowersStatus { get; init; }
    public required bool IsParsed { get; set; }
    public required BaseEnumDto<Patch> Patch { get; set; }
}
