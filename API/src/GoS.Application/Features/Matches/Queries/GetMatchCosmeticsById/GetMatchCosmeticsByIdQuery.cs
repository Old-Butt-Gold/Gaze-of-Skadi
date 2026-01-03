using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchCosmeticsById;

public record GetMatchCosmeticsByIdQuery(long MatchId) : IRequest<IEnumerable<PlayerCosmeticsDto>?>;