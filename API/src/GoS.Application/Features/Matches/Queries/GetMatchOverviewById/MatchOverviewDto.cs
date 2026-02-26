using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchGeneralInformationById;
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

public record PlayerOverviewDto
{
    public required bool AghanimShardBuff { get; init; }
    public required bool AghanimBuff { get; init; }
    public required IEnumerable<PermanentBuffDto> PermanentBuff { get; init; }
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required int Level { get; init; }
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
    public required IEnumerable<int> AbilityUpgradesIds { get; init; }
}

public record PermanentBuffDto
{
    public required BaseEnumDto<PermanentBuffEnum> PermanentBuffEnum { get; init; }

    public required long StackCount { get; init; }
}

public record MatchOverviewDto
{
    public required IEnumerable<PickBanDto> PicksBans { get; init; }
    public required IEnumerable<PlayerOverviewDto> Players { get; init; }
    public required BaseEnumDto<BarracksStatus> DireBarracksStatus { get; init; }
    public required BaseEnumDto<BarracksStatus> RadiantBarracksStatus { get; init; }
    public required BaseEnumDto<TowerStatus> RadiantTowersStatus { get; init; }
    public required BaseEnumDto<TowerStatus> DireTowersStatus { get; init; }
}
