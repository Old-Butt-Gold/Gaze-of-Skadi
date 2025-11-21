using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

internal sealed class GetPlayerCountsHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerCountsQuery, PlayerCountDto?>
{
    public async Task<PlayerCountDto?> Handle(GetPlayerCountsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerCount = await requester.GetResponseAsync<PlayerCount>($"players/{request.AccountId}/counts", parameters, ct);
        return mapper.Map<PlayerCountDto?>(playerCount);
    }
}