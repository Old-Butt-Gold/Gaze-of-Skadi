using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Extensions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

internal sealed class GetPlayerRecordHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayerRecordsQuery, IEnumerable<PlayerRecordDto>?>
{
    public async Task<IEnumerable<PlayerRecordDto>?> Handle(GetPlayerRecordsQuery request, CancellationToken ct)
    {
        request.Parameters.Sort = request.Field;
        request.Parameters.Limit ??= 20;

        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerMatches = await requester.GetResponseAsync<IEnumerable<PlayerRecord>>($"players/{request.AccountId}/matches", parameters, ct);
        var result = mapper.Map<List<PlayerRecordDto>>(playerMatches);

        var index = 0;

        foreach (var playerMatch in playerMatches!)
        {
            if (playerMatch.RecordFields.Count > 0)
            {
                var key = request.Field.ToSnakeCase();
                if (playerMatch.RecordFields.TryGetValue(key, out var recordValue))
                {
                    result[index].RecordField = recordValue != null ? int.Parse(recordValue?.ToString()) : 0;
                }
            }

            index++;
        }

        return result;
    }
}
