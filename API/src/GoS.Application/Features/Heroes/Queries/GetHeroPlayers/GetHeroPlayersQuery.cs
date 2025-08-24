using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

public record GetHeroPlayersQuery(int HeroId) : IRequest<IEnumerable<HeroPlayer>?>;