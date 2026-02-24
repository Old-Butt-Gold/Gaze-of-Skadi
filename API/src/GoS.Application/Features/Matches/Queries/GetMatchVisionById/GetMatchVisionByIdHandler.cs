using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchVisionById;

internal sealed class GetMatchVisionByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager
) : IRequestHandler<GetMatchVisionByIdQuery, MatchVisionDto?>
{
    private static readonly HashSet<string> VisibilityItemKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "ward_observer", "ward_sentry", "dust", "gem", "smoke_of_deceit"
    };

    private static readonly Dictionary<string, VisionItemType> VisibilityItemMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["ward_observer"] = VisionItemType.ObserverWard,
        ["ward_sentry"] = VisionItemType.SentryWard,
        ["dust"] = VisionItemType.Dust,
        ["gem"] = VisionItemType.Gem,
        ["smoke_of_deceit"] = VisionItemType.Smoke
    };

    private Dictionary<string, int> _heroNameToId = [];

    public async Task<MatchVisionDto?> Handle(GetMatchVisionByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        _heroNameToId = (await resourceManager.GetHeroInfosAsync())!.ToDictionary(x => x.Value.Name, x => x.Value.Id);

        return new MatchVisionDto
        {
            Players = match.Players.Select(MapPlayerVision),
            WardPlacements = MapWardPlacements(match),
        };
    }

    private PlayerVisionDto MapPlayerVision(MatchPlayer player, int playerIndex) =>
        new()
        {
            PlayerIndex = playerIndex,
            PurchasedItems = MapVisionItems(player.Purchase),
        };

    private IEnumerable<VisionItemDto> MapVisionItems(IDictionary<string, int>? items)
    {
        if (items == null) return [];

        return items
            .Where(item => VisibilityItemKeys.Contains(item.Key))
            .Select(item => new VisionItemDto
            {
                ItemType = mapper.Map<BaseEnumDto<VisionItemType>>(VisibilityItemMap[item.Key]),
                Quantity = item.Value
            });
    }

    private IEnumerable<WardPlacementDto> MapWardPlacements(Match match)
    {
        var allWardLogs = match.Players
            .SelectMany(GetPlayerWardLogs)
            .ToList();

        if (allWardLogs.Count == 0)
            return [];

        var groupedLogs = allWardLogs
            .GroupBy(log => log.Log.Ehandle)
            .Select(g => new
            {
                Ehandle = g.Key,
                Entries = g.OrderBy(e => e.Log.Time).ToList(),
                FirstTime = g.Min(e => e.Log.Time)
            })
            .OrderBy(g => g.FirstTime)
            .ToList();

        var result = new List<WardPlacementDto>();

        foreach (var group in groupedLogs)
        {
            var placementEntry = group.Entries.FirstOrDefault(e =>
                e.Log.Type is LogType.ObsLog or LogType.SenLog);

            var leftEntry = group.Entries.FirstOrDefault(e =>
                e.Log.Type is LogType.ObsLeftLog or LogType.SenLeftLog);

            var wardType = placementEntry.Log.Type == LogType.SenLog
                ? WardType.Sentry
                : WardType.Observer;

            var placementTime = placementEntry.Log.Time;
            var removalTime = leftEntry.Log?.Time ?? match.Duration;
            if (removalTime > match.Duration)
            {
                removalTime = match.Duration;
            }

            var duration = removalTime - placementTime;

            if (duration < 0) duration = 0;

            int? destroyedBy = null;
            if (leftEntry.Log != null)
            {
                if (!string.IsNullOrWhiteSpace(leftEntry.Log.AttackerName) && _heroNameToId.TryGetValue(leftEntry.Log.AttackerName, out var heroId))
                    destroyedBy = heroId;
                else if (leftEntry.Log.EntityLeft == BooleanState.True)
                    destroyedBy = null;
            }

            result.Add(new WardPlacementDto
            {
                Type = mapper.Map<BaseEnumDto<WardType>>(wardType),
                OwnerIndex = placementEntry.Index,
                PlacementTime = placementTime,
                RemovalTime = removalTime,
                Duration = duration,
                DestroyedById = destroyedBy,
                X = placementEntry.Log.X,
                Y = placementEntry.Log.Y
            });
        }

        return result;
    }

    private IEnumerable<(int Index, WardLog Log)> GetPlayerWardLogs(MatchPlayer player, int index)
    {
        foreach (var log in player.ObsLog)
            yield return (index, log);
        foreach (var log in player.ObsLeftLog)
            yield return (index, log);
        foreach (var log in player.SenLog)
            yield return (index, log);
        foreach (var log in player.SenLeftLog)
            yield return (index, log);
    }
}
