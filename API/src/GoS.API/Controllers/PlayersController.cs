using System.Net.Mime;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Players.Queries.GetPlayerActivity;
using GoS.Application.Features.Players.Queries.GetPlayerById;
using GoS.Application.Features.Players.Queries.GetPlayerCounts;
using GoS.Application.Features.Players.Queries.GetPlayerHeroes;
using GoS.Application.Features.Players.Queries.GetPlayerHeroRankings;
using GoS.Application.Features.Players.Queries.GetPlayerHistograms;
using GoS.Application.Features.Players.Queries.GetPlayerMatches;
using GoS.Application.Features.Players.Queries.GetPlayerPeers;
using GoS.Application.Features.Players.Queries.GetPlayerPros;
using GoS.Application.Features.Players.Queries.GetPlayerRecord;
using GoS.Application.Features.Players.Queries.GetPlayerTotals;
using GoS.Application.Features.Players.Queries.GetPlayerWardMap;
using GoS.Application.Features.Players.Queries.GetPlayerWinLossById;
using GoS.Application.Features.Players.Queries.GetPlayerWordCloud;
using GoS.Domain.Players.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]/{accountId:long}")]
public sealed class PlayersController : ApiControllerBase
{
    public PlayersController(ISender sender) : base(sender) { }

    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(PlayerDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerById([FromRoute] long accountId)
        => HandleQueryAsync(new GetPlayerByIdQuery(accountId));

    [HttpGet("wl")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(PlayerWinLossDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerWinLossById(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerWinLossByIdQuery(accountId, parameters));

    [HttpGet("recentMatches")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerMatchDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerRecentMatches(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
    {
        parameters.Limit ??= 20;
        return HandleQueryAsync(new GetPlayerMatchesQuery(accountId, parameters));
    }

    [HttpGet("matches")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerMatchDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerMatches(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerMatchesQuery(accountId, parameters));

    [HttpGet("heroes")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerHeroDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerHeroes(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerHeroesQuery(accountId, parameters));

    [HttpGet("peers")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerPeerDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerPeers(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerPeersQuery(accountId, parameters));

    [HttpGet("pros")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerProDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerPros(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerProsQuery(accountId, parameters));

    [HttpGet("records/{field}")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerRecordDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerRecords(
        [FromRoute] long accountId,
        [FromRoute] PlayerFieldHistogram field,
        [FromQuery] PlayerEndpointParameters parameters) =>
        HandleQueryAsync(new GetPlayerRecordsQuery(accountId, field, parameters));

    [HttpGet("totals")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerTotalDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerTotals(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerTotalsQuery(accountId, parameters));

    [HttpGet("counts")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(PlayerCountDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerCounts(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerCountsQuery(accountId, parameters));

    [HttpGet("histograms/{field}")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerHistogramDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerHistograms(
        [FromRoute] long accountId,
        [FromRoute] PlayerFieldHistogram field,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerHistogramsQuery(accountId, field, parameters));

    [HttpGet("wardmap")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(PlayerWardMapDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerWardMap(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerWardMapQuery(accountId, parameters));

    [HttpGet("wordcloud")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(PlayerWordCloudDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerWordCloud(
        [FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerWordCloudQuery(accountId, parameters));

    [HttpGet("rankings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerHeroRankingDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerHeroRankings([FromRoute] long accountId)
        => HandleQueryAsync(new GetPlayerHeroRankingsQuery(accountId));

    [HttpGet("activity")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<DateOnly, IEnumerable<PlayerMatchDto>>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetPlayerActivity([FromRoute] long accountId,
        [FromQuery] PlayerEndpointParameters parameters)
        => HandleQueryAsync(new GetPlayerActivityQuery(accountId, parameters));
}
