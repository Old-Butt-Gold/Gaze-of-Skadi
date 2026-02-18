using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.FindMatches;

internal sealed class FindMatchesHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper) : IRequestHandler<FindMatchesQuery, IEnumerable<MatchFindDto>?>
{
    public async Task<IEnumerable<MatchFindDto>?> Handle(FindMatchesQuery request, CancellationToken cancellationToken)
    {
        var parameters = BuildParameters(request.TeamA, request.TeamB);
        var matchFind = await requester.GetResponseAsync<IEnumerable<MatchFind>?>("findMatches", parameters, ct: cancellationToken);
        return matchFind is null ? null : mapper.Map<IEnumerable<MatchFindDto>>(matchFind);
    }

    private static IEnumerable<KeyValuePair<string, string>> BuildParameters(int[] teamA, int[] teamB)
    {
        foreach (var id in teamA)
            yield return new("teamA", id.ToString());

        foreach (var id in teamB)
            yield return new("teamB", id.ToString());
    }
}
