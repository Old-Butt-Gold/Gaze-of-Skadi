using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public class ProPlayerDto
{
    public long AccountId { get; set; }
    public string? SteamId { get; set; }
    public Uri? Avatar { get; set; }
    public Uri? AvatarMedium { get; set; }
    public Uri? AvatarFull { get; set; }
    public Uri? ProfileUrl { get; set; }
    public string? PersonaName { get; set; }
    public string? LocCountryCode { get; set; }
    public long? LastMatchTime { get; set; }
    public BaseEnumDto<BooleanState>? Plus { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? CountryCode { get; set; }
    public long? TeamId { get; set; }
    public string? TeamName { get; set; }
    public BaseEnumDto<BooleanState>? IsLocked { get; set; }
    public BaseEnumDto<BooleanState>? IsPro { get; set; }
}

