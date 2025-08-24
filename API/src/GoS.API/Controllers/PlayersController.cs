using System.Net.Mime;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Commands.RefreshPlayerMatchHistory;
using GoS.Application.Features.Players.Queries.GetPlayerById;
using GoS.Application.Features.Players.Queries.GetPlayerCounts;
using GoS.Application.Features.Players.Queries.GetPlayerHeroes;
using GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;
using GoS.Application.Features.Players.Queries.GetPlayerHistograms;
using GoS.Application.Features.Players.Queries.GetPlayerMatches;
using GoS.Application.Features.Players.Queries.GetPlayerPeers;
using GoS.Application.Features.Players.Queries.GetPlayerPros;
using GoS.Application.Features.Players.Queries.GetPlayerRecentMatches;
using GoS.Application.Features.Players.Queries.GetPlayerTotals;
using GoS.Application.Features.Players.Queries.GetPlayerWardMap;
using GoS.Application.Features.Players.Queries.GetPlayerWinLossById;
using GoS.Application.Features.Players.Queries.GetPlayerWordCloud;
using GoS.Domain.Players.Enums;
using GoS.Domain.Players.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]/{accountId:long}")]
public sealed class PlayersController : ControllerBase
{
    private readonly ISender _sender;

    public PlayersController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<Player?>> GetPlayerById(long accountId)
    {
        var result = await _sender.Send(new GetPlayerByIdQuery(accountId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("wl")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<PlayerWinLoss?>> GetPlayerWinLossById(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerWinLossByIdQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("recentMatches")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerRecentMatch>>> GetPlayerRecentMatches(long accountId)
    {
        var result = await _sender.Send(new GetPlayerRecentMatchesQuery(accountId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("matches")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerMatch>>> GetPlayerMatches(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerMatchesQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("heroes")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerHero>>> GetPlayerHeroes(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerHeroesQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("peers")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerPeer>>> GetPlayerPeers(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerPeersQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("pros")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerPro>>> GetPlayerPros(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerProsQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("totals")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerTotal>>> GetPlayerTotals(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerTotalsQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("counts")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<PlayerCount?>> GetPlayerCounts(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerCountsQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("histograms/{field}")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerHistogram>>> GetPlayerHistograms(long accountId, PlayerFieldHistogram field, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerHistogramsQuery(accountId, field, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("wardmap")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<PlayerWardMap?>> GetPlayerWardMap(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerWardMapQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("wordcloud")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<PlayerWordCloud?>> GetPlayerWordCloud(long accountId, [FromQuery] PlayerEndpointParameters parameters)
    {
        var result = await _sender.Send(new GetPlayerWordCloudQuery(accountId, parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("rankings")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<IEnumerable<PlayerHeroRanking>>> GetPlayerHeroRankings(long accountId)
    {
        var result = await _sender.Send(new GetPlayerHeroRankingsQuery(accountId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost("refresh")]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult> RefreshPlayerMatchHistory(long accountId)
    {
        var result = await _sender.Send(new RefreshPlayerMatchHistoryCommand(accountId));
        return Ok(result);
    }
}
