using System.Net.Mime;
using GoS.Application.Features.Teams.Queries.GetTeamById;
using GoS.Application.Features.Teams.Queries.GetTeamHeroesById;
using GoS.Application.Features.Teams.Queries.GetTeamMatchesById;
using GoS.Application.Features.Teams.Queries.GetTeamPlayersById;
using GoS.Application.Features.Teams.Queries.GetTeams;
using GoS.Domain.Teams.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class TeamController : ControllerBase
{
    private readonly ISender _sender;

    public TeamController(ISender sender)
    {
        _sender = sender;
    }
    
    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(List<Team>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetTeams()
    {
        return Ok(await _sender.Send(new GetTeamsQuery()));
    }

    [HttpGet("{teamId:int}")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Team), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTeamById(int teamId)
    {
        return Ok(await _sender.Send(new GetTeamByIdQuery(teamId)));
    }

    [HttpGet("{teamId:int}/matches")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(List<TeamMatch>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTeamMatches(int teamId)
    {
        return Ok(await _sender.Send(new GetTeamMatchesByIdQuery(teamId)));
    }

    [HttpGet("{teamId:int}/players")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(List<TeamPlayer>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTeamPlayers(int teamId)
    {
        return Ok(await _sender.Send(new GetTeamPlayersByIdQuery(teamId)));
    }

    [HttpGet("{teamId:int}/heroes")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(List<TeamHero>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTeamHeroes(int teamId)
    {
        return Ok(await _sender.Send(new GetTeamHeroesByIdQuery(teamId)));
    }
}