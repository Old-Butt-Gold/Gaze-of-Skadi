using OpenDota;
using Tests.Extensions;
using Xunit.Abstractions;

namespace Tests.EndpointsTests;

public class HeroesEndpointTests(ITestOutputHelper testOutputHelper)
{
	private readonly OpenDotaApi _openDotaApi = new();

    [Fact]
    public async Task TestGetHeroBenchmark()
    {
        const int heroId = 2;

        var result = await _openDotaApi.Heroes.GetHeroBenchmarkAsync(heroId);

        if (result != null)
        {
            Assert.Equal(heroId, result.HeroId);
            Assert.NotNull(result.Result);
            Assert.Equal(11, result.Result.GoldPerMinutes.Count);
            Assert.Equal(11, result.Result.XpPerMinutes.Count);
            Assert.Equal(11, result.Result.KillsPerMinutes.Count);
            Assert.Equal(11, result.Result.LastHitPerMinutes.Count);
            Assert.Equal(11, result.Result.HeroDamagePerMinutes.Count);
            Assert.Equal(11, result.Result.HeroHealingPerMinutes.Count);
            Assert.Equal(11, result.Result.TowerDamage.Count);
        }
    }

    [Fact]
	public async Task TestGetHeroStat()
	{
		var result = await _openDotaApi.Heroes.GetHeroStatsAsync();

		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			var first = result.First();

			Assert.True(first.Id > 0);
			Assert.True(first.Legs >= 0);
			Assert.True(first.Roles.Any());

			Assert.True(first.BaseHealth >= 0);
			Assert.True(first.BaseHealthRegen >= 0);
			Assert.True(first.BaseMana >= 0);
			Assert.True(first.BaseManaRegen >= 0);
			Assert.True(first.BaseArmor >= -3);
			Assert.True(first.BaseMr >= 0);
			Assert.True(first.BaseAttackMin >= 0);
			Assert.True(first.BaseAttackMax >= 0);
			Assert.True(first.BaseStrength >= 0);
			Assert.True(first.BaseAgility >= 0);
			Assert.True(first.BaseIntelligence >= 0);
			Assert.True(first.StrengthGain > 0);
			Assert.True(first.AgilityGain >= 0);
			Assert.True(first.IntelligenceGain > 0);
			Assert.True(first.AttackRange > 0);
			Assert.True(first.ProjectileSpeed >= 0);
			Assert.True(first.AttackRate >= 0);
			Assert.True(first.MoveSpeed >= 0);
			Assert.True(first.TurnRate is >= 0 or null);
			Assert.True(first.ProPick >= 0);
			Assert.True(first.ProWin >= 0);
			Assert.True(first.ProBan >= 0);
			Assert.True(first.HeraldPicks >= 0);
			Assert.True(first.HeraldWins >= 0);
			Assert.True(first.GuardianPicks >= 0);
			Assert.True(first.GuardianWins >= 0);
			Assert.True(first.CrusaderPicks >= 0);
			Assert.True(first.CrusaderWins >= 0);
			Assert.True(first.ArchonPicks >= 0);
			Assert.True(first.ArchonWins >= 0);
			Assert.True(first.LegendPicks >= 0);
			Assert.True(first.LegendWins >= 0);
			Assert.True(first.AncientPicks >= 0);
			Assert.True(first.AncientWins >= 0);
			Assert.True(first.DivinePicks >= 0);
			Assert.True(first.DivineWins >= 0);
			Assert.True(first.ImmortalPicks >= 0);
			Assert.True(first.ImmortalWins >= 0);

			Assert.False(string.IsNullOrWhiteSpace(first.Name));
			Assert.False(string.IsNullOrWhiteSpace(first.LocalizedName));
			Assert.False(string.IsNullOrWhiteSpace(first.Image));
			Assert.False(string.IsNullOrWhiteSpace(first.Icon));
		}
	}

	[Fact]
	public async Task TestGetHeroStats()
	{
		var result = await _openDotaApi.Heroes.GetHeroStatsAsync();

		testOutputHelper.WriteLine(result.ToJsonString());

		Assert.True(result?.TrueForAll(x => x != null));
	}

    [Fact]
    public async Task TestGetHeroRankings()
    {
        const int heroId = 40;
        var result = await _openDotaApi.Heroes.GetHeroRankingsAsync(heroId);
        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {
            Assert.Equal(heroId, result.HeroId);

            Assert.Equal(100, result.Rankings.Count);
            Assert.True(result.Rankings.All(x => x.AccountId > 0));
            Assert.Contains(result.Rankings, x => x.RankTier > 0);
            Assert.True(result.Rankings.All(x => x.RankTier > 0));
            Assert.True(result.Rankings.All(x => x.Score > 0));
            Assert.Contains(result.Rankings, x => x.LastLogin > new DateTime(2000, 1, 1));
            Assert.True(result.Rankings.All(x => !x.LastLogin.HasValue || x.LastLogin > new DateTime(2000, 1, 1)));
            Assert.Contains(result.Rankings, x => !string.IsNullOrWhiteSpace(x.Name));
            Assert.True(result.Rankings.All(x => !string.IsNullOrWhiteSpace(x.Avatar?.ToString())));
            Assert.True(result.Rankings.All(x => !string.IsNullOrWhiteSpace(x.PersonaName)));
        }
    }

	[Fact]
	public async Task TestGetHeroes()
	{
		var result = await _openDotaApi.Heroes.GetHeroesAsync();
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count >= 119);
			Assert.True(result.TrueForAll(x => x.Roles.Count > 0));
			Assert.True(result.TrueForAll(x => x.Id > 0));
			Assert.True(result.TrueForAll(x => x.Legs >= 0));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.Name)));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.LocalizedName)));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetHeroDurations()
	{
		var result = await _openDotaApi.Heroes.GetHeroDurationsAsync(1);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.TrueForAll(x => x.GamesPlayed > 0));
			Assert.True(result.TrueForAll(x => x.DurationBin > 0));
			Assert.True(result.TrueForAll(x => x.Wins >= 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetHeroMatches()
	{
		var result = await _openDotaApi.Heroes.GetHeroMatchesAsync(2);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.Equal(100, result.Count);
			Assert.True(result.TrueForAll(x => x.MatchId > 0));
			Assert.True(result.TrueForAll(x => x.StartTime > 0));
			Assert.True(result.TrueForAll(x => x.Duration > 0));
			Assert.True(result.TrueForAll(x => x.LeagueId > 0));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.LeagueName)));
			Assert.True(result.TrueForAll(x => x.PlayerSlot >= 0));
			Assert.True(result.TrueForAll(x => x.AccountId > 0));
			Assert.True(result.TrueForAll(x => x.Kills >= 0));
			Assert.True(result.TrueForAll(x => x.Deaths >= 0));
			Assert.True(result.TrueForAll(x => x.Assists >= 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetHeroMatchups()
	{
		var result = await _openDotaApi.Heroes.GetHeroMatchupsAsync(3);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count >= 118);
			Assert.True(result.TrueForAll(x => x.HeroId > 0));
			Assert.True(result.TrueForAll(x => x.GamesPlayed > 0));
		}
		else
		{
			Assert.Fail();
		}
	}

	[Fact]
	public async Task TestGetHeroPlayers()
	{
		var result = await _openDotaApi.Heroes.GetHeroPlayersAsync(4);
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.True(result.Count >= 1000);
			Assert.Contains(result, x => x.AccountId > 0);
			Assert.True(result.TrueForAll(x => x.GamesPlayed > 0));
			Assert.True(result.TrueForAll(x => x.Wins >= 0));
		}
		else
		{
			Assert.Fail();
		}
	}
}
