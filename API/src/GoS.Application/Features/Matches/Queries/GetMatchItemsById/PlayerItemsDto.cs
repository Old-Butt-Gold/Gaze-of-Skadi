namespace GoS.Application.Features.Matches.Queries.GetMatchItemsById;

public record ItemsDataDto
{
    public required string ItemKey { get; set; }
    public required long ItemBuyTime { get; set; }
    public required bool Consumable { get; set; }
}

public record PlayerItemsDto
{
    public required int PlayerIndex { get; init; }

    public required IEnumerable<ItemsDataDto> Items { get; init; }
}
