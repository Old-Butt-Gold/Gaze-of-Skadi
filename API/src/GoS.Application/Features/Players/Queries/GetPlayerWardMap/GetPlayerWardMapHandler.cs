using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerWardMap;

internal sealed class GetPlayerWardMapHandler(IRequester requester)
    : IRequestHandler<GetPlayerWardMapQuery, PlayerWardMap?>
{
    public Task<PlayerWardMap?> Handle(GetPlayerWardMapQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<PlayerWardMap>($"players/{request.AccountId}/wardmap", parameters, ct);
    }
}