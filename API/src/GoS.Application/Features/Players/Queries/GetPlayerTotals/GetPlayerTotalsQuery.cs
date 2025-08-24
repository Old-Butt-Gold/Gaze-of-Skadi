using GoS.Application.EndpointParameters;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

public record GetPlayerTotalsQuery(long AccountId, PlayerEndpointParameters? Parameters) : IRequest<IEnumerable<PlayerTotal>?>;