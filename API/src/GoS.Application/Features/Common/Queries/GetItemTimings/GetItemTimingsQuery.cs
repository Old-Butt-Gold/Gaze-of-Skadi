using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

public record GetItemTimingsQuery : IRequest<IEnumerable<ItemTiming>?>;