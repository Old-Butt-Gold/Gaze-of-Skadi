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
using GoS.Domain.Heroes.Models;
using GoS.Domain.Resources.Models.Heroes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class HeroesController : ControllerBase
{
    private readonly ISender _sender;

    public HeroesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, HeroInfo>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetHeroes()
    {
        var result = await _sender.Send(new GetHeroesQuery());
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("stats")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroStats>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetHeroStats()
    {
        var result = await _sender.Send(new GetHeroStatsQuery());
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/rankings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(HeroRanking), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroRankings(int heroId)
    {
        var result = await _sender.Send(new GetHeroRankingsQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/benchmark")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Benchmark), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroBenchmark(int heroId)
    {
        var result = await _sender.Send(new GetHeroBenchmarkQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/matches")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroMatch>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroMatches(int heroId)
    {
        var result = await _sender.Send(new GetHeroMatchesQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/matchups")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroMatchup>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroMatchups(int heroId)
    {
        var result = await _sender.Send(new GetHeroMatchupsQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/durations")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroDuration>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroDurations(int heroId)
    {
        var result = await _sender.Send(new GetHeroDurationsQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/players")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<HeroPlayer>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroPlayers(int heroId)
    {
        var result = await _sender.Send(new GetHeroPlayersQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{heroId:int}/item-popularity")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(HeroItemPopularity), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHeroItemPopularity(int heroId)
    {
        var result = await _sender.Send(new GetHeroItemPopularityQuery(heroId));
        return result is null ? NotFound() : Ok(result);
    }
}
