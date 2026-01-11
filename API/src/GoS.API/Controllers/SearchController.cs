using System.Net.Mime;
using GoS.Application.Features.Search.Queries.GetPlayersByName;
using GoS.Application.Features.Search.Queries.GetProPlayersByName;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class SearchController : ApiControllerBase
{
    public SearchController(ISender sender) : base(sender) { }

    [HttpGet("players")]
    [ProducesResponseType(typeof(IEnumerable<PlayerResponseDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetPlayersByName([FromQuery] string q, CancellationToken ct = default)
        => HandleQueryAsync(new GetPlayersByNameQuery(q), ct);

    [HttpGet("proplayers")]
    [ProducesResponseType(typeof(IEnumerable<ProPlayerDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetProPlayersByName([FromQuery] string? q, CancellationToken ct = default)
        => HandleQueryAsync(new GetProPlayersByNameQuery(q), ct);
}
