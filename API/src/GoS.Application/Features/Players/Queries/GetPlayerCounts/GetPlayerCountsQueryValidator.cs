using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerCounts;

public class GetPlayerCountsQueryValidator : AbstractValidator<GetPlayerCountsQuery>
{
    public GetPlayerCountsQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}