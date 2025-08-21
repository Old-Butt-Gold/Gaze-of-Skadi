using OpenDota.Enums.Changeable;

namespace OpenDota.Routes.Matches.Models;

public class PublicMatchesEndpointParameters
{
    /// <summary>
    /// Get matches with a match ID lower than this value
    /// </summary>
    public long? LessThanMatchId { get; init; } = null;

    /// <summary>
    /// Order by average rank ascending
    /// </summary>
    public int? MmrAscending { get; init; } = null;

    /// <summary>
    /// Order by average rank descending
    /// </summary>
    public int? MmrDescending { get; init; } = null;

    /// <summary>
    /// Minimum rank for the matches. Ranks are represented by integers
    /// (10-15: Herald, 20-25: Guardian, 30-35: Crusader, 40-45: Archon, 50-55: Legend,
    /// 60-65: Ancient, 70-75: Divine, 80-85: Immortal).
    /// Each increment represents an additional star.
    /// </summary>
    public Rank? MinRank { get; init; } = null;

    /// <summary>
    /// Maximum rank for the matches. Ranks are represented by integers
    /// (10-15: Herald, 20-25: Guardian, 30-35: Crusader, 40-45: Archon, 50-55: Legend,
    /// 60-65: Ancient, 70-75: Divine, 80-85: Immortal).
    /// Each increment represents an additional star.
    /// </summary>
    public Rank? MaxRank { get; init; } = null;
}
