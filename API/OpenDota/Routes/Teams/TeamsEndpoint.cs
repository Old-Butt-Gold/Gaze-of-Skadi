using OpenDota.Routes.Teams.Models;
using OpenDota.Utilities;

namespace OpenDota.Routes.Teams;

/// <inheritdoc />
public class TeamsEndpoint(Requester requester) : ITeamsEndpoint
{
	/// <inheritdoc />
	public Task<List<Team>?> GetTeamsAsync() =>
		requester.GetResponseAsync<List<Team>>("teams");

	/// <inheritdoc />
	public Task<Team?> GetTeamByIdAsync(int teamId) =>
		requester.GetResponseAsync<Team>($"teams/{teamId}");

	/// <inheritdoc />
	public Task<List<TeamMatch>?> GetTeamMatchesByIdAsync(int teamId) =>
		requester.GetResponseAsync<List<TeamMatch>>($"teams/{teamId}/matches");

	/// <inheritdoc />
	public Task<List<TeamPlayer>?> GetTeamPlayersByIdAsync(int teamId) =>
		requester.GetResponseAsync<List<TeamPlayer>>($"teams/{teamId}/players");

	/// <inheritdoc />
	public Task<List<TeamHero>?> GetTeamHeroesByIdAsync(int teamId) =>
		requester.GetResponseAsync<List<TeamHero>>($"teams/{teamId}/heroes");
}
