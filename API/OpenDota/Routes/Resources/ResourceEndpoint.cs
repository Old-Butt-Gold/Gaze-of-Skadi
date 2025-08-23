using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Enums;
using GoS.Domain.Resources.Models.Abilities;
using GoS.Domain.Resources.Models.AghanimDescriptions;
using GoS.Domain.Resources.Models.ChatWheels;
using GoS.Domain.Resources.Models.Countries;
using GoS.Domain.Resources.Models.HeroAbilities;
using GoS.Domain.Resources.Models.Heroes;
using GoS.Domain.Resources.Models.ItemColors;
using GoS.Domain.Resources.Models.Items;
using GoS.Domain.Resources.Models.NeutralAbilities;
using OpenDota.Extensions;

namespace OpenDota.Routes.Resources;

/// <inheritdoc />
public class ResourceEndpoint : IResourceEndpoint
{
	private const string ResourcesFolder = "Resources";
	private readonly JsonSerializerOptions _defaultOptions;
	
	public ResourceEndpoint()
	{
		_defaultOptions = OpenDotaSettings.CreateJsonSerializerOptions();
		_defaultOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow;
	}
	
	public Task<Dictionary<string, Ability>?> GetAbilitiesAsync()
	{
		return LoadResourceAsync<Dictionary<string, Ability>>(Resource.Abilities);
	}

	public Task<Dictionary<string, string>?> GetAbilityIdsAsync()
	{
		return LoadResourceAsync<Dictionary<string, string>>(Resource.AbilityIds);
	}

	public async Task<Dictionary<string, AghanimDescription>?> GetAghanimDescriptionsAsync()
	{
		var list = await LoadResourceAsync<List<AghanimDescription>>(Resource.AghsDesc);

		return list.ToDictionary(x => x.HeroName);
	}

	public Task<Dictionary<string, int>?> GetAncientsAsync()
	{
		return LoadResourceAsync<Dictionary<string, int>?>(Resource.Ancients);
	}
	
	public Task<Dictionary<string, ChatWheel>?> GetChatWheelsAsync()
	{
		return LoadResourceAsync<Dictionary<string, ChatWheel>?>(Resource.ChatWheel);
	}

	public Task<Dictionary<string, Country>?> GetCountriesAsync()
	{
		return LoadResourceAsync<Dictionary<string, Country>?>(Resource.Countries);
	}

	public Task<Dictionary<string, HeroAbility>?> GetHeroAbilitiesAsync()
	{
		return LoadResourceAsync<Dictionary<string, HeroAbility>?>(Resource.HeroAbilities);
	}

	public Task<Dictionary<string, string>?> GetHeroLoreAsync()
	{
		return LoadResourceAsync<Dictionary<string, string>?>(Resource.HeroLore);
	}

	public Task<Dictionary<string, HeroInfo>?> GetHeroInfosAsync()
	{
		return LoadResourceAsync<Dictionary<string, HeroInfo>?>(Resource.Heroes);
	}

	public Task<Dictionary<string, Item>?> GetItemsAsync()
	{
		return LoadResourceAsync<Dictionary<string, Item>?>(Resource.Items);
	}

	public Task<Dictionary<string, string>?> GetItemIdsAsync()
	{
		return LoadResourceAsync<Dictionary<string, string>?>(Resource.ItemIds);
	}

	public Task<Dictionary<ItemType, string>?> GetItemColorsAsync()
	{
		return LoadResourceAsync<Dictionary<ItemType, string>?>(Resource.ItemColors);
	}

	public Task<Dictionary<string, NeutralAbility>?> GetNeutralAbilitiesAsync()
	{
		return LoadResourceAsync<Dictionary<string, NeutralAbility>?>(Resource.NeutralAbilities);
	}

	public Task<Dictionary<PlayerSlot, string>?> GetPlayerColorsAsync()
	{
		return LoadResourceAsync<Dictionary<PlayerSlot, string>?>(Resource.PlayerColors);
	}

	public Task<Dictionary<string, BooleanState>?> GetSkillshotsAsync()
	{
		return LoadResourceAsync<Dictionary<string, BooleanState>?>(Resource.Skillshots);
	}

	public Task<List<int>?> GetXpLevelAsync()
	{
		return LoadResourceAsync<List<int>?>(Resource.XpLevel);
	}

	public Task<Dictionary<string, string>?> GetObjectiveNamesAsync()
	{
		return LoadResourceAsync<Dictionary<string, string>?>(Resource.Objectives);
	}

	private async Task<T?> LoadResourceAsync<T>(Resource resource)
	{
		var jsonPath = GetPathToResource(resource);
		
		if (!File.Exists(jsonPath))
		{
			throw new FileNotFoundException(
				$"Resource '{resource.ToSnakeCase()}.json' not found at path '{jsonPath}'.");
		}

		var jsonContent = await File.ReadAllTextAsync(jsonPath);
		return JsonSerializer.Deserialize<T>(jsonContent, _defaultOptions);
	}

	private static string GetPathToResource(Resource resource)
	{
		return Path.Combine(Directory.GetCurrentDirectory(), ResourcesFolder, $"{resource.ToSnakeCase()}.json");
	}
}