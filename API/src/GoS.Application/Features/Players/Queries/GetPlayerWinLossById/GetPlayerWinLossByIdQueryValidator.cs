using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerWinLossById;

public class GetPlayerWinLossByIdQueryValidator : AbstractValidator<GetPlayerWinLossByIdQuery>
{
    public GetPlayerWinLossByIdQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}