using MediatR;

namespace GoS.Application.Features.Stratz;

public sealed record GetPlayersQueueQuery() : IRequest<IEnumerable<PlayersQueueDto>?>;
