using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

public record GetPlayerCountsQuery(long AccountId, PlayerEndpointParameters Parameters) : IRequest<PlayerCount?>, IPlayerEndpointParametersRequest;