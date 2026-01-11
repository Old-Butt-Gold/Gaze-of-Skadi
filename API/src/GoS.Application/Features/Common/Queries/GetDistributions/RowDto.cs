using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

public class RowDto
{
    public BaseEnumDto<Rank> Rank { get; set; } = null!;
    public int Count { get; set; }
    public int CumulativeSum { get; set; }
    public double Percentage { get; set; }
}
