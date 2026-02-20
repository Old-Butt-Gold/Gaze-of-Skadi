using GoS.Application.Dto;

namespace GoS.Application.Features.Matches.Queries.GetMatchVisionById;

public enum VisionItemType
{
    ObserverWard,
    SentryWard,
    Dust,
    Gem,
    Smoke
}

public enum WardType
{
    Observer,
    Sentry
}

public record VisionItemDto
{
    public required BaseEnumDto<VisionItemType> ItemType { get; init; }
    public required int Quantity { get; init; }
}

public record WardPlacementDto
{
    public required BaseEnumDto<WardType> Type { get; init; }
    public required int OwnerIndex { get; init; }
    public required long PlacementTime { get; init; }
    public required long RemovalTime { get; init; }
    public required long Duration { get; init; }
    public required int? DestroyedById { get; init; }
    public required double X { get; init; }
    public required double Y { get; init; }
}

public record PlayerVisionDto
{
    public required int PlayerIndex { get; init; }
    public required IEnumerable<VisionItemDto> PurchasedItems { get; init; }
    public required IEnumerable<VisionItemDto> UsedItems { get; init; }
}

public record MatchVisionDto
{
    public required IEnumerable<PlayerVisionDto> Players { get; init; }
    public required IEnumerable<WardPlacementDto> WardPlacements { get; init; }
}
