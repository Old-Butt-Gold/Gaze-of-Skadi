using GoS.Domain.Heroes.Models;

namespace OpenDota.Routes.Heroes;

/// <summary>
/// Represents a heroes endpoint.
/// </summary>
public interface IHeroesEndpoint
{
	/// <summary>
	/// Get hero data. GET /heroes.
	/// </summary>
	/// <returns>Hero data.</returns>
	Task<List<Hero>?> GetHeroesAsync();

    /// <summary>
    /// Get stats about hero performance in recent matches.
    /// Will be used on another link before getting information about hero!
    /// </summary>
    /// <returns>Stats about hero performance in recent matches.</returns>
    Task<List<HeroStats>?> GetHeroStatsAsync();

    /// <summary>
    /// Gets top players by hero.
    /// </summary>
    /// <param name="heroId"></param>
    /// <returns>Top players by hero.</returns>
    Task<HeroRanking?> GetHeroRankingsAsync(int heroId);

    /// <summary>
    /// Gets benchmarks of average stat values for a hero.
    /// </summary>
    /// <param name="heroId">Hero ID.</param>
    /// <returns>Benchmarks of average stat values for a hero.</returns>
    Task<Benchmark?> GetHeroBenchmarkAsync(int heroId);

	/// <summary>
	/// Get recent matches with a hero. GET /heroes/{hero_id}/matches.
	/// </summary>
	/// <param name="heroId"></param>
	/// <returns>Recent matches with a hero.</returns>
	Task<List<HeroMatch>?> GetHeroMatchesAsync(int heroId);

	/// <summary>
	/// Get results against other heroes for a hero. GET /heroes/{hero_id}/matchups.
	/// </summary>
	/// <param name="heroId"></param>
	/// <returns>Results against other heroes for a hero.</returns>
	Task<List<HeroMatchup>?> GetHeroMatchupsAsync(int heroId);

	/// <summary>
	/// Get hero performance over a range of match durations. GET /heroes/{hero_id}/durations.
	/// </summary>
	/// <param name="heroId"></param>
	/// <returns>Hero performance over a range of match durations.</returns>
	Task<List<HeroDuration>?> GetHeroDurationsAsync(int heroId);

	/// <summary>
	/// Get players who have played this hero. GET /heroes/{hero_id}/players.
	/// </summary>
	/// <param name="heroId"></param>
	/// <returns>Players who have played this hero.</returns>
	Task<List<HeroPlayer>?> GetHeroPlayersAsync(int heroId);

	/// <summary>
	/// Get item popularity of hero categoried by start, early, mid and late game, analyzed from professional games. GET /heroes/{hero_id}/itemPopularity.
	/// </summary>
	/// <param name="heroId">The hero identifier.</param>
	/// <returns></returns>
	Task<HeroItemPopularity?> GetHeroItemPopularityAsync(int heroId);
}
