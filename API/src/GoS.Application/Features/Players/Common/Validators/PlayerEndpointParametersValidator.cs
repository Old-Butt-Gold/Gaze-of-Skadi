using FluentValidation;
using GoS.Application.Abstractions;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Common.Validators;

public class PlayerEndpointParametersValidator : AbstractValidator<IPlayerEndpointParametersRequest>
{
    private readonly IResourceManager _resourceManager;
    private const int MaxLimit = 1000;
    private const int MaxDateDays = 3650;
    private const int MaxProjectionCount = 100;
    private const int MaxTeamHeroesIds = 5;

    public PlayerEndpointParametersValidator(IResourceManager resourceManager)
    {
        _resourceManager = resourceManager;

        RuleFor(x => x.Parameters.Limit)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).When(x => x.Parameters is { Limit: not null })
            .WithMessage("Limit must be greater than 0.")
            .LessThanOrEqualTo(MaxLimit).When(x => x.Parameters is { Limit: not null })
            .WithMessage($"Limit must be less than or equal to {MaxLimit}.");

        RuleFor(x => x.Parameters.Offset)
            .GreaterThanOrEqualTo(0).When(x => x.Parameters is { Offset: not null })
            .WithMessage("Offset must be greater than or equal to 0.");

        RuleFor(x => x.Parameters.Win)
            .Must(v => v is null or 0 or 1)
            .WithMessage("Win must be 0 (loss) or 1 (win).");

        RuleFor(x => x.Parameters.IsRadiant)
            .Must(v => v is null or 0 or 1)
            .WithMessage("IsRadiant must be 0 (dire) or 1 (radiant).");

        RuleFor(x => x.Parameters.Date)
            .InclusiveBetween(0, MaxDateDays)
            .When(x => x.Parameters is { Date: not null })
            .WithMessage($"Date must be between 0 and {MaxDateDays} days.");

        RuleFor(x => x.Parameters.Having)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Parameters is { Having: not null })
            .WithMessage("Having must be greater than or equal to 0.");

        RuleFor(x => x.Parameters.Project)
            .Must(list => list is not { Count: > MaxProjectionCount })
            .WithMessage($"Project may contain at most {MaxProjectionCount} items.");

        RuleFor(x => x.Parameters.HeroId)
            .MustAsync(async (_, heroId, _) =>
            {
                if (heroId is null) return true;
                return await IsValidHeroIdAsync(heroId.Value);
            })
            .WithMessage("Invalid HeroId. Hero does not exist.");

        RuleFor(x => x.Parameters.WithHeroIds)
            .Must(list => list is not { Count: > MaxTeamHeroesIds })
            .WithMessage($"WithHeroIds may contain at most {MaxTeamHeroesIds} entries.");

        RuleForEach(x => x.Parameters.WithHeroIds)
            .MustAsync(async (_, id, _) => await IsValidHeroIdAsync(id))
            .When(x => x.Parameters.WithHeroIds != null)
            .WithMessage("One or more WithHeroIds are invalid (hero id not found).");

        RuleFor(x => x.Parameters.AgainstHeroIds)
            .Must(list => list is not { Count: > MaxTeamHeroesIds })
            .WithMessage($"AgainstHeroIds may contain at most {MaxTeamHeroesIds} entries.");

        RuleForEach(x => x.Parameters.AgainstHeroIds)
            .MustAsync(async (_, id, _) => await IsValidHeroIdAsync(id))
            .When(x => x.Parameters.AgainstHeroIds != null)
            .WithMessage("One or more AgainstHeroIds are invalid (hero id not found).");
    }

    private async Task<bool> IsValidHeroIdAsync(int heroId)
    {
        var heroes = await _resourceManager.GetHeroInfosAsync();
        return heroes is not null && heroes.Values.Any(h => h.Id == heroId);
    }
}
