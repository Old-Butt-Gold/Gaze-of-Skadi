using GoS.Domain.Search.Models;

namespace OpenDota.Routes.Search;

/// <summary>
/// Represents search endpoint.
/// </summary>
public interface ISearchEndpoint
{
    /// <summary>
    /// Search players by PersonaName.
    /// </summary>
    /// <param name="personaName">Search string.</param>
    /// <returns>Players by PersonaName.</returns>
    Task<List<PlayerResponse>?> GetPlayersByNameAsync(string personaName);

    /// <summary>
    /// Get list of pro players.
    /// </summary>
    /// <returns>List of pro players.</returns>
    Task<List<ProPlayer>?> GetProPlayersAsync();
}
