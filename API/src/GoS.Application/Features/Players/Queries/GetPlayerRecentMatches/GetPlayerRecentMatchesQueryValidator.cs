using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecentMatches;

public class GetPlayerRecentMatchesQueryValidator : AbstractValidator<GetPlayerRecentMatchesQuery>
{
    public GetPlayerRecentMatchesQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}