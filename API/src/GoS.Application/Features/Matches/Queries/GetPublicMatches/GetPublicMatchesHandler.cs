using GoS.Application.Abstractions;
using GoS.Application.EndpointParameters;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

internal sealed class GetPublicMatchesHandler(IRequester requester)
    : IRequestHandler<GetPublicMatchesQuery, IEnumerable<PublicMatch>?>
{
    public Task<IEnumerable<PublicMatch>?> Handle(GetPublicMatchesQuery request, CancellationToken ct)
    {
        var parameters = BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PublicMatch>>("publicMatches", parameters, ct);
    }

    private static ICollection<KeyValuePair<string, string>>? BuildParameters(PublicMatchesEndpointParameters? p)
    {
        if (p is null) return null;

        var parameters = new List<KeyValuePair<string, string>>();

        if (p.MmrAscending.HasValue)
            parameters.Add(new("mmr_ascending", p.MmrAscending.Value.ToString()));

        if (p.MmrDescending.HasValue)
            parameters.Add(new("mmr_descending", p.MmrDescending.Value.ToString()));

        if (p.LessThanMatchId.HasValue)
            parameters.Add(new("less_than_match_id", p.LessThanMatchId.Value.ToString()));

        if (p.MinRank.HasValue)
            parameters.Add(new("min_rank", ((int)p.MinRank.Value).ToString()));

        if (p.MaxRank.HasValue)
            parameters.Add(new("max_rank", ((int)p.MaxRank.Value).ToString()));

        return parameters.Count == 0 ? null : parameters;
    }
}