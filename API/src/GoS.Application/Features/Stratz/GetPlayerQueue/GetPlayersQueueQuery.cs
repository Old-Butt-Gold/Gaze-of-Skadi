using MediatR;

namespace GoS.Application.Features.Stratz.GetPlayerQueue;

public sealed record GetPlayersQueueQuery() : IRequest<IEnumerable<PlayersQueueDto>?>;
