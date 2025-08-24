using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

internal sealed class GetPlayerCountsHandler(IRequester requester)
    : IRequestHandler<GetPlayerCountsQuery, PlayerCount?>
{
    public Task<PlayerCount?> Handle(GetPlayerCountsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<PlayerCount>($"players/{request.AccountId}/counts", parameters, ct);
    }
}