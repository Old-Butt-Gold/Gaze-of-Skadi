using System.Net.Mime;
using GoS.Application.Features.Steam.Queries.GetSteamPlayers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SteamController : ApiControllerBase
{
    public SteamController(ISender sender) : base(sender) { }

    [HttpGet("steamplayers")]
    [ProducesResponseType(typeof(IEnumerable<SteamPlayerDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetSteamPlayersByIds([FromQuery] string[] ids, CancellationToken ct = default)
        => HandleQueryAsync(new GetSteamPlayersQuery(ids), ct);
}
