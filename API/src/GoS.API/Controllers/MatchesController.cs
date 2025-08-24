using System.Net.Mime;
using GoS.Application.EndpointParameters;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Application.Features.Matches.Queries.GetProMatches;
using GoS.Application.Features.Matches.Queries.GetPublicMatches;
using GoS.Domain.Matches.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class MatchesController : ControllerBase
{
    private readonly ISender _sender;

    public MatchesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("{matchId:long}")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Match), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMatchById(long matchId)
    {
        var result = await _sender.Send(new GetMatchByIdQuery(matchId));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("public")]
    [ProducesResponseType(typeof(IEnumerable<PublicMatch>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetPublicMatches([FromQuery] PublicMatchesEndpointParameters? parameters)
    {
        var result = await _sender.Send(new GetPublicMatchesQuery(parameters));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("pro")]
    [ProducesResponseType(typeof(IEnumerable<ProMatch>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetProMatches([FromQuery] long? lessThanMatchId)
    {
        var result = await _sender.Send(new GetProMatchesQuery(lessThanMatchId));
        return result is null ? NotFound() : Ok(result);
    }
}