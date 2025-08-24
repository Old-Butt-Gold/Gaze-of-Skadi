using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

public record GetHeroItemPopularityQuery(int HeroId) : IRequest<HeroItemPopularity?>, IHeroIdRequest;