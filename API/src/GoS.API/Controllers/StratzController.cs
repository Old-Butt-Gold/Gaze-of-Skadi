using System.Net.Mime;
using GoS.Application.Features.Stratz.GetHeroesMeta;
using GoS.Application.Features.Stratz.GetHeroesMetaChange;
using GoS.Application.Features.Stratz.GetPlayerQueue;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StratzController : ApiControllerBase
{
    public StratzController(ISender sender) : base(sender) { }

    [HttpGet("players-queue")]
    [ProducesResponseType(typeof(PlayersQueueDto), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetPlayersRegions(CancellationToken ct = default)
        => HandleQueryAsync(new GetPlayersQueueQuery(), ct);

    [HttpGet("heroes-meta")]
    [ProducesResponseType(typeof(HeroesMetaDto), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetHeroesMeta(CancellationToken ct = default)
        => HandleQueryAsync(new GetHeroesMetaQuery(), ct);

    [HttpGet("heroes-meta/{heroId:int}")]
    [ProducesResponseType(typeof(HeroMetaTimelineDto), StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public Task<IActionResult> GetHeroesMeta(int heroId, CancellationToken ct = default)
        => HandleQueryAsync(new HeroMetaChangeQuery(heroId), ct);
}
