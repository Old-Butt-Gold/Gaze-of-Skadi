using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchActionsById;

internal sealed class GetMatchActionsByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchActionsByIdQuery, IEnumerable<PlayerActionsDto>?>
{
    public async Task<IEnumerable<PlayerActionsDto>?> Handle(GetMatchActionsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        return match.Players
            .Select((player, index) => new PlayerActionsDto { PlayerIndex = index, Actions = GetActionsForPlayer(player), }).ToList();
    }

    private List<ActionsDataDto> GetActionsForPlayer(MatchPlayer player)
        => player.Actions.
            Select(action => new ActionsDataDto
                { Key = mapper.Map<BaseEnumDto<UnitOrder>>(action.Key), Value = action.Value, })
            .ToList();
}
