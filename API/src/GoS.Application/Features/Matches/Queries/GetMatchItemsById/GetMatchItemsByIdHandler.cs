using GoS.Application.Abstractions;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using GoS.Domain.Resources.Models.ItemColors;
using GoS.Domain.Resources.Models.Items;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchItemsById;

internal sealed class GetMatchItemsByIdHandler(ISender sender, IResourceManager manager)
    : IRequestHandler<GetMatchItemsByIdQuery, IEnumerable<PlayerItemsDto>?>
{
    private Dictionary<string, Item> _items = [];
    public async Task<IEnumerable<PlayerItemsDto>?> Handle(GetMatchItemsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        _items = (await manager.GetItemsAsync())!;

        return match.Players
            .Select((player, index) => new PlayerItemsDto {
                PlayerIndex = index,
                Items = GetItemsForPlayer(player), })
            .ToList();
    }

    private List<ItemsDataDto> GetItemsForPlayer(MatchPlayer player) =>
        player.PurchaseLog.Select(it => new ItemsDataDto
        {
            ItemKey = it.Key,
            ItemBuyTime = it.Time,
            Consumable = _items[it.Key].Quality is not null && _items[it.Key].Quality == ItemType.Consumable,
        }).ToList();
}
