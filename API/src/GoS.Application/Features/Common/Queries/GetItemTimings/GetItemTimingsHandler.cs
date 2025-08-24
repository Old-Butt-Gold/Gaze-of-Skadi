using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

internal sealed class GetItemTimingsHandler(IRequester requester)
    : IRequestHandler<GetItemTimingsQuery, IEnumerable<ItemTiming>?>
{
    public Task<IEnumerable<ItemTiming>?> Handle(GetItemTimingsQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<IEnumerable<ItemTiming>>("scenarios/itemTimings", ct: ct);
    }
}