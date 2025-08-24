using GoS.Domain.Common.Enums;
using GoS.Domain.Common.Models;
using GoS.Domain.Extensions;
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
    public Task<List<ItemTiming>?> GetItemTimingAsync()
    {
        return requester.GetResponseAsync<List<ItemTiming>>("scenarios/itemTimings");
    }

    /// <inheritdoc />
    public Task<List<LaneRoles>?> GetLaneRolesAsync()
    {
        return requester.GetResponseAsync<List<LaneRoles>>("scenarios/laneRoles");
    }

    /// <inheritdoc />
    public Task<List<League>?> GetLeaguesAsync()
    {
        return requester.GetResponseAsync<List<League>>("leagues");
    }
}
