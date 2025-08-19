using OpenDota.Enums.Permanent;
using OpenDota.Routes.Resources.Models.Abilities;
using OpenDota.Routes.Resources.Models.AghanimDescriptions;
using OpenDota.Routes.Resources.Models.ChatWheels;
using OpenDota.Routes.Resources.Models.Countries;
using OpenDota.Routes.Resources.Models.HeroAbilities;
using OpenDota.Routes.Resources.Models.Heroes;
using OpenDota.Routes.Resources.Models.ItemColors;
using OpenDota.Routes.Resources.Models.Items;
using OpenDota.Routes.Resources.Models.NeutralAbilities;

namespace OpenDota.Routes.Resources;

/// <summary>
/// Resousece endpoint.
/// </summary>
public interface IResourceEndpoint
{
	public Task<Dictionary<string, Ability>?> GetAbilitiesAsync();
	
	public Task<Dictionary<string, string>?> GetAbilityIdsAsync();
	
	public Task<Dictionary<string, AghanimDescription>?> GetAghanimDescriptionsAsync();

	public Task<Dictionary<string, int>?> GetAncientsAsync();

	public Task<Dictionary<string, ChatWheel>?> GetChatWheelsAsync();
	
	public Task<Dictionary<string, Country>?> GetCountriesAsync();

	public Task<Dictionary<string, HeroAbility>?> GetHeroAbilitiesAsync();

	public Task<Dictionary<string, string>?> GetHeroLoreAsync();
	
	public Task<Dictionary<string, HeroInfo>?> GetHeroInfosAsync();
	
	public Task<Dictionary<string, Item>?> GetItemsAsync();

	public Task<Dictionary<string, string>?> GetItemIdsAsync();
	
	public Task<Dictionary<ItemType, string>?> GetItemColorsAsync();
	
	public Task<Dictionary<string, NeutralAbility>?> GetNeutralAbilitiesAsync();
	
	public Task<Dictionary<PlayerSlot, string>?> GetPlayerColorsAsync();

	public Task<Dictionary<string, BooleanState>?> GetSkillshotsAsync();

	public Task<List<int>?> GetXpLevelAsync();
	
	public Task<Dictionary<string, string>?> GetObjectiveNamesAsync();
}
