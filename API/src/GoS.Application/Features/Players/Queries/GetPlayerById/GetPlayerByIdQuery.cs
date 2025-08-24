using GoS.Application.Abstractions;
using GoS.Application.Features.Players.Queries.GetPlayerTotals;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

public record GetPlayerByIdQuery(long AccountId) : IRequest<Player?>;

internal sealed class GetPlayerTotalsHandler(IRequester requester)
    : IRequestHandler<GetPlayerTotalsQuery, IEnumerable<PlayerTotal>?>
{
    public Task<IEnumerable<PlayerTotal>?> Handle(GetPlayerTotalsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerTotal>>($"players/{request.AccountId}/totals", parameters, ct);
    }
}