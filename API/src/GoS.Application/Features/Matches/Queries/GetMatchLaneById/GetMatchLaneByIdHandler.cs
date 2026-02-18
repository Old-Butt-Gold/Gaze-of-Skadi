using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchLaneById;

internal sealed class GetMatchLaneByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchLaneByIdQuery, IEnumerable<PlayerLaneDto>?>
{
    public async Task<IEnumerable<PlayerLaneDto>?> Handle(GetMatchLaneByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        return match.Players.Select(MapPlayerToDto).ToList();
    }

    private PlayerLaneDto MapPlayerToDto(MatchPlayer player, int index)
    {
        var creepsPerMinute = Enumerable.Range(0, Math.Min(
                player.LastHitsEachMinute.Count,
                player.DeniesAtDifferentTimes.Count
            ))
            .Select(minute => new LaneCreepsPerMinuteDto {
                Minute = minute,
                TotalCreeps = player.LastHitsEachMinute[minute] + player.DeniesAtDifferentTimes[minute]
            });

        var lanePositions = player.LanePos
            .SelectMany(xEntry => xEntry.Value
                .Select(yEntry => new LanePositionDto {
                    X = int.Parse(xEntry.Key),
                    Y = int.Parse(yEntry.Key),
                    Count = yEntry.Value
                }));

        return new PlayerLaneDto {
            PlayerIndex = index,
            LaneRole = mapper.Map<BaseEnumDto<LaneRole>>(player.LaneRole),
            LaneEfficiency = Math.Round(player.LaneEfficiency * 100, 2),
            LastHitsAt10Minutes = SafeGetMinuteValue(player.LastHitsEachMinute, 10),
            DeniesAt10Minutes = SafeGetMinuteValue(player.DeniesAtDifferentTimes, 10),
            LastHitsAndDeniesPerMinute = creepsPerMinute,
            LanePositions = lanePositions
        };

        int SafeGetMinuteValue(IReadOnlyList<int> data, int minute) => minute < data.Count ? data[minute] : 0;
    }
}
