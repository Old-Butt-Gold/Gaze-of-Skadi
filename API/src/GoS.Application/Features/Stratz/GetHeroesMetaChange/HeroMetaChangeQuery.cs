using GoS.Application.Features.Heroes.Common.Interfaces;
using MediatR;

namespace GoS.Application.Features.Stratz.GetHeroesMetaChange;

public record HeroMetaChangeQuery(int HeroId) : IRequest<HeroMetaTimelineDto?>, IHeroIdRequest;

