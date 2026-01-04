using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

public record GetMatchOverviewByIdQuery(long MatchId) : IRequest<MatchOverviewDto?>;