using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWinLossById;

internal sealed class GetPlayerWinLossByIdHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerWinLossByIdQuery, PlayerWinLossDto?>
{
    public async Task<PlayerWinLossDto?> Handle(GetPlayerWinLossByIdQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerWinLoss = await requester.GetResponseAsync<PlayerWinLoss>($"players/{request.AccountId}/wl", parameters, ct);
        return mapper.Map<PlayerWinLossDto?>(playerWinLoss);
    }
}