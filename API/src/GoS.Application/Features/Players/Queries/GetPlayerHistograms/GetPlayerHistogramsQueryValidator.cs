using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerHistograms;

public class GetPlayerHistogramsQueryValidator : AbstractValidator<GetPlayerHistogramsQuery>
{
    public GetPlayerHistogramsQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}