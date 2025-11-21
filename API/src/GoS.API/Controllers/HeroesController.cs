using System.Net.Mime;
using GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;
using GoS.Application.Features.Heroes.Queries.GetHeroDurations;
using GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;
using GoS.Application.Features.Heroes.Queries.GetHeroMatchups;
using GoS.Application.Features.Heroes.Queries.GetHeroMatches;
using GoS.Application.Features.Heroes.Queries.GetHeroPlayers;
using GoS.Application.Features.Heroes.Queries.GetHeroStats;
using GoS.Application.Features.Heroes.Queries.GetHeroes;
using GoS.Application.Features.Heroes.Queries.GetHeroRanking;
using GoS.Domain.Resources.Models.Heroes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class HeroesController : ApiControllerBase
{
    public HeroesController(ISender sender) : base(sender) { }

    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, HeroInfo>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetHeroes()
        => HandleQueryAsync(new GetHeroesQuery());

    [HttpGet("stats")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroStatsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetHeroStats()
        => HandleQueryAsync(new GetHeroStatsQuery());

    [HttpGet("{heroId:int}/rankings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(HeroRankingDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroRankings([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroRankingsQuery(heroId));

    [HttpGet("{heroId:int}/benchmark")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(BenchmarkDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroBenchmark([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroBenchmarkQuery(heroId));

    [HttpGet("{heroId:int}/matches")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroMatchDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroMatches([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroMatchesQuery(heroId));

    [HttpGet("{heroId:int}/matchups")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroMatchupDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroMatchups([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroMatchupsQuery(heroId));

    [HttpGet("{heroId:int}/durations")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroDurationDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroDurations([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroDurationsQuery(heroId));

    [HttpGet("{heroId:int}/players")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroPlayerDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroPlayers([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroPlayersQuery(heroId));

    [HttpGet("{heroId:int}/item-popularity")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(HeroItemPopularityDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetHeroItemPopularity([FromRoute] int heroId)
        => HandleQueryAsync(new GetHeroItemPopularityQuery(heroId));
}