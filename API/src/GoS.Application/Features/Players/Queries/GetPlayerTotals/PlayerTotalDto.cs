using GoS.Application.Dto;
using GoS.Domain.Players.Enums;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

public class PlayerTotalDto
{
    public required BaseEnumDto<PlayerField> Field { get; init; }

    public double Sum { get; init; }
}

