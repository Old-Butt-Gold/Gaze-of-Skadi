using FluentValidation;

namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public class PublicMatchesEndpointParametersValidator : AbstractValidator<GetPublicMatchesQuery>
{
    public PublicMatchesEndpointParametersValidator()
    {
        RuleFor(x => x)
            .Must(x =>
            {
                if (!x.Parameters.MinRank.HasValue || !x.Parameters.MaxRank.HasValue) return true;
                return (int)x.Parameters.MinRank.Value <= (int)x.Parameters.MaxRank.Value;
            })
            .WithMessage("MinRank cannot be greater than MaxRank.");
    }
}
