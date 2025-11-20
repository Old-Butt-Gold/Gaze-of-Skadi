using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

internal sealed class GetHeroStatsHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetHeroStatsQuery, IEnumerable<HeroStatsDto>?>
{
    public async Task<IEnumerable<HeroStatsDto>?> Handle(GetHeroStatsQuery request, CancellationToken ct)
    {
        var heroStats = await requester.GetResponseAsync<IEnumerable<HeroStats>>("heroStats", ct: ct);
        return heroStats is null ? null : mapper.Map<IEnumerable<HeroStatsDto>>(heroStats);
    }
}