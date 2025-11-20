using GoS.Application.Abstractions;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

internal sealed class GetProMatchesHandler(IRequester requester)
    : IRequestHandler<GetProMatchesQuery, IEnumerable<ProMatch>?>
{
    public Task<IEnumerable<ProMatch>?> Handle(GetProMatchesQuery request, CancellationToken ct)
    {
        var parameters = BuildParameters(request.LessThanMatchId);
        return requester.GetResponseAsync<IEnumerable<ProMatch>>("proMatches", parameters, ct);
    }

    private static IEnumerable<KeyValuePair<string, string>> BuildParameters(long? lessThanMatchId)
    {
        if (lessThanMatchId.HasValue)
            yield return new("less_than_match_id", lessThanMatchId.Value.ToString());
    }
}
