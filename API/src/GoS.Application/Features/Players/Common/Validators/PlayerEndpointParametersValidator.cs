using FluentValidation;
using GoS.Application.Abstractions;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Common.Validators;

public class PlayerEndpointParametersValidator : AbstractValidator<IPlayerEndpointParametersRequest>
{
    private readonly IResourceManager _resourceManager;
    
    public PlayerEndpointParametersValidator(IResourceManager resourceManager)
    {
        _resourceManager = resourceManager;
        
    }

    private async Task<bool> IsValidHeroId(int heroId)
    {
        var heroes = await _resourceManager.GetHeroInfosAsync();
        return heroes != null && heroes.Values.Any(h => h.Id == heroId);
    }
}