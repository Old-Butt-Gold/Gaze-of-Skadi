using GoS.Application.Abstractions;
using GoS.Domain.BaseEnums;
using GoS.Domain.Extensions;
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
using Microsoft.Extensions.Caching.Memory;

namespace GoS.Infrastructure.ResourceManager;

internal sealed class CachedFileResourceManager : IResourceManager
{
    private readonly FileResourceManager _fileResourceManager;
    private readonly IMemoryCache _memoryCache;
    
    public CachedFileResourceManager(FileResourceManager fileResourceManager, IMemoryCache memoryCache)
    {
        _fileResourceManager = fileResourceManager;
        _memoryCache = memoryCache;
    }
    
    private Task<T> GetOrCreateAsync<T>(Resource resource, Func<Task<T>> factory)
    {
        var key = resource.ToSnakeCase();
        return _memoryCache.GetOrCreateAsync(key, async entry =>
        {
            entry.Priority = CacheItemPriority.NeverRemove;
            return await factory();
        }, new MemoryCacheEntryOptions())!;
    }
    
    public Task<Dictionary<string, Ability>?> GetAbilitiesAsync()
    {
        return GetOrCreateAsync(Resource.Abilities, () => _fileResourceManager.GetAbilitiesAsync());
    }

    public Task<Dictionary<string, string>?> GetAbilityIdsAsync()
    {
        return GetOrCreateAsync(Resource.AbilityIds, () => _fileResourceManager.GetAbilityIdsAsync());
    }

    public Task<Dictionary<string, AghanimDescription>?> GetAghanimDescriptionsAsync()
    {
        return GetOrCreateAsync(Resource.AghsDesc, () => _fileResourceManager.GetAghanimDescriptionsAsync());
    }

    public Task<Dictionary<string, int>?> GetAncientsAsync()
    {
        return GetOrCreateAsync(Resource.Ancients, () => _fileResourceManager.GetAncientsAsync());
    }

    public Task<Dictionary<string, ChatWheel>?> GetChatWheelsAsync()
    {
        return GetOrCreateAsync(Resource.ChatWheel, () => _fileResourceManager.GetChatWheelsAsync());
    }

    public Task<Dictionary<string, Country>?> GetCountriesAsync()
    {
        return GetOrCreateAsync(Resource.Countries, () => _fileResourceManager.GetCountriesAsync());
    }

    public Task<Dictionary<string, HeroAbility>?> GetHeroAbilitiesAsync()
    {
        return GetOrCreateAsync(Resource.HeroAbilities, () => _fileResourceManager.GetHeroAbilitiesAsync());
    }

    public Task<Dictionary<string, HeroInfo>?> GetHeroInfosAsync()
    {
        return GetOrCreateAsync(Resource.Heroes, () => _fileResourceManager.GetHeroInfosAsync());
    }

    public Task<Dictionary<string, Item>?> GetItemsAsync()
    {
        return GetOrCreateAsync(Resource.Items, () => _fileResourceManager.GetItemsAsync());
    }

    public Task<Dictionary<string, string>?> GetItemIdsAsync()
    {
        return GetOrCreateAsync(Resource.ItemIds, () => _fileResourceManager.GetItemIdsAsync());
    }

    public Task<Dictionary<ItemType, string>?> GetItemColorsAsync()
    {
        return GetOrCreateAsync(Resource.ItemColors, () => _fileResourceManager.GetItemColorsAsync());
    }

    public Task<Dictionary<string, NeutralAbility>?> GetNeutralAbilitiesAsync()
    {
        return GetOrCreateAsync(Resource.NeutralAbilities, () => _fileResourceManager.GetNeutralAbilitiesAsync());
    }

    public Task<Dictionary<PlayerSlot, string>?> GetPlayerColorsAsync()
    {
        return GetOrCreateAsync(Resource.PlayerColors, () => _fileResourceManager.GetPlayerColorsAsync());
    }

    public Task<Dictionary<string, BooleanState>?> GetSkillshotsAsync()
    {
        return GetOrCreateAsync(Resource.Skillshots, () => _fileResourceManager.GetSkillshotsAsync());
    }

    public Task<List<int>?> GetXpLevelAsync()
    {
        return GetOrCreateAsync(Resource.XpLevel, () => _fileResourceManager.GetXpLevelAsync());
    }

    public Task<Dictionary<string, string>?> GetObjectiveNamesAsync()
    {
        return GetOrCreateAsync(Resource.Objectives, () => _fileResourceManager.GetObjectiveNamesAsync());
    }
}