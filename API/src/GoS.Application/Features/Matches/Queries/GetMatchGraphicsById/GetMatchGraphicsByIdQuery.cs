using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;

public record GetMatchGraphicsByIdQuery(long MatchId) : IRequest<MatchGraphicsDto?>;