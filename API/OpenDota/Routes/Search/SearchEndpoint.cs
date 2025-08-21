using OpenDota.Routes.Search.Models;
using OpenDota.Utilities;

namespace OpenDota.Routes.Search;

/// <inheritdoc />
public class SearchEndpoint(Requester requester) : ISearchEndpoint
{
	/// <inheritdoc />
	public Task<List<PlayerResponse>?> GetPlayersByNameAsync(string personaName)
	{
		return requester.GetResponseAsync<List<PlayerResponse>>("search",
			[new KeyValuePair<string, string>("q", personaName)]);
	}

    /// <inheritdoc />
    public Task<List<ProPlayer>?> GetProPlayersAsync()
    {
        return requester.GetResponseAsync<List<ProPlayer>>("proPlayers");
    }
}
