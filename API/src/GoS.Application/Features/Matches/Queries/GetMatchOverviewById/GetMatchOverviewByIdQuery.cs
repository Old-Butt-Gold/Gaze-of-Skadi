using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

public record GetMatchOverviewByIdQuery(long MatchId) : IRequest<Match?>;
