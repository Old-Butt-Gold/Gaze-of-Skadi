using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

internal sealed class GetPlayerTotalsHandler(IRequester requester)
    : IRequestHandler<GetPlayerTotalsQuery, IEnumerable<PlayerTotal>?>
{
    public Task<IEnumerable<PlayerTotal>?> Handle(GetPlayerTotalsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerTotal>>($"players/{request.AccountId}/totals", parameters, ct);
    }
}