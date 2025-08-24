using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

public record GetHeroMatchesQuery(int HeroId) : IRequest<IEnumerable<HeroMatch>?>, IHeroIdRequest;