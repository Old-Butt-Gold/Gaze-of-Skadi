using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecentMatches;

public record GetPlayerRecentMatchesQuery(long AccountId) : IRequest<IEnumerable<PlayerRecentMatch>?>;