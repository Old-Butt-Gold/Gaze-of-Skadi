using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

internal sealed class GetPlayerWordCloudHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayerWordCloudQuery, PlayerWordCloudDto?>
{
    public async Task<PlayerWordCloudDto?> Handle(GetPlayerWordCloudQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerWordCloud = await requester.GetResponseAsync<PlayerWordCloud>($"players/{request.AccountId}/wordcloud", parameters, ct);
        return mapper.Map<PlayerWordCloudDto?>(playerWordCloud);
    }
}
