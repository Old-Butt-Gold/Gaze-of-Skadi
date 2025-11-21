using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

internal sealed class GetPlayerPeersHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerPeersQuery, IEnumerable<PlayerPeerDto>?>
{
    public async Task<IEnumerable<PlayerPeerDto>?> Handle(GetPlayerPeersQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerPeers = await requester.GetResponseAsync<IEnumerable<PlayerPeer>>($"players/{request.AccountId}/peers", parameters, ct);
        return mapper.Map<IEnumerable<PlayerPeerDto>?>(playerPeers);
    }
}