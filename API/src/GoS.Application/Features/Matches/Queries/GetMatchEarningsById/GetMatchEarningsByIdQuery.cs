using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchEarningsById;

public record GetMatchEarningsByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerEarningsDto>?>;