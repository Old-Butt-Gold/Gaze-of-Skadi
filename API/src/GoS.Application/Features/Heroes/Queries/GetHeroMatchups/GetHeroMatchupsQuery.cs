using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

public record GetHeroMatchupsQuery(int HeroId) : IRequest<IEnumerable<HeroMatchup>?>;