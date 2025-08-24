using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroDurations;

public record GetHeroDurationsQuery(int HeroId) : IRequest<IEnumerable<HeroDuration>?>, IHeroIdRequest;