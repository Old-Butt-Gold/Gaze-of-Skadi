using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchDamageById;

public record GetMatchDamageByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerDamageDto>?>;