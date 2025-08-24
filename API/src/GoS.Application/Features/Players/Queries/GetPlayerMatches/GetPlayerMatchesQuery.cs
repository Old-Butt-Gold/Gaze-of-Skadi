using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

public record GetPlayerMatchesQuery(long AccountId, PlayerEndpointParameters Parameters) 
    : IRequest<IEnumerable<PlayerMatch>?>, IPlayerEndpointParametersRequest;