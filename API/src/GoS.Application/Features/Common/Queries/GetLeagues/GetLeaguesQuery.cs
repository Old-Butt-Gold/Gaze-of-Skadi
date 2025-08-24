using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

public record GetLeaguesQuery : IRequest<IEnumerable<League>?>;