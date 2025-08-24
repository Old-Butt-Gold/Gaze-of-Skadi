using GoS.Application.Abstractions;
using GoS.Domain.Resources.Models.Heroes;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroes;

internal sealed class GetHeroesHandler(IResourceManager resourceManager)
    : IRequestHandler<GetHeroesQuery, Dictionary<string, HeroInfo>?>
{
    public Task<Dictionary<string, HeroInfo>?> Handle(GetHeroesQuery request, CancellationToken ct)
    {
        return resourceManager.GetHeroInfosAsync();
    }
}