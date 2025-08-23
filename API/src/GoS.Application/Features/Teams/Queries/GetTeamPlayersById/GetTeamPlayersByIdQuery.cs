using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

public record GetTeamPlayersByIdQuery(int Id) : IRequest<List<TeamPlayer>?>;