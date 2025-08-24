using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

internal sealed class GetPlayerHeroesHandler(IRequester requester)
    : IRequestHandler<GetPlayerHeroesQuery, IEnumerable<PlayerHero>?>
{
    public Task<IEnumerable<PlayerHero>?> Handle(GetPlayerHeroesQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerHero>>($"players/{request.AccountId}/heroes", parameters, ct);
    }
}