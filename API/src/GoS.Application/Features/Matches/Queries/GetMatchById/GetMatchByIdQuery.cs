using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchById;

public record GetMatchByIdQuery(long MatchId) : IRequest<Match?>;