using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamById;

public record GetTeamByIdQuery(int Id) : IRequest<Team?>;