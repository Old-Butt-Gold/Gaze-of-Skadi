using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

public record GetProMatchesQuery(long? LessThanMatchId) : IRequest<IEnumerable<ProMatch>?>;