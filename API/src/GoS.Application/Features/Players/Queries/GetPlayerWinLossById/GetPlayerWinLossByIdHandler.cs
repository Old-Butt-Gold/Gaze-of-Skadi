using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWinLossById;

internal sealed class GetPlayerWinLossByIdHandler(IRequester requester)
    : IRequestHandler<GetPlayerWinLossByIdQuery, PlayerWinLoss?>
{
    public Task<PlayerWinLoss?> Handle(GetPlayerWinLossByIdQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<PlayerWinLoss>($"players/{request.AccountId}/wl", parameters, ct);
    }
}