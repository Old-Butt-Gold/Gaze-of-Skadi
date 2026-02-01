using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

internal sealed class GetHeroMatchesHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetHeroMatchesQuery, IEnumerable<HeroMatchDto>?>
{
    public async Task<IEnumerable<HeroMatchDto>?> Handle(GetHeroMatchesQuery request, CancellationToken ct)
    {
        var heroMatches = await requester.GetResponseAsync<IEnumerable<HeroMatch>>($"heroes/{request.HeroId}/matches", ct: ct);
        return heroMatches is null ? null : mapper.Map<IEnumerable<HeroMatchDto>>(heroMatches);
    }
}
