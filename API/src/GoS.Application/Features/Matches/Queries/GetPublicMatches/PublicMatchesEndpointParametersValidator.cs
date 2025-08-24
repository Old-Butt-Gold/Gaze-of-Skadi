using FluentValidation;
using GoS.Application.EndpointParameters;

namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public class PublicMatchesEndpointParametersValidator : AbstractValidator<GetPublicMatchesQuery>
{
    public PublicMatchesEndpointParametersValidator()
    {
        RuleFor(x => x.Parameters.MmrAscending)
            .Equal(1)
            .When(x => x.Parameters.MmrDescending.HasValue)
            .WithMessage("mmr_ascending must be 1 or null.");

        RuleFor(x => x.Parameters.MmrDescending)
            .Equal(1)
            .When(x => x.Parameters.MmrDescending.HasValue)
            .WithMessage("mmr_descending must be 1 or null.");

        RuleFor(x => x)
            .Must(x => !(x.Parameters.MmrAscending == 1 && x.Parameters.MmrDescending == 1))
            .WithMessage("mmr_ascending and mmr_descending cannot both be 1.");

        RuleFor(x => x)
            .Must(x =>
            {
                if (!x.Parameters.MinRank.HasValue || !x.Parameters.MaxRank.HasValue) return true;
                return (int)x.Parameters.MinRank.Value <= (int)x.Parameters.MaxRank.Value;
            })
            .WithMessage("MinRank cannot be greater than MaxRank.");
    }
}