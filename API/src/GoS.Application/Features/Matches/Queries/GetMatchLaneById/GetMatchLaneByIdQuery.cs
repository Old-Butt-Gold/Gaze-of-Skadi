using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchLaneById;

public record GetMatchLaneByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerLaneDto>?>;