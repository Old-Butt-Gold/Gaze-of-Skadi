using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroDurations;

internal sealed class GetHeroDurationsHandler(IRequester requester)
    : IRequestHandler<GetHeroDurationsQuery, IEnumerable<HeroDuration>?>
{
    public Task<IEnumerable<HeroDuration>?> Handle(GetHeroDurationsQuery request, CancellationToken ct) =>
        requester.GetResponseAsync<IEnumerable<HeroDuration>>($"heroes/{request.HeroId}/durations", ct: ct);
}