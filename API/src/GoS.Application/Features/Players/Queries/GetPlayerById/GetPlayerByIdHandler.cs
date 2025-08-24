using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

internal sealed class GetPlayerByIdHandler(IRequester requester)
    : IRequestHandler<GetPlayerByIdQuery, Player?>
{
    public Task<Player?> Handle(GetPlayerByIdQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<Player>($"players/{request.AccountId}", ct: ct);
    }
}