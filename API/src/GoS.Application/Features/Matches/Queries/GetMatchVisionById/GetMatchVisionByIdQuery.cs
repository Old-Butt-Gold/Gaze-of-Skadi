using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchVisionById;

public record GetMatchVisionByIdQuery(long MatchId) : IRequest<MatchVisionDto?>;