using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchChatById;

public record GetMatchChatByIdQuery(long MatchId) : IRequest<IEnumerable<ChatMessageDto>?>;