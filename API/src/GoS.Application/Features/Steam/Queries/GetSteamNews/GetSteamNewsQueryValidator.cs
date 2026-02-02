using FluentValidation;

namespace GoS.Application.Features.Steam.Queries.GetSteamNews;

public class GetSteamNewsQueryValidator : AbstractValidator<GetSteamNewsQuery>
{
    public GetSteamNewsQueryValidator()
    {
        RuleFor(x => x.Count)
            .NotEmpty().WithMessage("News count cannot be empty")
            .GreaterThan(0).WithMessage("News count must be greater than 0")
            .WithErrorCode("STEAM_NEWS_COUNT_INVALID");
    }
}
