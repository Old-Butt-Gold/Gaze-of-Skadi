using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;

public record GetMatchBenchmarksByIdQuery(long MatchId) : IRequest<MatchBenchmarksDto?>;
