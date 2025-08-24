using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerHeroes;

public class GetPlayerHeroesQueryValidator : AbstractValidator<GetPlayerHeroesQuery>
{
    public GetPlayerHeroesQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}