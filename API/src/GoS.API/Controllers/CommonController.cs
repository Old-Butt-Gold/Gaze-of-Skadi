using System.Net.Mime;
using GoS.Application.Features.Common.Queries.GetDistributions;
using GoS.Application.Features.Common.Queries.GetItemTimings;
using GoS.Application.Features.Common.Queries.GetLaneRoles;
using GoS.Application.Features.Common.Queries.GetLeagues;
using GoS.Application.Features.Common.Queries.GetRecordsByField;
using GoS.Domain.Common.Enums;
using GoS.Domain.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CommonController : ControllerBase
{
    private readonly ISender _sender;

    public CommonController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("distributions")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(DistributionDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDistributions()
    {
        var result = await _sender.Send(new GetDistributionsQuery());
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("records/{field}")]
    [ProducesResponseType(typeof(IEnumerable<RecordDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetRecordsByField([FromRoute] CommonFieldRecords field)
    {
        var result = await _sender.Send(new GetRecordsByFieldQuery(field));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("item-timings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<ItemTiming>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetItemTimings()
    {
        var result = await _sender.Send(new GetItemTimingsQuery());
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("lane-roles")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<LaneRoles>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLaneRoles()
    {
        var result = await _sender.Send(new GetLaneRolesQuery());
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("leagues")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<League>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLeagues()
    {
        var result = await _sender.Send(new GetLeaguesQuery());
        return result is null ? NotFound() : Ok(result);
    }
}
