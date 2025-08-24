using GoS.Application.Abstractions;
using MediatR;

namespace GoS.Application.Features.Players.Commands.RefreshPlayerMatchHistory;

internal sealed class RefreshPlayerMatchHistoryHandler(IRequester requester)
    : IRequestHandler<RefreshPlayerMatchHistoryCommand, bool>
{
    public async Task<bool> Handle(RefreshPlayerMatchHistoryCommand request, CancellationToken ct)
    {
        var response = await requester.PostRequestAsync($"players/{request.AccountId}/refresh", null, ct);
        response.EnsureSuccessStatusCode();
        return true;
    }
}