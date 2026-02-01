using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

internal sealed class GetProMatchesHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetProMatchesQuery, IEnumerable<ProMatchDto>?>
{
    public async Task<IEnumerable<ProMatchDto>?> Handle(GetProMatchesQuery request, CancellationToken ct)
    {
        var parameters = BuildParameters(request.LessThanMatchId);
        var proMatches = await requester.GetResponseAsync<IEnumerable<ProMatch>>("proMatches", parameters, ct);
        return proMatches is null ? null : mapper.Map<IEnumerable<ProMatchDto>>(proMatches);
    }

    private static IEnumerable<KeyValuePair<string, string>> BuildParameters(long? lessThanMatchId)
    {
        if (lessThanMatchId.HasValue)
            yield return new("less_than_match_id", lessThanMatchId.Value.ToString());
    }
}
