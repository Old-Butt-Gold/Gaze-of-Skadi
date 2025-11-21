using System.Text.Json.Serialization;

namespace GoS.Domain.Heroes.Models;

/// <summary>
/// Represents hero stats.
/// </summary>
public class HeroStats
{
	/// <summary>
	/// Gets numeric identifier for the hero object.
	/// </summary>
	[JsonPropertyName("id")]
	public int Id { get; init; }
	
	/// <summary>
	/// Gets the hero picks by herald.
	/// </summary>
	[JsonPropertyName("1_pick")]
	public int HeraldPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by herald.
	/// </summary>
	[JsonPropertyName("1_win")]
	public int HeraldWins { get; init; }

	/// <summary>
	/// Gets the hero picks by guardian.
	/// </summary>
	[JsonPropertyName("2_pick")]
	public int GuardianPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by guardian.
	/// </summary>
	[JsonPropertyName("2_win")]
	public int GuardianWins { get; init; }

	/// <summary>
	/// Gets the hero picks.
	/// </summary>
	[JsonPropertyName("3_pick")]
	public int CrusaderPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by crusader.
	/// </summary>
	[JsonPropertyName("3_win")]
	public int CrusaderWins { get; init; }

	/// <summary>
	/// Gets the hero picks by archon.
	/// </summary>
	[JsonPropertyName("4_pick")]
	public int ArchonPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by archon.
	/// </summary>
	[JsonPropertyName("4_win")]
	public int ArchonWins { get; init; }

	/// <summary>
	/// Gets the hero picks by legend.
	/// </summary>
	[JsonPropertyName("5_pick")]
	public int LegendPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by legend.
	/// </summary>
	[JsonPropertyName("5_win")]
	public int LegendWins { get; init; }

	/// <summary>
	/// Gets the hero picks by ancient.
	/// </summary>
	[JsonPropertyName("6_pick")]
	public int AncientPicks { get; init; }

	/// <summary>
	/// Gets the hero wins by ancient.
	/// </summary>
	[JsonPropertyName("6_win")]
	public int AncientWins { get; init; }

	/// <summary>
	/// Gets the hero picks by divine.
	/// </summary>
	[JsonPropertyName("7_pick")]
	public int DivinePicks { get; init; }

	/// <summary>
	/// Gets the hero wins by divine.
	/// </summary>
	[JsonPropertyName("7_win")]
	public int DivineWins { get; init; }

	/// <summary>
	/// Gets the hero picks by immortal.
	/// </summary>
	[JsonPropertyName("8_pick")]
	public int ImmortalPicks { get; init; }

	/// <summary>
	///	Gets the hero wins by immortal.
	/// </summary>
	[JsonPropertyName("8_win")]
	public int ImmortalWins { get; init; }

	/// <summary>
	/// Gets the turbo picks.
	/// </summary>
	[JsonPropertyName("turbo_picks")]
	public int TurboPicks { get; init; }

	/// <summary>
	/// Gets the turbo wins.
	/// </summary>
	[JsonPropertyName("turbo_wins")]
	public int TurboWins { get; init; }

	/// <summary>
	/// Gets the pick count by pro.
	/// </summary>
	[JsonPropertyName("pro_pick")]
	public int ProPick { get; init; }

	/// <summary>
	/// Gets the win count by pro.
	/// </summary>
	[JsonPropertyName("pro_win")]
	public int ProWin { get; init; }

	/// <summary>
	/// Gets the ban count by pro.
	/// </summary>
	[JsonPropertyName("pro_ban")]
	public int ProBan { get; init; }

	/// <summary>
	/// Gets the pub picks.
	/// </summary>
	[JsonPropertyName("pub_pick")]
	public int PubPicks { get; init; }

	/// <summary>
	/// Gets the pub wins.
	/// </summary>
	[JsonPropertyName("pub_win")]
	public int PubWins { get; init; }
}
