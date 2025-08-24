using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Common.Interfaces;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

public record GetPlayerHeroesQuery(long AccountId, PlayerEndpointParameters Parameters) : IRequest<IEnumerable<PlayerHero>?>, IPlayerEndpointParametersRequest;