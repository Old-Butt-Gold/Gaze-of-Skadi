using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

internal sealed class GetHeroStatsHandler(IRequester requester)
    : IRequestHandler<GetHeroStatsQuery, IEnumerable<HeroStats>?>
{
    public Task<IEnumerable<HeroStats>?> Handle(GetHeroStatsQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<IEnumerable<HeroStats>>("heroStats", ct: ct);
    }
}