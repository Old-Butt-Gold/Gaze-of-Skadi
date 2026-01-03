using GoS.Application.Dto;

namespace GoS.Application.Features.Matches.Queries.GetMatchCosmeticsById;

public record PlayerCosmeticsDto
{
    public required PlayerInfoDto PlayerInfo { get; init; }
    public required IEnumerable<CosmeticDto> Cosmetics { get; init; }
}

public record CosmeticDto
{
    public required string ImageUrl { get; init; }
    public required string Name { get; init; }
    public required string MarketUrl { get; init; }
}