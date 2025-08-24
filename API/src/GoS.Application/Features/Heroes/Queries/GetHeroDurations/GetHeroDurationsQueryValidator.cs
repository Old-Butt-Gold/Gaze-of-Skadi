using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroDurations;

public class GetHeroDurationsQueryValidator : AbstractValidator<GetHeroDurationsQuery>
{
    public GetHeroDurationsQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}