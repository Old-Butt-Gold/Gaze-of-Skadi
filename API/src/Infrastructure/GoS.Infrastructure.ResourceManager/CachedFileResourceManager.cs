using GoS.Application.Abstractions;
using GoS.Domain.Extensions;
using GoS.Domain.Resources.Enums;
using GoS.Domain.Resources.Models.Abilities;
using GoS.Domain.Resources.Models.ChatWheels;
using GoS.Domain.Resources.Models.HeroAbilities;
using GoS.Domain.Resources.Models.Heroes;
using GoS.Domain.Resources.Models.Items;
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
        })!;
    }

    public Task<Dictionary<string, Ability>?> GetAbilitiesAsync()
    {
        return GetOrCreateAsync(Resource.Abilities, () => _fileResourceManager.GetAbilitiesAsync());
    }

    public Task<Dictionary<string, string>?> GetAbilityIdsAsync()
    {
        return GetOrCreateAsync(Resource.AbilityIds, () => _fileResourceManager.GetAbilityIdsAsync());
    }

    public Task<Dictionary<string, ChatWheel>?> GetChatWheelsAsync()
    {
        return GetOrCreateAsync(Resource.ChatWheel, () => _fileResourceManager.GetChatWheelsAsync());
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

    public Task<IEnumerable<string>?> GetObjectiveNamesAsync()
    {
        return GetOrCreateAsync(Resource.Objectives, () => _fileResourceManager.GetObjectiveNamesAsync());
    }
}
