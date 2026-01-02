using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchObjectivesById;

public record GetMatchObjectivesByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerObjectivesDto>?>;