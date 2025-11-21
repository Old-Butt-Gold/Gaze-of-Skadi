using System.Net.Mime;
using GoS.Application.Abstractions;
using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Models.Abilities;
using GoS.Domain.Resources.Models.AghanimDescriptions;
using GoS.Domain.Resources.Models.ChatWheels;
using GoS.Domain.Resources.Models.Countries;
using GoS.Domain.Resources.Models.HeroAbilities;
using GoS.Domain.Resources.Models.ItemColors;
using GoS.Domain.Resources.Models.Items;
using GoS.Domain.Resources.Models.NeutralAbilities;
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

    [HttpGet("aghanim-descriptions")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, AghanimDescription>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAghanimDescriptions()
    {
        var result = await _resourceManager.GetAghanimDescriptionsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("ancients")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, int>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAncients()
    {
        var result = await _resourceManager.GetAncientsAsync();
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

    [HttpGet("countries")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, Country>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCountries()
    {
        var result = await _resourceManager.GetCountriesAsync();
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

    [HttpGet("item-colors")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<ItemType, string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetItemColors()
    {
        var result = await _resourceManager.GetItemColorsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("neutral-abilities")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, NeutralAbility>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetNeutralAbilities()
    {
        var result = await _resourceManager.GetNeutralAbilitiesAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("player-colors")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<PlayerSlot, string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPlayerColors()
    {
        var result = await _resourceManager.GetPlayerColorsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("skillshots")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, BooleanState>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSkillshots()
    {
        var result = await _resourceManager.GetSkillshotsAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("xp-level")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(List<int>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetXpLevel()
    {
        var result = await _resourceManager.GetXpLevelAsync();
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("objective-names")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Dictionary<string, string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetObjectiveNames()
    {
        var result = await _resourceManager.GetObjectiveNamesAsync();
        return result is null ? NotFound() : Ok(result);
    }
}
