using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Matches.Queries.GetProMatches;

public class ProMatchDto
{
	public long MatchId { get; init; }

	public int Duration { get; init; }

	public long StartTime { get; init; }

	public long? RadiantTeamId { get; init; }

	public string RadiantName { get; init; } = string.Empty;

	public long? DireTeamId { get; init; }

	public string DireName { get; init; } = string.Empty;

	public long LeagueId { get; init; }

	public string LeagueName { get; init; } = string.Empty;

	public int RadiantScore { get; init; }

	public int DireScore { get; init; }

	public BaseEnumDto<BooleanState> RadiantWin { get; init; }
}

