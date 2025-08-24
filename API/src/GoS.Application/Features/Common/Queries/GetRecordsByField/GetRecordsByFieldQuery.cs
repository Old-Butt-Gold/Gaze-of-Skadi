using GoS.Domain.Common.Enums;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public record GetRecordsByFieldQuery(CommonFieldRecords Field) : IRequest<IEnumerable<Record>?>;