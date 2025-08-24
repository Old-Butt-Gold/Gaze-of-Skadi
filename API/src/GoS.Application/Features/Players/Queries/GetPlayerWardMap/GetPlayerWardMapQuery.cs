using GoS.Application.EndpointParameters;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWardMap;

public record GetPlayerWardMapQuery(long AccountId, PlayerEndpointParameters? Parameters) : IRequest<PlayerWardMap?>;