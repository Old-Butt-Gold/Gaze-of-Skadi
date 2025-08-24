using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

public class GetPlayerTotalsQueryValidator : AbstractValidator<GetPlayerTotalsQuery>
{
    public GetPlayerTotalsQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}