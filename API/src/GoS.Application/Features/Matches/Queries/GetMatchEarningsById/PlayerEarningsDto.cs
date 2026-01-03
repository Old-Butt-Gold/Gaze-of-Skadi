using GoS.Application.Dto;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchEarningsById;

public record IncomeReasonDto<TEnum> where TEnum : Enum
{
    public required BaseEnumDto<TEnum> Reason { get; init; }
    public required int Amount { get; init; }
}

public record LastHitsSnapshotDto
{
    public required int Minute { get; init; }
    public required int LastHits { get; init; }
}

public record PlayerEarningsDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required long HeroesKilled { get; init; }
    public required int LaneCreepsKilled { get; init; }
    public required int NeutralCreepsKilled { get; init; }
    public required int AncientCreepsKilled { get; init; }
    public required int TowersKilled { get; init; }
    public required int CouriersKilled { get; init; }
    public required int RoshanKills { get; init; }
    public required int ObserverKills { get; init; }
    public required IEnumerable<LastHitsSnapshotDto> LastHits { get; init; }
    public required IEnumerable<IncomeReasonDto<GoldReason>> GoldReasons { get; init; }
    public required IEnumerable<IncomeReasonDto<XpReason>> XpReasons { get; init; }
    public required int NecronomiconKills { get; set; }
    public required int SentryKills { get; set; }
}