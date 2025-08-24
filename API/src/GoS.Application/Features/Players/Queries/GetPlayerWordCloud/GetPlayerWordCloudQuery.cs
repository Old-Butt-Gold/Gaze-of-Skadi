using GoS.Application.EndpointParameters;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

public record GetPlayerWordCloudQuery(long AccountId, PlayerEndpointParameters? Parameters) : IRequest<PlayerWordCloud?>;