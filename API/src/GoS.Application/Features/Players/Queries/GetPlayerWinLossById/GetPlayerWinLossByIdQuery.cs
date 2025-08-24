using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWinLossById;

public record GetPlayerWinLossByIdQuery(long AccountId, PlayerEndpointParameters Parameters) 
    : IRequest<PlayerWinLoss?>, IPlayerEndpointParametersRequest;