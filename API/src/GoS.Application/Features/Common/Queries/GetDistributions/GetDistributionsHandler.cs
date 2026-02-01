using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

internal sealed class GetDistributionsHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetDistributionsQuery, DistributionDto?>
{
    public async Task<DistributionDto?> Handle(GetDistributionsQuery request, CancellationToken ct)
    {
        var distributions = await requester.GetResponseAsync<Distribution>("distributions", ct: ct);

        return mapper.Map<DistributionDto>(distributions);
    }
}
