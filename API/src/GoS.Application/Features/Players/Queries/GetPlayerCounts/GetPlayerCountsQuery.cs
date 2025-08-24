using GoS.Application.EndpointParameters;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

public record GetPlayerCountsQuery(long AccountId, PlayerEndpointParameters? Parameters) : IRequest<PlayerCount?>;