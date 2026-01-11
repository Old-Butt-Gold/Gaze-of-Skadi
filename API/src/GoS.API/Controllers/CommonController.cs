using System.Net.Mime;
using GoS.Application.Features.Common.Queries.GetDistributions;
using GoS.Application.Features.Common.Queries.GetItemTimings;
using GoS.Application.Features.Common.Queries.GetLaneRoles;
using GoS.Application.Features.Common.Queries.GetLeagues;
using GoS.Application.Features.Common.Queries.GetRecordsByField;
using GoS.Domain.Common.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CommonController : ApiControllerBase
{
    public CommonController(ISender sender) : base(sender) { }

    [HttpGet("distributions")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(DistributionDto), StatusCodes.Status200OK)]
    public Task<IActionResult> GetDistributions(CancellationToken ct = default)
        => HandleQueryAsync(new GetDistributionsQuery(), ct);

    [HttpGet("records/{field}")]
    [ProducesResponseType(typeof(IEnumerable<RecordDto>), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetRecordsByField([FromRoute] CommonFieldRecords field, CancellationToken ct = default)
        => HandleQueryAsync(new GetRecordsByFieldQuery(field), ct);

    [HttpGet("item-timings")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<ItemTimingDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetItemTimings(CancellationToken ct = default)
        => HandleQueryAsync(new GetItemTimingsQuery(), ct);

    [HttpGet("lane-roles")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<LaneRolesDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetLaneRoles(CancellationToken ct = default)
        => HandleQueryAsync(new GetLaneRolesQuery(), ct);

    [HttpGet("leagues")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<LeagueDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetLeagues(CancellationToken ct = default)
        => HandleQueryAsync(new GetLeaguesQuery(), ct);
}
