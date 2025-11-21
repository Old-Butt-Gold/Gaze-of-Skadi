using GoS.Application.Dto;
using GoS.Domain.Players.Enums;

namespace GoS.Application.Features.Players.Queries.GetPlayerTotals;

public class PlayerTotalDto
{
    public BaseEnumDto<PlayerTotalField> Field { get; init; }

    public long Number { get; init; }

    public double Sum { get; init; }
}

