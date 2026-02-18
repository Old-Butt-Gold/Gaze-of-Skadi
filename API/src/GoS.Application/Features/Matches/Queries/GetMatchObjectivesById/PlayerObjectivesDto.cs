using GoS.Application.Dto;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchObjectivesById;

public record PlayerObjectivesDto
{
    public required int PlayerIndex { get; init; }

    public required ObjectivesDataDto Objectives { get; init; }
}

public record ObjectivesDataDto
{
    public required IEnumerable<DamageDataDto> Damage { get; set; } = [];
    public required IEnumerable<RunesDataDto> Runes { get; set; } = [];
}

public record RunesDataDto
{
    public required BaseEnumDto<Runes> Key { get; set; }
    public int Value { get; set; }
}

public record DamageDataDto
{
    public required string Key { get; set; }
    public int Value { get; set; }
}
