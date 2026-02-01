using FluentValidation;
using GoS.Application.Abstractions;

namespace GoS.Application.Features.Steam.Queries.GetSteamPlayers;

public class GetSteamPlayersQueryValidator : AbstractValidator<GetSteamPlayersQuery>
{
    private readonly ISteamIdConverter _steamIdConverter;

    public GetSteamPlayersQueryValidator(ISteamIdConverter steamIdConverter)
    {
        _steamIdConverter = steamIdConverter;

        RuleFor(x => x.SteamIds32)
            .NotNull()
            .WithMessage("Steam IDs array cannot be null.")
            .Must(ids => ids.Length > 0)
            .WithMessage("At least one Steam ID must be provided.")
            .Must(ids => ids.Length <= 100)
            .WithMessage("Maximum number of Steam IDs is 100.")
            .Must(BeValidSteamIds)
            .WithMessage("One or more Steam IDs are invalid and cannot be converted to 64-bit format.");
    }

    private bool BeValidSteamIds(string[] steamIds32)
        => steamIds32.All(steamId32 => _steamIdConverter.TryConvertSteamId32To64(steamId32, out _));
}
