using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;

public record GetMatchPerformancesByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerPerformanceDto>?>;