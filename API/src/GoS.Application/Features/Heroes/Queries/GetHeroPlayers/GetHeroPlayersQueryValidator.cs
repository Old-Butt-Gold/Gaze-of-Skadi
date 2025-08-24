using FluentValidation;
using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Application.Features.Heroes.Queries.GetHeroRanking;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

public class GetHeroPlayersQueryValidator : AbstractValidator<GetHeroPlayersQuery>
{
    public GetHeroPlayersQueryValidator(IValidator<IHeroIdRequest> heroIdValidator)
    {
        RuleFor(x => x)
            .SetValidator(heroIdValidator);
    }
}