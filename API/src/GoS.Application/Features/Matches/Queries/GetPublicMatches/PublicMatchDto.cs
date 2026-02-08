using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public class PublicMatchDto
{
    public required List<int> DireTeam { get; set; }
    public required List<int> RadiantTeam { get; set; }
    public required BaseEnumDto<Rank> AvgRankTier { get; init; }
    public required BaseEnumDto<GameMode> GameMode { get; set; }
    public required BaseEnumDto<LobbyType> LobbyType { get; set; }
    public int Duration { get; set; }
    public long StartTime { get; set; }
    public required BaseEnumDto<BooleanState> RadiantWin { get; set; }
    public long MatchId { get; set; }
}
