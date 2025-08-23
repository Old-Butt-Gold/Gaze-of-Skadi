using GoS.Domain.Players.Enums;
using GoS.Domain.Players.Models;
using GoS.Domain.Players.Models.EndpointParameters;

namespace OpenDota.Routes.Players;

/// <summary>
/// Represents players endpoint.
/// </summary>
public interface IPlayersEndpoint
{
	/// <summary>
	/// Gets player data.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <returns>Player data.</returns>
	Task<Player?> GetPlayerByIdAsync(long accountId);

	/// <summary>
	/// Gets Win/Loss count.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query parameters.</param>
	/// <returns>Win/Loss count.</returns>
	Task<PlayerWinLoss?> GetPlayerWinLossByIdAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets recent matches played.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <returns>Recent matches played.</returns>
	Task<List<PlayerRecentMatch>?> GetPlayerRecentMatchesAsync(long accountId);

	/// <summary>
	/// Gets matches played.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query parameters.</param>
	/// <returns>Matches played.</returns>
	Task<List<PlayerMatch>?> GetPlayerMatchesAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets heroes played.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Heroes played.</returns>
	Task<List<PlayerHero>?> GetPlayerHeroesAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets players played with.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Players played with.</returns>
	Task<List<PlayerPeer>?> GetPlayerPeersAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets pro players played with.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Pro players played with.</returns>
	Task<List<PlayerPro>?> GetPlayerProsAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets totals in stats.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Totals in stats.</returns>
	Task<List<PlayerTotal>?> GetPlayerTotalsAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets counts in categories.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Counts in categories.</returns>
	Task<PlayerCount?> GetPlayerCountsAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets distribution of matches in a single stat.
	/// Available field values can be seen on https://www.opendota.com/players/34505203/histograms.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="field">Field to aggregate on.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Distribution of matches in a single stat.</returns>
	Task<List<PlayerHistogram>?> GetPlayerHistogramsAsync(long accountId, PlayerFieldHistogram field, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets wards placed in matches played.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Wards placed in matches played.</returns>
	Task<PlayerWardMap?> GetPlayerWardMapAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets words said/read in matches played.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <param name="parameters">Query Parameters.</param>
	/// <returns>Words said/read in matches played.</returns>
	Task<PlayerWordCloud?> GetPlayerWordCloudAsync(long accountId, PlayerEndpointParameters? parameters = null);

	/// <summary>
	/// Gets player rating history.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <returns>Player rating history.</returns>
	Task<List<PlayerRating>?> GetPlayerRatingsAsync(long accountId);

	/// <summary>
	/// Gets player hero rankings.
	/// </summary>
	/// <param name="accountId">Steam32 account ID.</param>
	/// <returns>Player hero rankings.</returns>
	Task<List<PlayerHeroRanking>?> GetPlayerHeroRankingsAsync(long accountId);

	/// <summary>
	/// Gets refresh player match history.
	/// </summary>
	/// <param name="accountId"></param>
	/// <returns>Refresh player match history.</returns>
	Task<bool> RefreshPlayerMatchHistoryAsync(long accountId);
}
