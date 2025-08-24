using FluentValidation;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public class GetProPlayersByNameQueryValidator : AbstractValidator<GetProPlayersByNameQuery>
{
    public GetProPlayersByNameQueryValidator()
    {
        When(x => !string.IsNullOrWhiteSpace(x.Name), () =>
        {
            RuleFor(x => x.Name!)
                .MinimumLength(3)
                .WithMessage("'q' must be at least 3 characters when provided.");
        });
    }
}