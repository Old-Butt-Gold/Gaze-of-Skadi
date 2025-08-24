using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerWordCloud;

public class GetPlayerWordCloudQueryValidator : AbstractValidator<GetPlayerWordCloudQuery>
{
    public GetPlayerWordCloudQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}