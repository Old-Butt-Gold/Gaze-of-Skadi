using GoS.Domain.Heroes.Models;
using OpenDota.Utilities;

namespace OpenDota.Routes.Heroes;

/// <inheritdoc />
public class HeroesEndpoint(Requester requester) : IHeroesEndpoint
{
	/// <inheritdoc />
	public Task<List<Hero>?> GetHeroesAsync() =>
		requester.GetResponseAsync<List<Hero>>("heroes");

    /// <inheritdoc />
    public Task<List<HeroStats>?> GetHeroStatsAsync()
    {
        return requester.GetResponseAsync<List<HeroStats>>("heroStats");
    }

    /// <inheritdoc />
    public Task<HeroRanking?> GetHeroRankingsAsync(int heroId)
    {
        return requester.GetResponseAsync<HeroRanking>("rankings",
            [new KeyValuePair<string, string>("hero_id", heroId.ToString())]);
    }

    /// <inheritdoc />
    public Task<Benchmark?> GetHeroBenchmarkAsync(int heroId)
    {
        return requester.GetResponseAsync<Benchmark>(
            "benchmarks", [new ("hero_id", heroId.ToString())]);
    }

    /// <inheritdoc />
	public Task<List<HeroMatch>?> GetHeroMatchesAsync(int heroId) =>
		requester.GetResponseAsync<List<HeroMatch>>($"heroes/{heroId}/matches");

	/// <inheritdoc />
	public Task<List<HeroMatchup>?> GetHeroMatchupsAsync(int heroId) =>
		requester.GetResponseAsync<List<HeroMatchup>>($"heroes/{heroId}/matchups");

	/// <inheritdoc />
	public Task<List<HeroDuration>?> GetHeroDurationsAsync(int heroId) =>
		requester.GetResponseAsync<List<HeroDuration>>($"heroes/{heroId}/durations");

	/// <inheritdoc />
	public Task<List<HeroPlayer>?> GetHeroPlayersAsync(int heroId) =>
		requester.GetResponseAsync<List<HeroPlayer>>($"heroes/{heroId}/players");

	/// <inheritdoc />
	public Task<HeroItemPopularity?> GetHeroItemPopularityAsync(int heroId)
	{
		return requester.GetResponseAsync<HeroItemPopularity?>($"heroes/{heroId}/itemPopularity");
	}
}
