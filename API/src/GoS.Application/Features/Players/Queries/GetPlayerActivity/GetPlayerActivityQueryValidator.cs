using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerActivity;

public class GetPlayerActivityQueryValidator : AbstractValidator<GetPlayerActivityQuery>
{
    public GetPlayerActivityQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}
