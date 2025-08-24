using GoS.Application.EndpointParameters;
using GoS.Domain.Players.Enums;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

public record GetPlayerHistogramsQuery(long AccountId, PlayerFieldHistogram Field, PlayerEndpointParameters? Parameters)
    : IRequest<IEnumerable<PlayerHistogram>?>;