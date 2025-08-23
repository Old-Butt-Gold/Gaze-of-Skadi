using GoS.Domain.Common.Enums;
using GoS.Domain.Common.Models;
using OpenDota.Extensions;
using OpenDota.Utilities;

namespace OpenDota.Routes.Common;

/// <inheritdoc />
public class CommonEndpoint(Requester requester) : ICommonEndpoint
{
    /// <inheritdoc />
    public Task<Distribution?> GetDistributionsAsync()
    {
        return requester.GetResponseAsync<Distribution>("distributions");
    }

    /// <inheritdoc />
    public Task<List<Record>?> GetRecordsByFieldAsync(CommonFieldRecords field)
    {
        return requester.GetResponseAsync<List<Record>>($"records/{field.ToSnakeCase()}");
    }

    /// <inheritdoc />
    public Task<List<ItemTiming>?> GetItemTimingAsync(string? item = null, int? heroId = null)
    {
        return requester.GetResponseAsync<List<ItemTiming>>("scenarios/itemTimings",
            GetParameters(item, heroId));
    }

    /// <inheritdoc />
    public Task<List<LaneRoles>?> GetLaneRolesAsync(int? laneRole = null, int? heroId = null)
    {
        return requester.GetResponseAsync<List<LaneRoles>>("scenarios/laneRoles",
            GetParameters(null, heroId, laneRole));
    }

    /// <inheritdoc />
    public Task<List<League>?> GetLeaguesAsync()
    {
        return requester.GetResponseAsync<List<League>>("leagues");
    }

    private static ICollection<KeyValuePair<string, string>> GetParameters(string? item = null, int? heroId = null, int? laneRole = null)
    {
        var parameters = new List<KeyValuePair<string, string>>();

        if (!string.IsNullOrEmpty(item))
            parameters.Add(new("item", item));

        if (heroId.HasValue)
            parameters.Add(new("hero_id", heroId.Value.ToString()));

        if (laneRole.HasValue)
            parameters.Add(new("lane_role", laneRole.Value.ToString()));

        return parameters;
    }

}
