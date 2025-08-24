using FluentValidation;
using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Application.Features.Heroes.Queries.GetHeroRanking;

namespace GoS.Application.Features.Heroes.Queries.GetHeroMatchups;

public class GetHeroMatchupsQueryValidator : AbstractValidator<GetHeroMatchupsQuery>
{
    public GetHeroMatchupsQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}