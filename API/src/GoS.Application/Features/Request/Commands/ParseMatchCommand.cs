using MediatR;

namespace GoS.Application.Features.Request.Commands;

public record ParseMatchCommand(long MatchId) : IRequest<bool>;
