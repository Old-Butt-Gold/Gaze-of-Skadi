namespace GoS.Application.Features.Common.Queries.GetDistributions;

public class DistributionDto
{
    public List<RowDto> Rows { get; set; } = [];
    public long TotalCount { get; set; }
}