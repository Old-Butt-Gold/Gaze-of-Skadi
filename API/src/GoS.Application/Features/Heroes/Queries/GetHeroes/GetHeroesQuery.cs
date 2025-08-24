using GoS.Domain.Resources.Models.Heroes;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroes;

public record GetHeroesQuery : IRequest<Dictionary<string, HeroInfo>?>;