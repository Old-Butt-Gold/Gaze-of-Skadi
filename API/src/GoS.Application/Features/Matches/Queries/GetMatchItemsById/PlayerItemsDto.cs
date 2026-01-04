using GoS.Application.Dto;

namespace GoS.Application.Features.Matches.Queries.GetMatchItemsById;

public record ItemsDataDto
{
    public required string ItemKey { get; set; }
    public required long ItemBuyTime { get; set; }
    public required bool Consumable { get; set; }
}

public record PlayerItemsDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    
    public required IEnumerable<ItemsDataDto> Items { get; init; }
}