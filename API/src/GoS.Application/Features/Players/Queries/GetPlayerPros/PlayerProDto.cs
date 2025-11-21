using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

public class PlayerProDto
{
	public long AccountId { get; init; }

	public string Name { get; init; } = string.Empty;

	public string CountryCode { get; init; } = string.Empty;

	public long? TeamId { get; init; }

	public string? TeamName { get; init; }

	public string? TeamTag { get; init; }

	public BaseEnumDto<BooleanState>? IsLocked { get; init; }

	public BaseEnumDto<BooleanState>? IsPro { get; init; }

	public string SteamId { get; init; } = string.Empty;

	public Uri? Avatar { get; init; }

	public Uri? AvatarMedium { get; init; }

	public Uri? AvatarFull { get; init; }

	public Uri? ProfileUrl { get; init; }

	public string PersonaName { get; init; } = string.Empty;

	public long? LastLogin { get; init; }

	public long? FullHistoryTime { get; init; }

	public BaseEnumDto<BooleanState>? FhUnavailable { get; init; }

	public string? LocCountryCode { get; init; }

	public long LastMatchTime { get; init; }

	public BaseEnumDto<BooleanState> Plus { get; init; }

	public long LastPlayed { get; init; }

	public long Win { get; init; }

	public long Games { get; init; }

	public long WithWin { get; init; }

	public long WithGames { get; init; }

	public long AgainstWin { get; init; }

	public long AgainstGames { get; init; }
}

