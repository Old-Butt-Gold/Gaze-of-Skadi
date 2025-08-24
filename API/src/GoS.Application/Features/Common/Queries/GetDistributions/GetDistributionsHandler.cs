using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

internal sealed class GetDistributionsHandler(IRequester requester)
    : IRequestHandler<GetDistributionsQuery, Distribution?>
{
    public Task<Distribution?> Handle(GetDistributionsQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<Distribution>("distributions", ct: ct);
    }
}