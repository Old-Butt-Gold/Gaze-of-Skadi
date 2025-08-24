using FluentValidation;
using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatches;

public class GetHeroMatchesQueryValidator : AbstractValidator<GetHeroMatchesQuery>
{
    public GetHeroMatchesQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}