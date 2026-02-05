namespace GoS.Application.Features.Stratz.GetMatchesByRank;

public sealed class MatchesByRankDto
{
    public IEnumerable<RankStatsDto> Herald { get; set; } = [];
    public IEnumerable<RankStatsDto> Guardian { get; set; } = [];
    public IEnumerable<RankStatsDto> Crusader { get; set; } = [];
    public IEnumerable<RankStatsDto> Archon { get; set; } = [];
    public IEnumerable<RankStatsDto> Legend { get; set; } = [];
    public IEnumerable<RankStatsDto> Ancient { get; set; } = [];
    public IEnumerable<RankStatsDto> Divine { get; set; } = [];
    public IEnumerable<RankStatsDto> Immortal { get; set; } = [];
}

public sealed class RankStatsDto
{
    public long MonthUnix { get; set; }
    public int MatchCount { get; set; }
}
