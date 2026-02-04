using System.Net.Mime;
using GoS.Application.Features.Stratz;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StratzController : ApiControllerBase
{
    public StratzController(ISender sender) : base(sender) { }

    [HttpGet("players-regions")]
    [ProducesResponseType(typeof(PlayersQueueDto), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetPlayersRegions(CancellationToken ct = default)
        => HandleQueryAsync(new GetPlayersQueueQuery(), ct);
}
