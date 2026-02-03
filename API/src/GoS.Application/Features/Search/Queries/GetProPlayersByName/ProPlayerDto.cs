using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public class ProPlayerDto
{
    public long AccountId { get; set; }
    public Uri? Avatar { get; set; }
    public Uri? ProfileUrl { get; set; }
    public string? PersonaName { get; set; }
    public long? LastMatchTime { get; set; }
    public string Name { get; set; } = string.Empty;
    public long? TeamId { get; set; }
    public string? TeamName { get; set; }
    public BaseEnumDto<BooleanState>? HaveDotaPlus { get; set; }
}

