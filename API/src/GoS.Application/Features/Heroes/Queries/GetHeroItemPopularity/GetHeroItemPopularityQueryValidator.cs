using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroItemPopularity;

public class GetHeroItemPopularityQueryValidator : AbstractValidator<GetHeroItemPopularityQuery>
{
    public GetHeroItemPopularityQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}