using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

internal sealed class GetHeroMatchupsHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetHeroMatchupsQuery, IEnumerable<HeroMatchupDto>?>
{
    public async Task<IEnumerable<HeroMatchupDto>?> Handle(GetHeroMatchupsQuery request, CancellationToken ct)
    {
        var heroMatchups = await requester.GetResponseAsync<IEnumerable<HeroMatchup>>($"heroes/{request.HeroId}/matchups", ct: ct);
        return heroMatchups is null ? null : mapper.Map<IEnumerable<HeroMatchupDto>>(heroMatchups);
    }
}