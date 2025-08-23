using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamHeroesById;

public record GetTeamHeroesByIdQuery(int Id) : IRequest<List<TeamHero>?>;