using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;

public record GetPlayerHeroRankingsQuery(long AccountId) : IRequest<IEnumerable<PlayerHeroRanking>?>;