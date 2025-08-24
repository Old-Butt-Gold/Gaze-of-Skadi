using System.Net.Mime;
using GoS.Application.Features.Search.Queries.GetPlayersByName;
using GoS.Application.Features.Search.Queries.GetProPlayersByName;
using GoS.Domain.Search.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class SearchController : ControllerBase
{
    private readonly ISender _sender;

    public SearchController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("players")]
    [ProducesResponseType(typeof(IEnumerable<PlayerResponse>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetPlayersByName([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return BadRequest("Query parameter 'q' is required.");

        var result = await _sender.Send(new GetPlayersByNameQuery(q));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("proplayers")]
    [ProducesResponseType(typeof(IEnumerable<ProPlayer>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetProPlayersByName([FromQuery] string q)
    {
        var result = await _sender.Send(new GetProPlayersByNameQuery(q));
        return result is null ? NotFound() : Ok(result);
    }
}