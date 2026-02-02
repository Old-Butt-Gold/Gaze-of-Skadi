using System.Net.Mime;
using GoS.Application.Features.Steam.Queries.GetSteamNews;
using GoS.Application.Features.Steam.Queries.GetSteamPlayers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SteamController : ApiControllerBase
{
    public SteamController(ISender sender) : base(sender) { }

    [HttpGet("news")]
    [ProducesResponseType(typeof(IEnumerable<SteamNewsDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetSteamNews([FromQuery] int count = 20, CancellationToken ct = default)
        => HandleQueryAsync(new GetSteamNewsQuery(count), ct);

    [HttpGet("players-info")]
    [ProducesResponseType(typeof(IEnumerable<SteamPlayerDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetSteamPlayersByIds([FromQuery] string[] ids, CancellationToken ct = default)
        => HandleQueryAsync(new GetSteamPlayersQuery(ids), ct);
}
