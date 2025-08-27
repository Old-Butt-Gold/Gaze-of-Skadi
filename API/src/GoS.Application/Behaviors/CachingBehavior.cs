using GoS.Application.Abstractions;
using GoS.Application.Abstractions.Queries;
using GoS.Application.Caching;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace GoS.Application.Behaviors;

public sealed class CachingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IDistributedCache _cache;
    private readonly ISerializationOptionsProvider _serializerProvider;

    public CachingBehavior(IDistributedCache cache, ISerializationOptionsProvider serializerProvider)
    {
        _cache = cache;
        _serializerProvider = serializerProvider;
    }

    public async Task<TResponse> Handle(
        TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        if (request is not ICacheableQuery<TResponse> cacheable)
            return await next(ct);

        var key = cacheable.GetCacheKey();
        if (string.IsNullOrWhiteSpace(key))
            return await next(ct);

        var serializerOptions = _serializerProvider.CreateJsonSerializerOptions();

        var (found, cachedResponse) = await _cache.TryGetAsync<TResponse>(key, serializerOptions, ct);

        if (found)
            return cachedResponse!;

        var response = await next(ct);

        if (response is null)
            return response!;

        var cacheOptions = new DistributedCacheEntryOptions();

        if (cacheable.GetAbsoluteExpirationRelativeToNow() is { } absoluteTtl)
            cacheOptions.AbsoluteExpirationRelativeToNow = absoluteTtl;

        if (cacheable.GetSlidingExpiration() is { } slidingTtl)
            cacheOptions.SlidingExpiration = slidingTtl;

        await _cache.SetAsync(key, response, serializerOptions, cacheOptions, ct);

        return response;
    }
}
