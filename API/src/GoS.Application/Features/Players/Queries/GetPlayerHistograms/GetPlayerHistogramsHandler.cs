using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Extensions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

internal sealed class GetPlayerHistogramsHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayerHistogramsQuery, IEnumerable<PlayerHistogramDto>?>
{
    public async Task<IEnumerable<PlayerHistogramDto>?> Handle(GetPlayerHistogramsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var path = $"players/{request.AccountId}/histograms/{request.Field.ToSnakeCase()}";
        var playerHistograms = await requester.GetResponseAsync<IEnumerable<PlayerHistogram>>(path, parameters, ct);
        return mapper.Map<IEnumerable<PlayerHistogramDto>?>(playerHistograms);
    }
}
