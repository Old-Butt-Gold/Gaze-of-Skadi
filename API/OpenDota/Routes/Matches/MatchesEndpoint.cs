using GoS.Domain.Matches.Models;
using GoS.Domain.Matches.Models.EndpointParameters;
using OpenDota.Utilities;

namespace OpenDota.Routes.Matches;

/// <inheritdoc />
public class MatchesEndpoint(Requester requester) : IMatchesEndpoint
{
	/// <inheritdoc />
	public Task<Match?> GetMatchByIdAsync(long matchId)
	{
		return requester.GetResponseAsync<Match>($"matches/{matchId}");
	}

    /// <inheritdoc />
    public Task<List<ProMatch>?> GetProMatchesAsync(long? lessThanMatchId = null)
    {
        return requester.GetResponseAsync<List<ProMatch>>("proMatches",
            GetParametersPro(lessThanMatchId));
    }

    private static ICollection<KeyValuePair<string, string>> GetParametersPro(long? lessThanMatchId)
    {
        if (lessThanMatchId.HasValue)
        {
            return [new KeyValuePair<string, string>("less_than_match_id", lessThanMatchId.Value.ToString())];
        }

        return [];
    }

    public Task<List<PublicMatch>?> GetPublicMatchesAsync(PublicMatchesEndpointParameters? parameters = null)
    {
        return requester.GetResponseAsync<List<PublicMatch>>("publicMatches", GetParametersPublic(parameters));
    }

    private static ICollection<KeyValuePair<string, string>>? GetParametersPublic(PublicMatchesEndpointParameters? matchesEndpointParameters)
    {
        if (matchesEndpointParameters is null)
            return null;

        var parameters = new List<KeyValuePair<string, string>>();

        if (matchesEndpointParameters.MmrAscending.HasValue)
            parameters.Add(new("mmr_ascending", matchesEndpointParameters.MmrAscending.Value.ToString()));

        if (matchesEndpointParameters.MmrDescending.HasValue)
            parameters.Add(new("mmr_descending", matchesEndpointParameters.MmrDescending.Value.ToString()));

        if (matchesEndpointParameters.LessThanMatchId.HasValue)
            parameters.Add(new("less_than_match_id", matchesEndpointParameters.LessThanMatchId.Value.ToString()));

        if (matchesEndpointParameters.MinRank.HasValue)
            parameters.Add(new("min_rank", ((int)matchesEndpointParameters.MinRank.Value).ToString()));

        if (matchesEndpointParameters.MaxRank.HasValue)
            parameters.Add(new("max_rank", ((int)matchesEndpointParameters.MaxRank.Value).ToString()));

        return parameters;
    }
}
