using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using GoS.Domain.Extensions;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

internal sealed class GetRecordsByFieldHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetRecordsByFieldQuery, IEnumerable<RecordDto>?>
{
    public async Task<IEnumerable<RecordDto>?> Handle(GetRecordsByFieldQuery request, CancellationToken ct)
    {
        var path = $"records/{request.Field.ToSnakeCase()}";
        var records = await requester.GetResponseAsync<IEnumerable<Record>>(path, ct: ct);

        return mapper.Map<IEnumerable<RecordDto>?>(records);
    }
}