using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeams;

public record GetTeamsQuery : IRequest<List<Team>>;