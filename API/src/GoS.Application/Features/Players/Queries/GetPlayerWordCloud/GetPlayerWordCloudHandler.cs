using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

internal sealed class GetPlayerWordCloudHandler(IRequester requester)
    : IRequestHandler<GetPlayerWordCloudQuery, PlayerWordCloud?>
{
    public Task<PlayerWordCloud?> Handle(GetPlayerWordCloudQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<PlayerWordCloud>($"players/{request.AccountId}/wordcloud", parameters, ct);
    }
}