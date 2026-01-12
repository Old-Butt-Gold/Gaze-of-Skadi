using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Common.Queries.GetItemTimings;

public class GetItemTimingsQueryValidator : AbstractValidator<GetItemTimingsQuery>
{
    public GetItemTimingsQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}
