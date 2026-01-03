using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchJournalById;

public record GetMatchJournalByIdQuery(long MatchId) : IRequest<MatchJournalDto?>;