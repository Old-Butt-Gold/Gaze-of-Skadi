using OpenDota;
using Tests.Extensions;
using Xunit.Abstractions;

namespace Tests.EndpointsTests;

public class MatchesEndpointTests(ITestOutputHelper testOutputHelper)
{
	private readonly OpenDotaApi _openDotaApi = new();

	[Fact]
	public async Task TestGetMatchById()
	{
		var result = await _openDotaApi.Matches.GetMatchByIdAsync(4986133311);
		testOutputHelper.WriteLine(result.ToJsonString());

		Assert.NotNull(result);
	}

    [Fact]
    public async Task TestGetPublicMatches()
    {
        var result = await _openDotaApi.Matches.GetPublicMatchesAsync();
        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {
            Assert.True(result.TrueForAll(x => x.MatchId > 0));
            Assert.True(result.TrueForAll(x => x.AvgRankTier > 0));
            Assert.True(result.TrueForAll(x => x.Cluster > 0));
            Assert.True(result.TrueForAll(x => x.Duration > 0));
            Assert.True(result.TrueForAll(x => x.GameMode > 0));
            Assert.True(result.TrueForAll(x => x.LobbyType >= 0));
            Assert.True(result.TrueForAll(x => x.MatchSeqNum > 0));
            Assert.True(result.TrueForAll(x => x.NumRankTier > 0));
            Assert.True(result.TrueForAll(x => x.StartTime > 0));
            Assert.True(result.TrueForAll(x => x.RadiantTeam.Length == 5));
            Assert.True(result.TrueForAll(x => x.DireTeam.Length == 5));
        }
    }

    [Fact]
    public async Task TestGetProMatches()
    {
        var result = await _openDotaApi.Matches.GetProMatchesAsync();
        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {
            Assert.Equal(100, result.Count);
            Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.LeagueName)));
            Assert.True(result.TrueForAll(x => x.MatchId > 0));
            Assert.True(result.TrueForAll(x => x.StartTime > 0));
        }
    }
}
