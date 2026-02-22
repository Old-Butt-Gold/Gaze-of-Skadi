using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;

internal sealed class GetMatchGraphicsByIdHandler(ISender sender)
    : IRequestHandler<GetMatchGraphicsByIdQuery, MatchGraphicsDto?>
{
    public async Task<MatchGraphicsDto?> Handle(
        GetMatchGraphicsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        return new MatchGraphicsDto
        {
            TeamAdvantages = MapTeamAdvantages(match),
            PlayerGraphs = MapPlayerGraphs(match.Players),
            Throw = match.Throw,
            Comeback = match.Comeback,
            Loss = match.Loss,
            Stomp = match.Stomp,
        };
    }

    private static IEnumerable<TeamAdvantageDto> MapTeamAdvantages(Match match)
    {
        var goldCount = match.RadiantGoldAdvantage.Count;
        var xpCount = match.RadiantXpAdvantage.Count;
        var minuteCount = Math.Min(goldCount, xpCount);

        return Enumerable.Range(0, minuteCount)
            .Select(minute => new TeamAdvantageDto
            {
                Minute = minute,
                RadiantGoldAdvantage = match.RadiantGoldAdvantage[minute],
                RadiantXpAdvantage = match.RadiantXpAdvantage[minute]
            });
    }

    private IEnumerable<PlayerGraphsDto> MapPlayerGraphs(IReadOnlyList<MatchPlayer> players) =>
        players.Select((player, index) => new PlayerGraphsDto
        {
            PlayerIndex = index,
            GoldPerMinute = CreateMinuteValues(player.GoldEachMinute),
            XpPerMinute = CreateMinuteValues(player.XpEachMinute),
            LastHitsPerMinute = CreateMinuteValues(player.LastHitsEachMinute),
        });

    private IEnumerable<MinuteValueDto> CreateMinuteValues(IReadOnlyList<int> values) =>
        Enumerable.Range(0, values.Count)
            .Select(minute => new MinuteValueDto
            {
                Minute = minute,
                Value = values[minute]
            });
}
