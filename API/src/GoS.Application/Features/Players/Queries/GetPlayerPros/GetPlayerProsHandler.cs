using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

internal sealed class GetPlayerProsHandler(IRequester requester)
    : IRequestHandler<GetPlayerProsQuery, IEnumerable<PlayerPro>?>
{
    public Task<IEnumerable<PlayerPro>?> Handle(GetPlayerProsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerPro>>($"players/{request.AccountId}/pros", parameters, ct);
    }
}