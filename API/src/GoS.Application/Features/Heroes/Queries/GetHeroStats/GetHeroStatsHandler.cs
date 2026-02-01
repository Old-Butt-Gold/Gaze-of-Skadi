using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

internal sealed class GetHeroStatsHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetHeroStatsQuery, IEnumerable<HeroStatsGroupedDto>?>
{
    public async Task<IEnumerable<HeroStatsGroupedDto>?> Handle(GetHeroStatsQuery request, CancellationToken ct)
    {
        var heroStats = await requester.GetResponseAsync<IEnumerable<HeroStats>>("heroStats", ct: ct);
        return heroStats is null ? null : mapper.Map<IEnumerable<HeroStatsGroupedDto>>(heroStats);
    }
}
