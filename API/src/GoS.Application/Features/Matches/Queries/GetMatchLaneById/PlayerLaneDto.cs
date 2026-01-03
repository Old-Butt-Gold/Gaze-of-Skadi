using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Matches.Queries.GetMatchLaneById;

public record LanePositionDto
{
    public required int X { get; init; }
    public required int Y { get; init; }
    public required int Count { get; init; }
}

public record LaneCreepsPerMinuteDto
{
    public required int Minute { get; init; }
    public required int TotalCreeps { get; init; }
}

public record PlayerLaneDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required BaseEnumDto<LaneRole> LaneRole { get; init; }
    public required double LaneEfficiency { get; init; }
    public required int LastHitsAt10Minutes { get; init; }
    public required int DeniesAt10Minutes { get; init; }
    public required IEnumerable<LaneCreepsPerMinuteDto> LastHitsAndDeniesPerMinute { get; init; }
    public required IEnumerable<LanePositionDto> LanePositions { get; init; }
}