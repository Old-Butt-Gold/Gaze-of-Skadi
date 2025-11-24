namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public class RecordDto
{
    public long MatchId { get; init; }
    
    public long StartTime { get; init; }
    
    public int? HeroId { get; init; }
    
    public long Score { get; init; }
}