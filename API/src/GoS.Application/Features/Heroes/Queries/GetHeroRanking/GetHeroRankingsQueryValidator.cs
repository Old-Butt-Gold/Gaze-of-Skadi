using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

public class GetHeroRankingsQueryValidator : AbstractValidator<GetHeroRankingsQuery>
{
    public GetHeroRankingsQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}