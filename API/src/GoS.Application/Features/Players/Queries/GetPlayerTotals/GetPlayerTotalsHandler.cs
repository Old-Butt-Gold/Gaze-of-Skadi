using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

internal sealed class GetPlayerTotalsHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerTotalsQuery, IEnumerable<PlayerTotalDto>?>
{
    public async Task<IEnumerable<PlayerTotalDto>?> Handle(GetPlayerTotalsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerTotals = await requester.GetResponseAsync<IEnumerable<PlayerTotal>>($"players/{request.AccountId}/totals", parameters, ct);
        return mapper.Map<IEnumerable<PlayerTotalDto>?>(playerTotals);
    }
}