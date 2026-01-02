using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchItemsById;

public record GetMatchItemsByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerItemsDto>?>;