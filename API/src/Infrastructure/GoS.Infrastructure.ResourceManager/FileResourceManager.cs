using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Application.Abstractions;
using GoS.Domain.BaseEnums;
using GoS.Domain.Extensions;
using GoS.Domain.Resources.Enums;
using GoS.Domain.Resources.Models.Abilities;
using GoS.Domain.Resources.Models.ChatWheels;
using GoS.Domain.Resources.Models.Countries;
using GoS.Domain.Resources.Models.HeroAbilities;
using GoS.Domain.Resources.Models.Heroes;
using GoS.Domain.Resources.Models.Items;
using GoS.Domain.Resources.Models.NeutralAbilities;
using Microsoft.Extensions.Logging;

namespace GoS.Infrastructure.ResourceManager;

internal sealed class FileResourceManager : IResourceManager
{
	private const string ResourcesFolder = "Resources";
	private readonly JsonSerializerOptions _defaultOptions;
	private readonly ILogger<FileResourceManager> _logger;

	public FileResourceManager(ISerializationOptionsProvider serializationOptionsProvider, ILogger<FileResourceManager> logger)
	{
		_logger = logger;
		_defaultOptions = serializationOptionsProvider.CreateJsonSerializerOptions();
		_defaultOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow;
	}

	public Task<Dictionary<string, Ability>?> GetAbilitiesAsync()
	{
		return LoadResourceAsync<Dictionary<string, Ability>?>(Resource.Abilities);
	}

	public Task<Dictionary<string, string>?> GetAbilityIdsAsync()
	{
		return LoadResourceAsync<Dictionary<string, string>?>(Resource.AbilityIds);
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

	public Task<Dictionary<string, NeutralAbility>?> GetNeutralAbilitiesAsync()
	{
		return LoadResourceAsync<Dictionary<string, NeutralAbility>?>(Resource.NeutralAbilities);
	}

	public Task<Dictionary<PlayerSlot, string>?> GetPlayerColorsAsync()
	{
		return LoadResourceAsync<Dictionary<PlayerSlot, string>?>(Resource.PlayerColors);
	}

	public Task<List<int>?> GetXpLevelAsync()
	{
		return LoadResourceAsync<List<int>?>(Resource.XpLevel);
	}

	public Task<Dictionary<string, string>?> GetObjectiveNamesAsync()
	{
		return LoadResourceAsync<Dictionary<string, string>?>(Resource.Objectives);
	}

	private async Task<T> LoadResourceAsync<T>(Resource resource)
	{
		var jsonPath = GetPathToResource(resource);

		_logger.LogInformation("Getting file {JsonPath} with resource — {Resource}", jsonPath, resource);

		if (!File.Exists(jsonPath))
		{
			throw new FileNotFoundException($"Resource '{resource.ToSnakeCase()}.json' not found at path '{jsonPath}'.");
		}

		var jsonContent = await File.ReadAllTextAsync(jsonPath);
		return JsonSerializer.Deserialize<T>(jsonContent, _defaultOptions)!;
	}

	private static string GetPathToResource(Resource resource)
	{
		return Path.Combine(AppContext.BaseDirectory, ResourcesFolder, $"{resource.ToSnakeCase()}.json");
	}
}
