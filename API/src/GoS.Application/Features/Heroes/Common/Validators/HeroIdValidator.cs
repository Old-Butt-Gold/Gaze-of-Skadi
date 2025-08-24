using FluentValidation;
using GoS.Application.Abstractions;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Common.Validators;

public class HeroIdValidator : AbstractValidator<IHeroIdRequest>
{
    private readonly IResourceManager _resourceManager;
    
    public HeroIdValidator(IResourceManager resourceManager)
    {
        _resourceManager = resourceManager;
        
        RuleFor(x => x.HeroId)
            .MustAsync((x, _) => IsValidHeroId(x))
            .WithMessage("Invalid HeroId. Hero does not exist.");
    }

    private async Task<bool> IsValidHeroId(int heroId)
    {
        var heroes = await _resourceManager.GetHeroInfosAsync();
        return heroes != null && heroes.Values.Any(h => h.Id == heroId);
    }
}