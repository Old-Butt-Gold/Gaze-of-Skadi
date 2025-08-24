using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

public record GetHeroStatsQuery : IRequest<IEnumerable<HeroStats>?>;