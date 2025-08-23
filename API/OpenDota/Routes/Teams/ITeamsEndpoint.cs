using GoS.Domain.Teams.Models;

namespace OpenDota.Routes.Teams;

/// <summary>
/// Represents a team endpoint.
/// </summary>
public interface ITeamsEndpoint
{
	/// <summary>
	/// Get team data.
	/// </summary>
	/// <returns>Team data.</returns>
	Task<List<Team>?> GetTeamsAsync();

	/// <summary>
	/// Get data for a team.
	/// </summary>
	/// <param name="teamId"></param>
	/// <returns>Data for a team.</returns>
	Task<Team?> GetTeamByIdAsync(int teamId);

	/// <summary>
	/// Get matches for a team.
	/// </summary>
	/// <param name="teamId"></param>
	/// <returns>Matches for a team.</returns>
	Task<List<TeamMatch>?> GetTeamMatchesByIdAsync(int teamId);

	/// <summary>
	/// Get players who have played for a team.
	/// </summary>
	/// <param name="teamId"></param>
	/// <returns>Players who have played for a team.</returns>
	Task<List<TeamPlayer>?> GetTeamPlayersByIdAsync(int teamId);

	/// <summary>
	/// Get heroes for a team.
	/// </summary>
	/// <param name="teamId"></param>
	/// <returns>Heroes for a team.</returns>
	Task<List<TeamHero>?> GetTeamHeroesByIdAsync(int teamId);
}
