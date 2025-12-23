using System.Net.Mime;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Matches.Queries.FindMatches;
using GoS.Application.Features.Matches.Queries.GetMatchBenchmarksById;
using GoS.Application.Features.Matches.Queries.GetMatchOverviewById;
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
    [ProducesResponseType(typeof(MatchBenchmarksDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetMatchBenchmarksById([FromRoute] long matchId)
        => HandleQueryAsync(new GetMatchBenchmarksByIdQuery(matchId));

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