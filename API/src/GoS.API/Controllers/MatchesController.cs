using System.Net.Mime;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Matches.Queries.FindMatches;
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
using GoS.Application.Features.Matches.Queries.GetMatchTeamfightsById;
using GoS.Application.Features.Matches.Queries.GetMatchVisionById;
using GoS.Application.Features.Matches.Queries.GetProMatches;
using GoS.Application.Features.Matches.Queries.GetPublicMatches;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class MatchesController : ApiControllerBase
{
    public MatchesController(ISender sender) : base(sender) { }

    [HttpGet("{matchId:long}/overview")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchOverviewDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchOverviewById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchOverviewByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/benchmarks")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerBenchmarkDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchBenchmarksById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchBenchmarksByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/performances")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerPerformanceDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchPerformancesById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchPerformancesByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/items")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerItemsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchItemsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchItemsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/lanes")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerLaneDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchLaneById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchLaneByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/earnings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerEarningsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchEarningsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchEarningsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/graphics")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchGraphicsDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchGraphicsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchGraphicsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/damage")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerDamageDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchDamageById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchDamageByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/objectives")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerObjectivesDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchObjectivesById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchObjectivesByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/actions")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerActionsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchActionsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchActionsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/chat")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<ChatMessageDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchChatById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchChatByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/casts")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerCastsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchCastsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchCastsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/teamfights")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<TeamfightDetailedDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchTeamfightsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchTeamfightsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/journal")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchJournalDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchJournalById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchJournalByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/cosmetics")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerCosmeticsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchCosmeticsById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchCosmeticsByIdQuery(matchId), ct);

    [HttpGet("{matchId:long}/vision")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(MatchVisionDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchVisionById([FromRoute] long matchId, CancellationToken ct = default)
        => HandleQueryAsync(new GetMatchVisionByIdQuery(matchId), ct);

    [HttpGet("public")]
    [ProducesResponseType(typeof(IEnumerable<PublicMatchDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetPublicMatches(
        [FromQuery] PublicMatchesEndpointParameters parameters,
        CancellationToken ct = default)
        => HandleQueryAsync(new GetPublicMatchesQuery(parameters), ct);

    [HttpGet("pro")]
    [ProducesResponseType(typeof(IEnumerable<ProMatchDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetProMatches(
        [FromQuery] long? lessThanMatchId,
        CancellationToken ct = default)
        => HandleQueryAsync(new GetProMatchesQuery(lessThanMatchId), ct);

    [HttpGet("findMatches")]
    [ProducesResponseType(typeof(IEnumerable<MatchFindDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> FindMatches(
        [FromQuery] int[] teamA,
        [FromQuery] int[] teamB,
        CancellationToken ct = default)
        => HandleQueryAsync(new FindMatchesQuery(teamA, teamB), ct);
}
