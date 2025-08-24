using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

public record GetPlayerPeersQuery(long AccountId, PlayerEndpointParameters Parameters) 
    : IRequest<IEnumerable<PlayerPeer>?>, IPlayerEndpointParametersRequest;