using System.Net.Mime;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Matches.Queries.FindMatches;
using GoS.Application.Features.Matches.Queries.GetMatchActionsById;
using GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;
using GoS.Application.Features.Matches.Queries.GetMatchCastsById;
using GoS.Application.Features.Matches.Queries.GetMatchChatById;
using GoS.Application.Features.Matches.Queries.GetMatchItemsById;
using GoS.Application.Features.Matches.Queries.GetMatchObjectivesById;
using GoS.Application.Features.Matches.Queries.GetMatchOverviewById;
using GoS.Application.Features.Matches.Queries.GetMatchPerformancesById;
using GoS.Application.Features.Matches.Queries.GetProMatches;
using GoS.Application.Features.Matches.Queries.GetPublicMatches;
using GoS.Domain.Matches.Models;
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
    [ProducesResponseType(typeof(Match), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchOverviewById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchOverviewByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/benchmarks")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerBenchmarkDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchBenchmarksById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchBenchmarksByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/performances")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerPerformanceDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchPerformancesById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchPerformancesByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/items")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerItemsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchItemsById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchItemsByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/objectives")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerObjectivesDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchObjectivesById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchObjectivesByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/actions")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerActionsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchActionsById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchActionsByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/chat")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<ChatMessageDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchChatById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchChatByIdQuery(matchId));
    
    [HttpGet("{matchId:long}/casts")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<PlayerCastsDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchCastsById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchCastsByIdQuery(matchId));

    [HttpGet("public")]
    [ProducesResponseType(typeof(IEnumerable<PublicMatchDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetPublicMatches([FromQuery] PublicMatchesEndpointParameters parameters)
        => HandleQueryAsync(new GetPublicMatchesQuery(parameters));

    [HttpGet("pro")]
    [ProducesResponseType(typeof(IEnumerable<ProMatchDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetProMatches([FromQuery] long? lessThanMatchId)
        => HandleQueryAsync(new GetProMatchesQuery(lessThanMatchId));

    [HttpGet("findMatches")]
    [ProducesResponseType(typeof(IEnumerable<MatchFindDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> FindMatches([FromQuery] int[] teamA, [FromQuery] int[] teamB)
        => HandleQueryAsync(new FindMatchesQuery(teamA, teamB));
}