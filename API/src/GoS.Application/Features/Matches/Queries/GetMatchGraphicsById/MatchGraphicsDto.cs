namespace GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;

public record TeamAdvantageDto
{
    public required int Minute { get; init; }
    public required int RadiantGoldAdvantage { get; init; }
    public required int RadiantXpAdvantage { get; init; }
}

public record MinuteValueDto
{
    public required int Minute { get; init; }
    public required int Value { get; init; }
}

public record PlayerGraphsDto
{
    public required int PlayerIndex { get; init; }
    public required IEnumerable<MinuteValueDto> GoldPerMinute { get; init; }
    public required IEnumerable<MinuteValueDto> XpPerMinute { get; init; }
    public required IEnumerable<MinuteValueDto> LastHitsPerMinute { get; init; }
}

public record MatchGraphicsDto
{
    public required IEnumerable<TeamAdvantageDto> TeamAdvantages { get; init; }
    public required IEnumerable<PlayerGraphsDto> PlayerGraphs { get; init; }

    /// <summary>
    /// Величина "закинутого" преимущества. Максимальное золото, которое вела проигравшая команда перед тем, как проиграть.
    /// </summary>
    public required int? Throw { get; init; }

    /// <summary>
    /// Величина камбэка. Максимальное отставание по золоту, которое успешно отыграла победившая команда.
    /// </summary>
    public required int? Comeback { get; init; }

    /// <summary>
    /// Глубина поражения. Максимальное отставание по золоту, зафиксированное у проигравшей команды в любой момент игры.
    /// </summary>
    public required int? Loss { get; init; }

    /// <summary>
    /// Степень доминации (разгром). Максимальное преимущество по золоту, которого достигла победившая команда.
    /// </summary>
    public required int? Stomp { get; init; }
}
