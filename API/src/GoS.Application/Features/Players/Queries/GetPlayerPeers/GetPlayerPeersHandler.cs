using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

internal sealed class GetPlayerPeersHandler(IRequester requester)
    : IRequestHandler<GetPlayerPeersQuery, IEnumerable<PlayerPeer>?>
{
    public Task<IEnumerable<PlayerPeer>?> Handle(GetPlayerPeersQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerPeer>>($"players/{request.AccountId}/peers", parameters, ct);
    }
}