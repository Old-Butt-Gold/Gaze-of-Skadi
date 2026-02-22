using System.Net.Mime;
using GoS.Application.Features.Matches.Queries.GetMatchActionsById;
using GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;
using GoS.Application.Features.Matches.Queries.GetMatchCastsById;
using GoS.Application.Features.Matches.Queries.GetMatchChatById;
using GoS.Application.Features.Matches.Queries.GetMatchCosmeticsById;
using GoS.Application.Features.Matches.Queries.GetMatchDamageById;
using GoS.Application.Features.Matches.Queries.GetMatchEarningsById;
using GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;
using GoS.Application.Features.Matches.Queries.GetMatchItemsById;
using GoS.Application.Features.Matches.Queries.GetMatchJournalById;
using GoS.Application.Features.Matches.Queries.GetMatchLaneById;
using GoS.Application.Features.Matches.Queries.GetMatchObjectivesById;
using GoS.Application.Features.Matches.Queries.GetMatchOverviewById;
using GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;
using GoS.Application.Features.Matches.Queries.GetMatchPlayersById;
using GoS.Application.Features.Matches.Queries.GetMatchTeamfightsById;
using GoS.Application.Features.Matches.Queries.GetMatchVisionById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]/{matchId:long}")]
public sealed class MatchesController : ApiControllerBase
{
    public MatchesController(ISender sender) : base(sender) { }

    [HttpGet("players")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<MatchPlayerInformationDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchPlayersById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchPlayersByIdQuery(matchId), ct);

    [HttpGet("overview")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchOverviewDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchOverviewById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchOverviewByIdQuery(matchId), ct);

    [HttpGet("benchmarks")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerBenchmarkDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchBenchmarksById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchBenchmarksByIdQuery(matchId), ct);

    [HttpGet("performance")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerPerformanceDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchPerformancesById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchPerformancesByIdQuery(matchId), ct);

    [HttpGet("items")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerItemsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchItemsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchItemsByIdQuery(matchId), ct);

    [HttpGet("lanes")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerLaneDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchLaneById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchLaneByIdQuery(matchId), ct);

    [HttpGet("earnings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerEarningsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchEarningsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchEarningsByIdQuery(matchId), ct);

    [HttpGet("graphics")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchGraphicsDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchGraphicsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchGraphicsByIdQuery(matchId), ct);

    [HttpGet("damage")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerDamageDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchDamageById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchDamageByIdQuery(matchId), ct);

    [HttpGet("objectives")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerObjectivesDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchObjectivesById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchObjectivesByIdQuery(matchId), ct);

    [HttpGet("actions")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerActionsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchActionsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchActionsByIdQuery(matchId), ct);

    [HttpGet("chat")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<ChatMessageDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchChatById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchChatByIdQuery(matchId), ct);

    [HttpGet("casts")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerCastsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchCastsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchCastsByIdQuery(matchId), ct);

    [HttpGet("teamfights")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<TotalTeamfightInformationDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchTeamfightsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchTeamfightsByIdQuery(matchId), ct);

    [HttpGet("journal")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchJournalDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchJournalById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchJournalByIdQuery(matchId), ct);

    [HttpGet("cosmetics")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerCosmeticsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchCosmeticsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchCosmeticsByIdQuery(matchId), ct);

    [HttpGet("vision")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchVisionDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchVisionById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchVisionByIdQuery(matchId), ct);
}
