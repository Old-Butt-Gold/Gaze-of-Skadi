using GoS.Application.Dto;
using GoS.Domain.BaseEnums;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

public class TeamPlayerDto
{
    public long AccountId { get; init; }
    public string? Name { get; init; }
    public long GamesPlayed { get; init; }
    public long Wins { get; init; }
    public BaseEnumDto<BooleanState>? IsCurrentTeamMember { get; init; }
    public required string ImageUrl { get; set; }
}

