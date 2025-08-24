using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

public class GetPlayerMatchesQueryValidator : AbstractValidator<GetPlayerMatchesQuery>
{
    public GetPlayerMatchesQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}