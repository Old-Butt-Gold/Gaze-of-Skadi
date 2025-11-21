using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public class PublicMatchDto
{
    public List<int> DireTeam { get; set; }
    public List<int> RadiantTeam { get; set; }
    public int NumRankTier { get; init; }
    public BaseEnumDto<Rank> AvgRankTier { get; init; }
    public BaseEnumDto<GameMode> GameMode { get; set; }
    public BaseEnumDto<LobbyType> LobbyType { get; set; }
    public int Duration { get; set; }
    public long StartTime { get; set; }
    public BaseEnumDto<BooleanState> RadiantWin { get; set; }
    public long MatchId { get; set; }
}



