using FluentValidation;

namespace GoS.Application.Features.Stratz.GetHeroesMeta;

public sealed class GetHeroesMetaQueryValidator : AbstractValidator<GetHeroesMetaQuery>
{
    public GetHeroesMetaQueryValidator()
    {
        RuleFor(x => x.Days)
            .InclusiveBetween(1, 30)
            .WithMessage("Days must be between 1 and 30.");
    }
}
