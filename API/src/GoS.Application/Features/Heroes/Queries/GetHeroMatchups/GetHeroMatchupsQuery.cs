using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

public record GetHeroMatchupsQuery(int HeroId) : IRequest<IEnumerable<HeroMatchup>?>, IHeroIdRequest;