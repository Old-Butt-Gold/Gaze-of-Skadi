using FluentValidation;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public class GetProPlayersByNameQueryValidator : AbstractValidator<GetProPlayersByNameQuery>
{
    public GetProPlayersByNameQueryValidator()
    {
        RuleFor(x => x.Name)
            .NotNull().WithMessage("'q' (PersonaName) is required.")
            .MinimumLength(3).WithMessage("'q' must be at least 3 characters.");
    }
}
