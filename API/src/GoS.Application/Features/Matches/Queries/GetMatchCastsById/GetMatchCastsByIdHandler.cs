using GoS.Application.Abstractions;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchCastsById;

internal sealed class GetMatchCastsByIdHandler(ISender sender, IResourceManager resourceManager)
    : IRequestHandler<GetMatchCastsByIdQuery, IEnumerable<PlayerCastsDto>?>
{
    public async Task<IEnumerable<PlayerCastsDto>?> Handle(GetMatchCastsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        var heroes = await resourceManager.GetHeroInfosAsync();

        var heroNameToId = heroes!.ToDictionary(x => x.Value.Name,
            x => int.Parse(x.Key),
            StringComparer.OrdinalIgnoreCase);

        return match.Players.Select((player, index) => new PlayerCastsDto
            {
                PlayerIndex = index,
                Abilities = player.AbilityUses.Select(kvp => new AbilityCastDto
                    {
                        AbilityKey = kvp.Key,
                        TimesUsed = kvp.Value,
                        Targets = player.AbilityTargets.TryGetValue(kvp.Key, out var stringTargets)
                            ? ConvertTargetsToInt(stringTargets, heroNameToId)
                            : null
                    })
                    .OrderByDescending(x => x.TimesUsed),
                Items = player.ItemUses
                    .Select(kvp => new ItemCastDto { ItemKey = kvp.Key, TimesUsed = kvp.Value })
                    .OrderByDescending(x => x.TimesUsed),

                Hits = player.HeroHits
                    .Select(kvp => new HitCastDto { TargetHeroKey = kvp.Key, HitCount = kvp.Value })
                    .OrderByDescending(x => x.HitCount),
            })
            .ToList();
    }

    private static Dictionary<int, int>? ConvertTargetsToInt(Dictionary<string, int> stringTargets, IReadOnlyDictionary<string, int> heroNameToId)
    {
        if (stringTargets.Count == 0) return null;

        var intTargets = new Dictionary<int, int>();
        foreach (var (heroName, count) in stringTargets)
        {
            if (heroNameToId.TryGetValue(heroName, out var heroId))
            {
                intTargets[heroId] = count;
            }
        }

        return intTargets.Count > 0 ? intTargets : null;
    }
}
