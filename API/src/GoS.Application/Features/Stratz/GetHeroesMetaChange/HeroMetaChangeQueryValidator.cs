using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Stratz.GetHeroesMetaChange;

public class HeroMetaChangeQueryValidator : AbstractValidator<HeroMetaChangeQuery>
{
    public HeroMetaChangeQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}
