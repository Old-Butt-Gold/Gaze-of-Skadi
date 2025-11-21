using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

internal sealed class GetPlayerHeroesHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerHeroesQuery, IEnumerable<PlayerHeroDto>?>
{
    public async Task<IEnumerable<PlayerHeroDto>?> Handle(GetPlayerHeroesQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerHeroes = await requester.GetResponseAsync<IEnumerable<PlayerHero>>($"players/{request.AccountId}/heroes", parameters, ct);
        return mapper.Map<IEnumerable<PlayerHeroDto>?>(playerHeroes);
    }
}