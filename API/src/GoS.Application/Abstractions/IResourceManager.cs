using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Models.Abilities;
using GoS.Domain.Resources.Models.AghanimDescriptions;
using GoS.Domain.Resources.Models.ChatWheels;
using GoS.Domain.Resources.Models.Countries;
using GoS.Domain.Resources.Models.HeroAbilities;
using GoS.Domain.Resources.Models.Heroes;
using GoS.Domain.Resources.Models.ItemColors;
using GoS.Domain.Resources.Models.Items;
using GoS.Domain.Resources.Models.NeutralAbilities;

namespace GoS.Application.Abstractions;

public interface IResourceManager
{
    public Task<Dictionary<string, Ability>?> GetAbilitiesAsync();
	
    public Task<Dictionary<string, string>?> GetAbilityIdsAsync();
	
    public Task<Dictionary<string, AghanimDescription>?> GetAghanimDescriptionsAsync();

    public Task<Dictionary<string, int>?> GetAncientsAsync();

    public Task<Dictionary<string, ChatWheel>?> GetChatWheelsAsync();
	
    public Task<Dictionary<string, Country>?> GetCountriesAsync();

    public Task<Dictionary<string, HeroAbility>?> GetHeroAbilitiesAsync();

    public Task<Dictionary<string, HeroInfo>?> GetHeroInfosAsync();
	
    public Task<Dictionary<string, Item>?> GetItemsAsync();

    public Task<Dictionary<string, string>?> GetItemIdsAsync();
	
    public Task<Dictionary<string, NeutralAbility>?> GetNeutralAbilitiesAsync();
	
    public Task<Dictionary<PlayerSlot, string>?> GetPlayerColorsAsync();

    public Task<List<int>?> GetXpLevelAsync();
	
    public Task<Dictionary<string, string>?> GetObjectiveNamesAsync();
}