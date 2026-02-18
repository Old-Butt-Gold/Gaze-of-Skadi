using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchEarningsById;

internal sealed class GetMatchEarningsByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchEarningsByIdQuery, IEnumerable<PlayerEarningsDto>?>
{
    public async Task<IEnumerable<PlayerEarningsDto>?> Handle(
        GetMatchEarningsByIdQuery request,
        CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        return match.Players.Select(MapPlayerToDto).ToList();
    }

    private PlayerEarningsDto MapPlayerToDto(MatchPlayer player, int index) =>
        new()
        {
            PlayerIndex = index,
            HeroesKilled = player.Kills,
            LaneCreepsKilled = player.LaneKills,
            NeutralCreepsKilled = player.NeutralKills,
            AncientCreepsKilled = player.AncientKills,
            TowersKilled = player.TowerKills,
            CouriersKilled = player.CourierKills,
            RoshanKills = player.RoshanKills,
            NecronomiconKills = player.NecronomiconKills,
            ObserverKills = player.ObserverKills,
            SentryKills = player.SentryKills,
            LastHits = GenerateLastHitsSnapshots(player.LastHitsEachMinute),
            GoldReasons = ConvertReasons(player.GoldReasons, mapper),
            XpReasons = ConvertReasons(player.XpReasons, mapper)
        };

    private static IEnumerable<IncomeReasonDto<TEnum>> ConvertReasons<TEnum>(IDictionary<TEnum, int> reasons, IMapper mapper) where TEnum : Enum
    {
        return reasons
            .Where(kvp => Enum.IsDefined(typeof(TEnum), kvp.Key))
            .Select(kvp => new IncomeReasonDto<TEnum>
            {
                Reason = mapper.Map<BaseEnumDto<TEnum>>(kvp.Key),
                Amount = kvp.Value
            });
    }

    private static IEnumerable<LastHitsSnapshotDto> GenerateLastHitsSnapshots(IReadOnlyList<int> lastHitsEachMinute)
    {
        if (lastHitsEachMinute.Count == 0)
            return [];

        const int step = 5;

        var snapshots = new List<LastHitsSnapshotDto>();
        var maxMinute = lastHitsEachMinute.Count - 1;

        for (var minute = step; minute <= maxMinute; minute += step)
        {
            snapshots.Add(new LastHitsSnapshotDto
            {
                Minute = minute,
                LastHits = lastHitsEachMinute[minute]
            });
        }

        return snapshots;
    }
}
