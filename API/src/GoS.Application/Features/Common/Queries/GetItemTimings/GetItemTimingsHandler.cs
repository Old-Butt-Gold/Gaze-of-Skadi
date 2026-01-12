using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

internal sealed class GetItemTimingsHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetItemTimingsQuery, IEnumerable<ItemTimingDto>?>
{
    public async Task<IEnumerable<ItemTimingDto>?> Handle(GetItemTimingsQuery request, CancellationToken ct)
    {
        var parameters = BuildParameters(request.HeroId);
        var itemTimings = await requester.GetResponseAsync<IEnumerable<ItemTiming>>("scenarios/itemTimings", parameters, ct);

        return mapper.Map<IEnumerable<ItemTimingDto>>(itemTimings);
    }

    private static ICollection<KeyValuePair<string, string>> BuildParameters(int heroId) => [new("hero_id", heroId.ToString())];
}
