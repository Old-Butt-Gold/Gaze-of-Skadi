using GoS.Application.Abstractions;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.FindMatches;

internal sealed class FindMatchesHandler(IRequester requester) : IRequestHandler<FindMatchesQuery, IEnumerable<MatchFind>?>
{
    public async Task<IEnumerable<MatchFind>?> Handle(FindMatchesQuery request, CancellationToken cancellationToken)
    {
        var parameters = BuildParameters(request.TeamA, request.TeamB);
        return await requester.GetResponseAsync<IEnumerable<MatchFind>?>("findMatches", parameters, ct: cancellationToken);
    }

    private static IEnumerable<KeyValuePair<string, string>> BuildParameters(int[] teamA, int[] teamB)
    {
        foreach (var id in teamA)
            yield return new("teamA", id.ToString());

        foreach (var id in teamB)
            yield return new("teamB", id.ToString());
    }
}
