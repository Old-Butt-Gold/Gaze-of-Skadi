using GoS.Application.Dto;
using GoS.Domain.Common.Enums;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

public class LeagueDto
{
    public long LeagueId { get; init; }
    public string Ticket { get; init; } = string.Empty;
    public string Banner { get; init; } = string.Empty;
    public BaseEnumDto<Tier>? Tier { get; init; }
    public string Name { get; init; } = string.Empty;
}

