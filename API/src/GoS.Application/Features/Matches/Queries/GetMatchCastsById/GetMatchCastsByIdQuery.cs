using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchCastsById;

public record GetMatchCastsByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerCastsDto>?>;