using System.Net.Mime;
using GoS.Application.Features.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RequestController : ApiControllerBase
{
    public RequestController(ISender sender) : base(sender) { }

    [HttpPost("{matchId:long}")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(bool), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ParseMatch(long matchId, CancellationToken ct)
    {
        var result = await Sender.Send(new ParseMatchCommand(matchId), ct);
        return result ? Ok(result) : BadRequest(result);
    }
}
