using GoS.Application.Dto;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchActionsById;

public record PlayerActionsDto
{
    public required int PlayerIndex { get; init; }

    public required IEnumerable<ActionsDataDto> Actions { get; init; }
}

public record ActionsDataDto
{
    public required BaseEnumDto<UnitOrder> Key { get; set; }
    public long Value { get; set; }
}
