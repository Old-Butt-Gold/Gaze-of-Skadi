using GoS.Application.Abstractions;
using GoS.Domain.Extensions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

internal sealed class GetPlayerHistogramsHandler(IRequester requester)
    : IRequestHandler<GetPlayerHistogramsQuery, IEnumerable<PlayerHistogram>?>
{
    public Task<IEnumerable<PlayerHistogram>?> Handle(GetPlayerHistogramsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var path = $"players/{request.AccountId}/histograms/{request.Field.ToSnakeCase()}";
        return requester.GetResponseAsync<IEnumerable<PlayerHistogram>>(path, parameters, ct);
    }
}