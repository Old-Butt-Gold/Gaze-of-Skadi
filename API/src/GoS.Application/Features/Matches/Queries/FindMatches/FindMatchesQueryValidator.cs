using FluentValidation;
using GoS.Application.Abstractions;

namespace GoS.Application.Features.Matches.Queries.FindMatches;

public class FindMatchesQueryValidator : AbstractValidator<FindMatchesQuery>
{
    private readonly IResourceManager _resourceManager;

    public FindMatchesQueryValidator(IResourceManager resourceManager)
    {
        _resourceManager = resourceManager;

        RuleFor(x => x)
            .Must(x => x.TeamA.Length > 0 || x.TeamB.Length > 0)
            .WithMessage("At least one team must contain heroes");

        RuleFor(x => x.TeamA)
            .Must(team => team.Length <= 5)
            .WithMessage("Team A cannot have more than 5 heroes");

        RuleFor(x => x.TeamB)
            .Must(team => team.Length <= 5)
            .WithMessage("Team B cannot have more than 5 heroes");

        RuleFor(x => x.TeamA.Concat(x.TeamB).ToArray())
            .MustAsync(ValidateHeroExistence)
            .WithMessage("One or more hero IDs do not exist in the database");

        RuleFor(x => x.TeamA)
            .Must(team => team.Distinct().Count() == team.Length)
            .WithMessage("Team A contains duplicate heroes");

        RuleFor(x => x.TeamB)
            .Must(team => team.Distinct().Count() == team.Length)
            .WithMessage("Team B contains duplicate heroes");

        RuleFor(x => x)
            .Must(x => !x.TeamA.Intersect(x.TeamB).Any())
            .WithMessage("Heroes cannot appear in both teams simultaneously");
    }

    private async Task<bool> ValidateHeroExistence(int[] teams, CancellationToken cancellationToken)
    {
        if (teams.Length == 0) return true;

        var heroInfos = await _resourceManager.GetHeroInfosAsync();
        return heroInfos != null && teams.All(id => heroInfos.TryGetValue(id.ToString(), out var info) && info.Id == id);
    }
}
