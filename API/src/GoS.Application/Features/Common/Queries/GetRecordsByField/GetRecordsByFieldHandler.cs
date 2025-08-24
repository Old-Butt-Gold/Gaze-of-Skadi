using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using GoS.Domain.Extensions;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

internal sealed class GetRecordsByFieldHandler(IRequester requester)
    : IRequestHandler<GetRecordsByFieldQuery, IEnumerable<Record>?>
{
    public Task<IEnumerable<Record>?> Handle(GetRecordsByFieldQuery request, CancellationToken ct)
    {
        var path = $"records/{request.Field.ToSnakeCase()}";
        return requester.GetResponseAsync<IEnumerable<Record>>(path, ct: ct);
    }
}