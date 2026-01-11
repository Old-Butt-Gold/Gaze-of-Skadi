using System.Net.Mime;
using GoS.Application.Features.Teams.Queries.GetTeamById;
using GoS.Application.Features.Teams.Queries.GetTeamHeroesById;
using GoS.Application.Features.Teams.Queries.GetTeamMatchesById;
using GoS.Application.Features.Teams.Queries.GetTeamPlayersById;
using GoS.Application.Features.Teams.Queries.GetTeams;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class TeamController : ApiControllerBase
{
    public TeamController(ISender sender) : base(sender) { }

    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<TeamDto>), StatusCodes.Status200OK)]
    public Task<IActionResult> GetTeams(CancellationToken ct = default)
        => HandleQueryAsync(new GetTeamsQuery(), ct);

    [HttpGet("{teamId:int}")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(TeamByIdDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetTeamById([FromRoute] int teamId, CancellationToken ct = default)
        => HandleQueryAsync(new GetTeamByIdQuery(teamId), ct);

    [HttpGet("{teamId:int}/matches")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<TeamMatchDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetTeamMatches([FromRoute] int teamId, CancellationToken ct = default)
        => HandleQueryAsync(new GetTeamMatchesByIdQuery(teamId), ct);

    [HttpGet("{teamId:int}/players")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<TeamPlayerDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetTeamPlayers([FromRoute] int teamId, CancellationToken ct = default)
        => HandleQueryAsync(new GetTeamPlayersByIdQuery(teamId), ct);

    [HttpGet("{teamId:int}/heroes")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<TeamHeroDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<IActionResult> GetTeamHeroes([FromRoute] int teamId, CancellationToken ct = default)
        => HandleQueryAsync(new GetTeamHeroesByIdQuery(teamId), ct);
}
