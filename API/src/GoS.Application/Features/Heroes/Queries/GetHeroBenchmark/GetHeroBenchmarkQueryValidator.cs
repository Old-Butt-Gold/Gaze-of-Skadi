using FluentValidation;
using GoS.Application.Features.Heroes.Common.Interfaces;

namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

public class GetHeroBenchmarkQueryValidator : AbstractValidator<GetHeroBenchmarkQuery>
{
    public GetHeroBenchmarkQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}