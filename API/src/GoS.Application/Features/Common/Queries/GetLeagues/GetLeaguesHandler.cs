using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

internal sealed class GetLeaguesHandler(IRequester requester)
    : IRequestHandler<GetLeaguesQuery, IEnumerable<League>?>
{
    public Task<IEnumerable<League>?> Handle(GetLeaguesQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<IEnumerable<League>>("leagues", ct: ct);
    }
}