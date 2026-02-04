using MediatR;

namespace GoS.Application.Features.Stratz.GetHeroesMeta;

public sealed record GetHeroesMetaQuery : IRequest<HeroesMetaDto?>;
