using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

public class PlayerDto
{
    public BaseEnumDto<Rank>? RankTier { get; init; }

    public int? LeaderboardRank { get; init; }

    public ProfileInfoDto Profile { get; init; } = new();

    public IEnumerable<AliasDto> Aliases { get; init; } = [];
}

public class ProfileInfoDto
{
    public long AccountId { get; init; }

    public string PersonaName { get; init; } = string.Empty;

    public string? Name { get; init; }

    public BaseEnumDto<BooleanState>? Plus { get; init; }

    public Uri? AvatarFull { get; init; }

    public BaseEnumDto<BooleanState>? FhUnavailable { get; init; }

    public Uri? ProfileUrl { get; init; }
}

public class AliasDto
{
    public string PersonaName { get; init; } = string.Empty;

    public long NameSince { get; init; }
}
