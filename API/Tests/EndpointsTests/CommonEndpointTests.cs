using GoS.Domain.BaseEnums;
using GoS.Domain.Common.Enums;
using OpenDota;
using Tests.Extensions;
using Xunit.Abstractions;

namespace Tests.EndpointsTests;

public class CommonEndpointTests(ITestOutputHelper testOutputHelper)
{
	private readonly OpenDotaApi _openDotaApi = new();

	[Fact]
	public async Task TestGetDistributions()
	{
		var result = await _openDotaApi.Common.GetDistributionsAsync();
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.NotNull(result);
		}
	}

    [Fact]
    public async Task TestGetRecordsByField()
    {
        var items = Enum.GetValues<CommonFieldRecords>();

        foreach (var item in items)
        {
            var result = await _openDotaApi.Common.GetRecordsByFieldAsync(item);
            testOutputHelper.WriteLine(result.ToJsonString());

            if (result != null)
            {
                Assert.Equal(100, result.Count);
                Assert.True(result.TrueForAll(x => x.MatchId > 0));
                Assert.True(result.TrueForAll(x => x.Score > 0));
                Assert.True(result.TrueForAll(x => x.StartTime > 0));
            }
        }
    }

    [Fact]
    public async Task TestGetWinRateForCertainItemTimingsOnHeroes()
    {
        const int heroId = 40;
        const string itemName = "sange_and_yasha";

        var result = await _openDotaApi.Common.GetItemTimingAsync(itemName, heroId);

        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {

            Assert.True(result.Count >= 0);
            Assert.True(result.TrueForAll(x => x.Item == itemName));
            Assert.True(result.TrueForAll(x => x.HeroId == heroId));
            Assert.True(result.TrueForAll(x => x.Time >= 0));
            Assert.True(result.TrueForAll(x => x.Games >= 0));
            Assert.True(result.TrueForAll(x => x.Wins >= 0));
        }
    }

    [Fact]
    public async Task TestGetWinRateForHeroesInCertainLaneRoles()
    {
        const LaneRole laneId = LaneRole.Offlane; // Offlane
        const int heroId = 40; // Venomancer

        var result = await _openDotaApi.Common.GetLaneRolesAsync(3, heroId);

        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {
            Assert.True(result.Count > 0);
            Assert.True(result.TrueForAll(x => x.LaneRole == laneId));
            Assert.True(result.TrueForAll(x => x.HeroId == heroId));
            Assert.True(result.TrueForAll(x => x.Time > 0));
            Assert.True(result.TrueForAll(x => x.Games > 0));
            Assert.True(result.TrueForAll(x => x.Wins >= 0));
        }
    }

    [Fact]
    public async Task TestGetLeagues()
    {
        var result = await _openDotaApi.Common.GetLeaguesAsync();
        var i = result.Where(x => x.Tier is null);

        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {
            Assert.True(result.Count >= 3322);
            Assert.Contains(result, x => x.Tier == Tier.Amateur);
            Assert.Contains(result, x => x.Tier == Tier.Excluded);
            Assert.Contains(result, x => x.Tier == Tier.Premium);
            Assert.Contains(result, x => x.Tier == Tier.Professional);
            Assert.Contains(result, x => x.LeagueId > 0);
            Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.Name)));
            Assert.Contains(result, x => !string.IsNullOrWhiteSpace(x.Banner));
            Assert.Contains(result, x => !string.IsNullOrWhiteSpace(x.Ticket));
        }
    }
}
