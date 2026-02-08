namespace GoS.Application.Features.Players.Queries.GetPlayerPeers;

public class PlayerPeerDto
{
	public long AccountId { get; init; }

	public long LastPlayed { get; init; }

	public int Win { get; init; }

	public int Games { get; init; }

	public int WithWin { get; init; }

	public int WithGames { get; init; }

	public int AgainstWin { get; init; }

	public int AgainstGames { get; init; }

	public int WithGpmSum { get; init; }

	public int WithXpmSum { get; init; }

	public string Personaname { get; init; } = string.Empty;

	public Uri? AvatarFull { get; init; }
}

