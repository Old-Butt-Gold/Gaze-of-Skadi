using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWardMap;

internal sealed class GetPlayerWardMapHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayerWardMapQuery, PlayerWardMapDto?>
{
    public async Task<PlayerWardMapDto?> Handle(GetPlayerWardMapQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerWardMap = await requester.GetResponseAsync<PlayerWardMap>($"players/{request.AccountId}/wardmap", parameters, ct);
        return mapper.Map<PlayerWardMapDto?>(playerWardMap);
    }
}
