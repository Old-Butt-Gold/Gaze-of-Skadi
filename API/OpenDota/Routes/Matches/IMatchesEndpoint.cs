using GoS.Domain.Matches.Models;
using GoS.Domain.Matches.Models.EndpointParameters;

namespace OpenDota.Routes.Matches;

/// <summary>
/// Matches endpoint.
/// </summary>
public interface IMatchesEndpoint
{
	/// <summary>
	/// Get match data by ID.
	/// </summary>
	/// <param name="matchId">ID used to identify individual matches, e.g. 3703866531.</param>
	/// <returns>Match data.</returns>
	Task<Match?> GetMatchByIdAsync(long matchId);

    /// <summary>
    /// Get list of randomly sampled public matches.
    /// </summary>
    /// <param name="parameters">Contains query parameters</param>
    /// <returns>List of randomly sampled public matches.</returns>
    Task<List<PublicMatch>?> GetPublicMatchesAsync(PublicMatchesEndpointParameters? parameters = null);

    /// <summary>
    /// Get list of pro matches.
    /// </summary>
    /// <param name="lessThanMatchId">Get matches with a match ID lower than this value.</param>
    /// <returns>List of pro matches.</returns>
    Task<List<ProMatch>?> GetProMatchesAsync(long? lessThanMatchId = null);
}
