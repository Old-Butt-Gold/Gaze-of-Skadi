using OpenDota.Enums.Permanent;
using OpenDota.Routes.Common.Models;

namespace OpenDota.Routes.Common;

/// <summary>
/// ICommonEndpoint
/// </summary>
public interface ICommonEndpoint
{
    /// <summary>
    /// Gets distributions of MMR data by bracket.
    /// </summary>
    /// <returns>Distributions of MMR data by bracket.</returns>
    Task<Distribution?> GetDistributionsAsync();

    // ----------------------------

    /// <summary>
    /// Get records in ranked matches. Records reset monthly.
    /// </summary>
    /// <param name="field">Field name to query.</param>
    /// <returns>Records in ranked matches.</returns>
    Task<List<Record>?> GetRecordsByFieldAsync(FieldRecords field);

    // ------------------------

    /// <summary>
    /// Gets win rates for certain item timings on a hero for items that cost at least 1400 gold. GET /scenarios/itemTimings.
    /// </summary>
    /// <param name="item">Filter by item name e.g. "spirit_vessel".</param>
    /// <param name="heroId">Hero ID.</param>
    /// <returns>Win rates for certain item timings on a hero for items that cost at least 1400 gold.</returns>
    Task<List<ItemTiming>?> GetItemTimingAsync(string? item = null, int? heroId = null);

    /// <summary>
    /// Gets win rates for heroes in certain lane roles. GET /scenarios/laneRoles.
    /// </summary>
    /// <param name="laneRole">Filter by lane role 1-4 (Safe, Mid, Off, Jungle).</param>
    /// <param name="heroId">Hero ID.</param>
    /// <returns>Win rates for heroes in certain lane roles.</returns>
    Task<List<LaneRoles>?> GetLaneRolesAsync(int? laneRole = null, int? heroId = null);

    // ----------------------------- For internal uses

    /// <summary>
    /// Get league data.
    /// </summary>
    /// <returns>League data.</returns>
    Task<List<League>?> GetLeaguesAsync();
}
