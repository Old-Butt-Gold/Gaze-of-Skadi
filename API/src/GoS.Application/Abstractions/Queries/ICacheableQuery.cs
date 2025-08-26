using MediatR;

namespace GoS.Application.Abstractions.Queries;

public interface ICacheableQuery<out TResponse> : IRequest<TResponse>
{
    string GetCacheKey();
    TimeSpan? GetAbsoluteExpirationRelativeToNow();
    TimeSpan? GetSlidingExpiration();
}
