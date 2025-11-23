using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

internal sealed class GetPlayerRecordHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerRecordsQuery, IEnumerable<PlayerRecordDto>?>
{
    public async Task<IEnumerable<PlayerRecordDto>?> Handle(GetPlayerRecordsQuery request, CancellationToken ct)
    {
        request.Parameters.Sort = request.Field;
        request.Parameters.Limit ??= 20;

        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerMatches = await requester.GetResponseAsync<IEnumerable<PlayerRecord>>($"players/{request.AccountId}/matches", parameters, ct);
        return mapper.Map<IEnumerable<PlayerRecordDto>>(playerMatches);
    }
}
