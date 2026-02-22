using GoS.Application.Abstractions;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using GoS.Domain.Resources.Models.Heroes;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;

internal sealed class GetMatchPerformancesByIdHandler(ISender sender, IResourceManager resourceManager)
    : IRequestHandler<GetMatchPerformancesByIdQuery, IEnumerable<PlayerPerformanceDto>?>
{
    public async Task<IEnumerable<PlayerPerformanceDto>?> Handle(GetMatchPerformancesByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        var heroes = await resourceManager.GetHeroInfosAsync();

        return match.Players
            .Select((player, index) => new PlayerPerformanceDto
            {
                PlayerIndex = index,
                Performance = GetPerformanceForPlayer(heroes!, player),
            })
            .ToList();
    }

    private static PerformanceDataDto GetPerformanceForPlayer(Dictionary<string, HeroInfo> heroes, MatchPlayer player) =>
        new()
        {
            MultiKills = player.MultiKills.Keys.Count > 0 
                        ? int.Parse(player.MultiKills.Keys.Max()!)
                        : null,
            KillStreaks = player.KillStreaks.Keys.Count > 0 
                        ? int.Parse(player.KillStreaks.Keys.Max()!)
                        : null,
            StunsDuration = player.Stuns,
            Stacks = player.CampsStacked,
            DeadTime = player.LifeStateDead,
            PurchasedTpscroll = player.PurchaseTpscroll,
            Buybacks = player.BuybackCount,
            Pings = player.Pings,
            MaxHeroHit = player.MaxHeroHit is null 
                        ? null
                        : new MaxHeroHitDto
                        {
                            MaxHeroHitAbilityOrItemName = player.MaxHeroHit.Inflictor ?? "null",
                            MaxHeroHitHeroId = heroes.First(x => x.Value.Name == player.MaxHeroHit.Key).Value.Id,
                            MaxHeroHitValue = player.MaxHeroHit.Value,
                        },
        };
}
