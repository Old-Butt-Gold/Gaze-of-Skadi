using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

public class GetPlayerProsQueryValidator : AbstractValidator<GetPlayerProsQuery>
{
    public GetPlayerProsQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}