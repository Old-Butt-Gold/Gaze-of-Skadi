using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Common.Queries.GetLaneRoles;

public class GetLaneRolesQueryValidator : AbstractValidator<GetLaneRolesQuery>
{
    public GetLaneRolesQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}
