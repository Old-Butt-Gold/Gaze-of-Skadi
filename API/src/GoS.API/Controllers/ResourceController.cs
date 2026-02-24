using System.Net.Mime;
using GoS.Application.Abstractions;
using GoS.Domain.Resources.Models.Abilities;
using GoS.Domain.Resources.Models.ChatWheels;
using GoS.Domain.Resources.Models.HeroAbilities;
using GoS.Domain.Resources.Models.Items;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ResourceController : ControllerBase
{
    private readonly IResourceManager _resourceManager;

    public ResourceController(IResourceManager resourceManager)
    {
        _resourceManager = resourceManager;
    }

    [HttpGet("abilities")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, Ability>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAbilities()
    {
        var result = await _resourceManager.GetAbilitiesAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("ability-ids")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAbilityIds()
    {
        var result = await _resourceManager.GetAbilityIdsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("chat-wheels")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, ChatWheel>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetChatWheels()
    {
        var result = await _resourceManager.GetChatWheelsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("hero-abilities")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, HeroAbility>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetHeroAbilities()
    {
        var result = await _resourceManager.GetHeroAbilitiesAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("items")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, Item>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetItems()
    {
        var result = await _resourceManager.GetItemsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("item-ids")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetItemIds()
    {
        var result = await _resourceManager.GetItemIdsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("objectives")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetObjectiveNames()
    {
        var result = await _resourceManager.GetObjectiveNamesAsync();
        return result is null ? NotFound() : Ok(result);
    }
}
