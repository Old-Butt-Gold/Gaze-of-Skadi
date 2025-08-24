using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

public record GetPlayerProsQuery(long AccountId, PlayerEndpointParameters Parameters) 
    : IRequest<IEnumerable<PlayerPro>?>, IPlayerEndpointParametersRequest;