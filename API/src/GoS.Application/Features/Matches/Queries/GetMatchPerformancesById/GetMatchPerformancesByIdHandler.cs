using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using GoS.Domain.Resources.Models.Heroes;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;

internal sealed class GetMatchPerformancesByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager)
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
            .Select(player => new PlayerPerformanceDto
            {
                PlayerInfo = mapper.Map<PlayerInfoDto>(player),
                Performance = GetPerformanceForPlayer(heroes!, player),
            })
            .ToList();
    }

    private static PerformanceDataDto GetPerformanceForPlayer(Dictionary<string, HeroInfo> heroes, MatchPlayer player) =>
        new()
        {
            MultiKills = player.MultiKills.Keys.Max(),
            KillStreaks = player.KillStreaks.Keys.Max(),
            StunsDuration = player.Stuns,
            Stacks = player.CampsStacked,
            Dead = player.LifeStateDead,
            Buybacks = player.BuybackCount,
            Pings = player.Pings,
            MaxHeroHitAbilityName = player.MaxHeroHit.Inflictor,
            MaxHeroHitHeroId = heroes.First(x => x.Value.Name == player.MaxHeroHit.Key).Value.Id,
            MaxHeroHitValue = player.MaxHeroHit.Value,
            PerfomanceOthers = player.PerfomanceOthers,
        };
}
