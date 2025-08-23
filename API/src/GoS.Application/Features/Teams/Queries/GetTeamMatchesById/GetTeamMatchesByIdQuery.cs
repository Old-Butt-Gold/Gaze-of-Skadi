using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

public record GetTeamMatchesByIdQuery(int Id) : IRequest<List<TeamMatch>?>;