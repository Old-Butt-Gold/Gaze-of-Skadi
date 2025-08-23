using GoS.Domain.Extensions;
using GoS.Domain.Players.Enums;
using GoS.Domain.Players.Models;
using GoS.Domain.Players.Models.EndpointParameters;
using OpenDota.Utilities;

namespace OpenDota.Routes.Players;

/// <inheritdoc />
public class PlayersEndpoint(Requester requester) : IPlayersEndpoint
{
	/// <inheritdoc />
	public Task<Player?> GetPlayerByIdAsync(long accountId) =>
		requester.GetResponseAsync<Player>($"players/{accountId}");

	/// <inheritdoc />
	public Task<PlayerWinLoss?> GetPlayerWinLossByIdAsync(
		long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<PlayerWinLoss>($"players/{accountId}/wl",
			GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerRecentMatch>?> GetPlayerRecentMatchesAsync(long accountId) =>
		requester.GetResponseAsync<List<PlayerRecentMatch>>($"players/{accountId}/recentMatches");

	/// <inheritdoc />
	public Task<List<PlayerMatch>?> GetPlayerMatchesAsync(
		long accountId,
		PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<List<PlayerMatch>>(
			$"players/{accountId}/matches", GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerHero>?> GetPlayerHeroesAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<List<PlayerHero>>(
			$"players/{accountId}/heroes", GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerPeer>?> GetPlayerPeersAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<List<PlayerPeer>>(
			$"players/{accountId}/peers", GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerPro>?> GetPlayerProsAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<List<PlayerPro>>(
			$"players/{accountId}/pros", GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerTotal>?> GetPlayerTotalsAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<List<PlayerTotal>>(
			$"players/{accountId}/totals", GetArguments(parameters));

	/// <inheritdoc />
	public Task<PlayerCount?> GetPlayerCountsAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<PlayerCount>(
			$"players/{accountId}/counts", GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerHistogram>?> GetPlayerHistogramsAsync(long accountId, PlayerFieldHistogram field,
		PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<List<PlayerHistogram>>(
			$"players/{accountId}/histograms/{field.ToSnakeCase()}", GetArguments(parameters));

	/// <inheritdoc />
	public Task<PlayerWardMap?> GetPlayerWardMapAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<PlayerWardMap>(
			$"players/{accountId}/wardmap", GetArguments(parameters));

	/// <inheritdoc />
	public Task<PlayerWordCloud?>
		GetPlayerWordCloudAsync(long accountId, PlayerEndpointParameters? parameters = null) =>
		requester.GetResponseAsync<PlayerWordCloud>(
			$"players/{accountId}/wordcloud", GetArguments(parameters));

	/// <inheritdoc />
	public Task<List<PlayerRating>?> GetPlayerRatingsAsync(long accountId) =>
		requester.GetResponseAsync<List<PlayerRating>>($"players/{accountId}/ratings");

	/// <inheritdoc />
	public Task<List<PlayerHeroRanking>?> GetPlayerHeroRankingsAsync(long accountId) =>
		requester.GetResponseAsync<List<PlayerHeroRanking>>($"players/{accountId}/rankings");

	/// <inheritdoc />
	public async Task<bool> RefreshPlayerMatchHistoryAsync(long accountId)
	{
		var response = await requester.PostRequestAsync($"players/{accountId}/refresh");
		response.EnsureSuccessStatusCode();

		return true;
	}

	private static ICollection<KeyValuePair<string, string>> GetArguments(PlayerEndpointParameters? parameters)
	{
		var arguments = new List<KeyValuePair<string, string>>();

		if (parameters is null)
			return arguments;

		// Single-value parameters
		AddIfNotNull(arguments, "limit", parameters.Limit);
		AddIfNotNull(arguments, "offset", parameters.Offset);
		AddIfNotNull(arguments, "win", parameters.Win);
		AddIfNotNull(arguments, "patch", (int?)parameters.Patch);
		AddIfNotNull(arguments, "game_mode", (int?)parameters.GameMode);
		AddIfNotNull(arguments, "lobby_type", (int?)parameters.LobbyType);
		AddIfNotNull(arguments, "region", (int?)parameters.Region);
		AddIfNotNull(arguments, "date", parameters.Date);
		AddIfNotNull(arguments, "lane_role", (int?)parameters.LaneRole);
		AddIfNotNull(arguments, "hero_id", parameters.HeroId);
		AddIfNotNull(arguments, "is_radiant", parameters.IsRadiant);
		AddIfNotNull(arguments, "significant", parameters.Significant);
		AddIfNotNull(arguments, "having", parameters.Having);

		if (!string.IsNullOrEmpty(parameters.Sort))
			arguments.Add(new KeyValuePair<string, string>("sort", parameters.Sort));

		AddListParameters(arguments, "included_account_id", parameters.IncludedAccountIds);
		AddListParameters(arguments, "excluded_account_id", parameters.ExcludedAccountIds);
		AddListParameters(arguments, "with_hero_id", parameters.WithHeroIds);
		AddListParameters(arguments, "against_hero_id", parameters.AgainstHeroIds);
		AddListParameters(arguments, "project", parameters.Project);

		return arguments;
	}

	private static void AddIfNotNull(List<KeyValuePair<string, string>> list, string key, int? value)
	{
		if (value.HasValue)
			list.Add(new KeyValuePair<string, string>(key, value.Value.ToString()));
	}

	private static void AddListParameters<T>(List<KeyValuePair<string, string>> list, string key,
		IEnumerable<T>? values)
	{
		if (values is null) return;

		list.AddRange(values.Select(
			value => new KeyValuePair<string, string>(key, value?.ToString() ?? "")));
	}
}
