using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerWardMap;

public class GetPlayerWardMapQueryValidator : AbstractValidator<GetPlayerWardMapQuery>
{
    public GetPlayerWardMapQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}