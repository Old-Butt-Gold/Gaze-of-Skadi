using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

public class PlayerProDto
{
	public long AccountId { get; init; }

	public string Name { get; init; } = string.Empty;

	public string? TeamName { get; init; }

	public Uri? AvatarFull { get; init; }

	public string PersonaName { get; init; } = string.Empty;

	public required BaseEnumDto<BooleanState> Plus { get; init; }

	public long LastPlayed { get; init; }

	public long Games { get; init; }

	public long WithWin { get; init; }

	public long WithGames { get; init; }

	public long AgainstWin { get; init; }

	public long AgainstGames { get; init; }
}
