using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchActionsById;

public record GetMatchActionsByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerActionsDto>?>;