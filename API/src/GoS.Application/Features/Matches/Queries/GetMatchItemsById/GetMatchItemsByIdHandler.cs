using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchItemsById;

internal sealed class GetMatchItemsByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchItemsByIdQuery, IEnumerable<PlayerItemsDto>?>
{
    public async Task<IEnumerable<PlayerItemsDto>?> Handle(GetMatchItemsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        return match.Players
            .Select(player => new PlayerItemsDto { 
                PlayerInfo = mapper.Map<PlayerInfoDto>(player), 
                Items = GetItemsForPlayer(player), })
            .ToList();
    }

    private static List<ItemsDataDto> GetItemsForPlayer(MatchPlayer player) 
        => player.PurchaseLog.Select(it => new ItemsDataDto { ItemKey = it.Key, ItemBuyTime = it.Time, }).ToList();
}