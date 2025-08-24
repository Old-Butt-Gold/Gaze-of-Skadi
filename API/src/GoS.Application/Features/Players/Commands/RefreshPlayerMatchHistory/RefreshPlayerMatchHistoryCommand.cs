using MediatR;

namespace GoS.Application.Features.Players.Commands.RefreshPlayerMatchHistory;

public record RefreshPlayerMatchHistoryCommand(long AccountId) : IRequest<bool>;