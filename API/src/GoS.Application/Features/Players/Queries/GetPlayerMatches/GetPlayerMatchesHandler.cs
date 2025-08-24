using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

internal sealed class GetPlayerMatchesHandler(IRequester requester)
    : IRequestHandler<GetPlayerMatchesQuery, IEnumerable<PlayerMatch>?>
{
    public Task<IEnumerable<PlayerMatch>?> Handle(GetPlayerMatchesQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerMatch>>($"players/{request.AccountId}/matches", parameters, ct);
    }
}