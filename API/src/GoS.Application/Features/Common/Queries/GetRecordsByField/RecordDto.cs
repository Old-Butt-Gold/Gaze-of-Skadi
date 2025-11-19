using GoS.Application.Dto;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public class RecordDto
{
    public long MatchId { get; init; }
    
    public long StartTime { get; init; }
    
    public int? HeroId { get; init; }
    
    public HeroInfoDto? HeroInfo { get; set; }
    
    public long Score { get; init; }
}