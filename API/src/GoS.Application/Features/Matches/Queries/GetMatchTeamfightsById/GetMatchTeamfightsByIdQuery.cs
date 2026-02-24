using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchTeamfightsById;

public record GetMatchTeamfightsByIdQuery(long MatchId) : IRequest<IEnumerable<TeamfightDetailedDto>?>;
