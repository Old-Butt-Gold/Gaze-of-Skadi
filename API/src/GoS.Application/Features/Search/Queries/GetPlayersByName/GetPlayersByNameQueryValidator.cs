using FluentValidation;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

public class GetPlayersByNameQueryValidator : AbstractValidator<GetPlayersByNameQuery>
{
    public GetPlayersByNameQueryValidator()
    {
        RuleFor(x => x.PersonaName)
            .NotEmpty().WithMessage("'q' (PersonaName) is required.")
            .MinimumLength(3).WithMessage("'q' must be at least 3 characters.");
    }
}