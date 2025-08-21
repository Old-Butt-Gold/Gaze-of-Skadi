using OpenDota;
using OpenDota.Enums;
using OpenDota.Enums.Permanent;
using Tests.Extensions;
using Xunit.Abstractions;

namespace Tests.EndpointsTests;

public class PlayersEndpointTests(ITestOutputHelper testOutputHelper)
{
	private readonly OpenDotaApi _openDotaApi = new();

	[Fact]
	public async Task TestGetPlayerById()
	{
		var result = await _openDotaApi.Players.GetPlayerByIdAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
			Assert.Equal(34505203, result.Profile.AccountId);
	}

	[Fact]
	public async Task TestGetPlayerWinLossById()
	{
		var result = await _openDotaApi.Players.GetPlayerWinLossByIdAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Wins > 0);
			Assert.True(result.Losses > 0);
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerRecentMatches()
	{
		var result = await _openDotaApi.Players.GetPlayerRecentMatchesAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 0);
			Assert.True(result.TrueForAll(x => x.MatchId > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerMatches()
	{
		var result = await _openDotaApi.Players.GetPlayerMatchesAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 0);
			Assert.True(result.TrueForAll(x => x.MatchId > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerHeroes()
	{
		var result = await _openDotaApi.Players.GetPlayerHeroesAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 0);
			Assert.True(result.TrueForAll(x => x.HeroId > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerPeers()
	{
		var result = await _openDotaApi.Players.GetPlayerPeersAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 0);
			Assert.True(result.TrueForAll(x => x.AccountId > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerPros()
	{
		var result = await _openDotaApi.Players.GetPlayerProsAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 0);
			Assert.True(result.TrueForAll(x => x.AccountId > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerTotals()
	{
		var result = await _openDotaApi.Players.GetPlayerTotalsAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 0);
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerCounts()
	{
		var result = await _openDotaApi.Players.GetPlayerCountsAsync(34505203);
		if (result != null)
		{
			testOutputHelper.WriteLine(result.ToJsonString());

			Assert.True(result.GameMode.Count > 0);
			Assert.True(result.IsRadiant.Count > 0);
			Assert.True(result.LaneRole.Count > 0);
			Assert.True(result.LeaverStatus.Count > 0);
			Assert.True(result.LobbyType.Count > 0);
			Assert.True(result.Patch.Count > 0);
			Assert.True(result.Region.Count > 0);
		}
	}

	[Fact]
	public async Task TestGetPlayerHistograms()
	{
        var items = Enum.GetValues<Field>();

        foreach (var item in items)
        {
            var result = await _openDotaApi.Players.GetPlayerHistogramsAsync(396181672, item);
            testOutputHelper.WriteLine(result.ToJsonString());

            if (result != null)
            {
                Assert.True(result.Count > 0);
            }
            else
            {
                Assert.Fail();
            }
        }

	}

	[Fact]
	public async Task TestGetPlayerWardMap()
	{
		var result = await _openDotaApi.Players.GetPlayerWardMapAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		Assert.True(result is { Obs.Count: > 0 });
	}

	[Fact]
	public async Task TestGetPlayerWordCloud()
	{
		var result = await _openDotaApi.Players.GetPlayerWordCloudAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		Assert.True(result is { AllWordCounts.Count: > 0 });
	}

	[Fact]
	public async Task TestGetPlayerRatings()
	{
		var result = await _openDotaApi.Players.GetPlayerRatingsAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			if (result.Count >= 0)
			{
				Assert.True(result.TrueForAll(x => x.AccountId > 0));
			}
			else
			{
				Assert.Fail();
			}
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetPlayerHeroRankings()
	{
		var result = await _openDotaApi.Players.GetPlayerHeroRankingsAsync(34505203);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
			Assert.True(result.Count > 0);
	}
}
