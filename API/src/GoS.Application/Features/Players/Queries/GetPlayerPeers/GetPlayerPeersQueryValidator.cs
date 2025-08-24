using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

public class GetPlayerPeersQueryValidator : AbstractValidator<GetPlayerPeersQuery>
{
    public GetPlayerPeersQueryValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}