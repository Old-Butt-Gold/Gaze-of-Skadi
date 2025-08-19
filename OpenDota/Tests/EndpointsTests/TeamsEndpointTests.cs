using OpenDota;
using OpenDota.Enums.Permanent;
using Tests.Extensions;
using Xunit.Abstractions;

namespace Tests.EndpointsTests;

public class TeamsEndpointTests(ITestOutputHelper testOutputHelper)
{
	private readonly OpenDotaApi _openDotaApi = new();

	[Fact]
	public async Task TestGetTeams()
	{
		var result = await _openDotaApi.Teams.GetTeamsAsync();
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.Equal(1000, result.Count);
			Assert.Contains(result, x => !string.IsNullOrWhiteSpace(x.Name));
			Assert.Contains(result, x => !string.IsNullOrWhiteSpace(x.Tag));
			Assert.True(result.TrueForAll(x => x.TeamId > 0));
			Assert.True(result.TrueForAll(x => x.Wins > 0));
			Assert.True(result.TrueForAll(x => x.Losses >= 0));
			Assert.True(result.TrueForAll(x => x.LastMatchTime > 0));
			Assert.True(result.TrueForAll(x => x.Rating > 0));
			Assert.Contains(result, x => !string.IsNullOrWhiteSpace(x.LogoUrl?.ToString()));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetTeamById()
	{
		var result = await _openDotaApi.Teams.GetTeamByIdAsync(7554697);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.Equal("Nigma Galaxy", result.Name);
			Assert.Equal("NGX", result.Tag);
			Assert.True(result.TeamId > 0);
			Assert.True(result.Wins > 0);
			Assert.True(result.Losses > 0);
			Assert.True(result.LastMatchTime > 0);
			Assert.True(result.Rating > 0);
			Assert.False(string.IsNullOrWhiteSpace(result.LogoUrl?.ToString()));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task GetTeamByIdShouldReturnNullForTeamsThatAreNotFound()
	{
		var result = await _openDotaApi.Teams.GetTeamByIdAsync(1);
		Assert.Null(result);
	}

	[Fact]
	public async Task TestGetOgTeamMatchesById()
	{
		var result = await _openDotaApi.Teams.GetTeamMatchesByIdAsync(2586976); // OG
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count > 800);
			Assert.True(result.TrueForAll(x => x.MatchId > 0));
			Assert.True(result.TrueForAll(x => x.Duration > 0));
			Assert.True(result.TrueForAll(x => x.StartTime > 0));
			Assert.True(result.TrueForAll(x => x.LeagueId > 0));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.LeagueName)));
			Assert.True(result.TrueForAll(x => x.Cluster > 0));
			Assert.True(result.TrueForAll(x => x.OpposingTeamId > 0));
			Assert.Contains(result, x => !string.IsNullOrWhiteSpace(x.OpposingTeamLogo?.ToString()));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetTeamPlayersById()
	{
		var result = await _openDotaApi.Teams.GetTeamPlayersByIdAsync(7554697);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.Equal(8, result.Count(x => x.IsCurrentTeamMember == BooleanState.True));
			Assert.True(result.TrueForAll(x => x.GamesPlayed >= 0));
			Assert.True(result.TrueForAll(x => x.Wins >= 0));
			Assert.True(result.TrueForAll(x => x.AccountId > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetTeamSecretTeamHeroesById()
	{
		var result = await _openDotaApi.Teams.GetTeamHeroesByIdAsync(1838315); // Secret
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count >= 119);
			Assert.True(result.TrueForAll(x => x.HeroId > 0));
			Assert.True(result.TrueForAll(x => x.GamesPlayed > 0));
			Assert.True(result.TrueForAll(x => x.Wins > 0));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.LocalizedName)));
		}
		else
		{
			Assert.Fail();
		}
	}
}
