using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

internal sealed class GetPlayerByIdHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerByIdQuery, PlayerDto?>
{
    public async Task<PlayerDto?> Handle(GetPlayerByIdQuery request, CancellationToken ct)
    {
        var player = await requester.GetResponseAsync<Player>($"players/{request.AccountId}", ct: ct);
        return mapper.Map<PlayerDto?>(player);
    }
}
