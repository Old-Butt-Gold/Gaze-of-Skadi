using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Caching.Distributed;

namespace GoS.Application.Extensions;

public static class DistributedCacheExtensions
{
    private static readonly JsonSerializerOptions DefaultOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        AllowTrailingCommas = true
    };

    public static Task SetAsync<T>(this IDistributedCache cache, string key, T value, DistributedCacheEntryOptions? options = null, CancellationToken ct = default)
    {
        return SetAsync(cache, key, value, DefaultOptions, options, ct);
    }

    public static Task SetAsync<T>(this IDistributedCache cache, string key, T value, JsonSerializerOptions serializerOptions, DistributedCacheEntryOptions? options = null, CancellationToken ct = default)
    {
        var opts = options ?? new DistributedCacheEntryOptions();
        var bytes = JsonSerializer.SerializeToUtf8Bytes(value, serializerOptions);
        return cache.SetAsync(key, bytes, opts, ct);
    }

    public static async Task<(bool Found, T? Value)> TryGetAsync<T>(this IDistributedCache cache, string key, JsonSerializerOptions? serializerOptions = null, CancellationToken ct = default)
    {
        var bytes = await cache.GetAsync(key, ct);
        if (bytes is null) return (false, default);

        try
        {
            var options = serializerOptions ?? DefaultOptions;
            var value = JsonSerializer.Deserialize<T>(bytes, options);
            return (true, value);
        }
        catch (JsonException)
        {
            await cache.RemoveAsync(key, ct);
            return (false, default);
        }
    }

    public static async Task<T?> GetOrCreateAsync<T>(this IDistributedCache cache, string key, Func<Task<T?>> factory,
        DistributedCacheEntryOptions? options = null, JsonSerializerOptions? serializerOptions = null, CancellationToken ct = default)
    {
        var (found, value) = await cache.TryGetAsync<T>(key, serializerOptions, ct);
        if (found) return value;

        var created = await factory();
        if (created is null) return default;

        await cache.SetAsync(key, created, serializerOptions ?? DefaultOptions, options, ct);
        return created;
    }
}
