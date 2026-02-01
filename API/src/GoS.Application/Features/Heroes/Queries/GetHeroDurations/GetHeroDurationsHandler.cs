using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroDurations;

internal sealed class GetHeroDurationsHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetHeroDurationsQuery, IEnumerable<HeroDurationDto>?>
{
    public async Task<IEnumerable<HeroDurationDto>?> Handle(GetHeroDurationsQuery request, CancellationToken ct)
    {
        var heroDurations = await requester.GetResponseAsync<IEnumerable<HeroDuration>>($"heroes/{request.HeroId}/durations", ct: ct);
        return heroDurations is null ? null : mapper.Map<IEnumerable<HeroDurationDto>>(heroDurations).OrderBy(x => x.DurationBin);
    }
}
