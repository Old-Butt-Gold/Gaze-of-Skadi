using GoS.Application.Features.Players.Queries.GetPlayerMatches;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerActivity;

internal sealed class GetPlayerActivityHandler(ISender sender)
    : IRequestHandler<GetPlayerActivityQuery, PlayerActivityDto?>
{
    public async Task<PlayerActivityDto?> Handle(GetPlayerActivityQuery request, CancellationToken cancellationToken)
    {
        var playerMatches = await sender.Send(new GetPlayerMatchesQuery(request.AccountId, request.Parameters), cancellationToken);

        if (playerMatches == null || !playerMatches.Any())
        {
            return new PlayerActivityDto
            {
                MatchesByDay = [],
                Stats = new ActivityStatsDto
                {
                    Overall = new WinLossStats(),
                    ByHour = [],
                    ByDayOfWeek = [],
                    ByMonth = [],
                    ByYear = [],
                },
                FirstMatchStartTime = 0
            };
        }

        var offsetSeconds = request.TimezoneOffsetHours * 60 * 60 ?? 0;

        return new PlayerActivityDto
        {
            MatchesByDay = GroupMatchesByDay(playerMatches, offsetSeconds),
            Stats = CalculateStats(playerMatches, offsetSeconds),
            FirstMatchStartTime = playerMatches.Min(m => m.StartTime)
        };
    }

    private static Dictionary<DateOnly, IEnumerable<ActivityMatchDto>> GroupMatchesByDay(IEnumerable<PlayerMatchDto> matches, long offsetSeconds)
    {
        var matchesByDay = matches
            .GroupBy(m => GetDateOnlyFromUnix(m.StartTime, offsetSeconds))
            .ToDictionary(g => g.Key, g => g.Select(MapToActivityMatch).AsEnumerable());

        if (matchesByDay.Count == 0)
            return matchesByDay;

        var minDate = matchesByDay.Keys.Min();
        var maxDate = matchesByDay.Keys.Max();

        var allDates = Enumerable.Range(0, (maxDate.ToDateTime(TimeOnly.MinValue) - minDate.ToDateTime(TimeOnly.MinValue)).Days + 1)
            .Select(offset => minDate.AddDays(offset));

        var result = new Dictionary<DateOnly, IEnumerable<ActivityMatchDto>>();
        foreach (var date in allDates)
        {
            result[date] = matchesByDay.TryGetValue(date, out var dayMatches)
                ? dayMatches
                : [];
        }

        return result.OrderBy(kvp => kvp.Key).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

        static ActivityMatchDto MapToActivityMatch(PlayerMatchDto match) =>
            new()
            {
                MatchId = match.MatchId,
                HeroId = match.HeroId,
                Duration = match.Duration,
                StartTime = match.StartTime,
                LeaverStatus = match.LeaverStatus,
                HeroVariant = match.HeroVariant,
                PartySize = match.PartySize,
                IsMatchParsed = match.IsMatchParsed,
                IsRadiant = match.IsRadiant,
                RadiantWin = match.RadiantWin,
                GameMode = match.GameMode,
                LobbyType = match.LobbyType,
                AverageRank = match.AverageRank,
            };
    }

    private static DateOnly GetDateOnlyFromUnix(long unixSeconds, long offsetSeconds)
    {
        var adjustedTime = unixSeconds + offsetSeconds;
        var dateTime = DateTimeOffset.FromUnixTimeSeconds(adjustedTime).DateTime;
        return DateOnly.FromDateTime(dateTime);
    }

    private static ActivityStatsDto CalculateStats(IEnumerable<PlayerMatchDto> matches, long offsetSeconds)
    {
        var overall = CalculateWinLoss(matches);

        var byHour = matches
            .GroupBy(m => GetHourFromUnix(m.StartTime, offsetSeconds))
            .OrderBy(g => g.Key)
            .ToDictionary(g => g.Key, CalculateWinLoss);

        var byDayOfWeek = matches
            .GroupBy(m => GetDayOfWeekFromUnix(m.StartTime, offsetSeconds))
            .OrderBy(g => g.Key)
            .ToDictionary(g => g.Key, CalculateWinLoss);

        var byMonth = matches
            .GroupBy(m => GetMonthFromUnix(m.StartTime, offsetSeconds))
            .OrderBy(g => g.Key)
            .ToDictionary(g => g.Key, CalculateWinLoss);

        var byYear = matches
            .GroupBy(m => GetYearFromUnix(m.StartTime, offsetSeconds))
            .OrderBy(g => g.Key)
            .ToDictionary(g => g.Key, CalculateWinLoss);

        return new ActivityStatsDto
        {
            Overall = overall,
            ByHour = byHour,
            ByDayOfWeek = byDayOfWeek,
            ByMonth = byMonth,
            ByYear = byYear
        };
    }

    private static int GetHourFromUnix(long unixSeconds, long offsetSeconds)
    {
        var adjustedTime = unixSeconds + offsetSeconds;
        return DateTimeOffset.FromUnixTimeSeconds(adjustedTime).Hour;
    }

    private static int GetDayOfWeekFromUnix(long unixSeconds, long offsetSeconds)
    {
        var adjustedTime = unixSeconds + offsetSeconds;
        return (int)DateTimeOffset.FromUnixTimeSeconds(adjustedTime).DayOfWeek;
    }

    private static int GetMonthFromUnix(long unixSeconds, long offsetSeconds)
    {
        var adjustedTime = unixSeconds + offsetSeconds;
        return DateTimeOffset.FromUnixTimeSeconds(adjustedTime).Month;
    }

    private static int GetYearFromUnix(long unixSeconds, long offsetSeconds)
    {
        var adjustedTime = unixSeconds + offsetSeconds;
        return DateTimeOffset.FromUnixTimeSeconds(adjustedTime).Year;
    }

    private static WinLossStats CalculateWinLoss(IEnumerable<PlayerMatchDto> matches)
    {
        var wins = 0;
        var losses = 0;

        foreach (var match in matches)
        {
            if (match.RadiantWin == null)
                continue;

            var isWin = match.IsRadiant.Value == match.RadiantWin.Value;

            if (isWin)
            {
                wins++;
            }
            else
            {
                losses++;
            }
        }

        return new WinLossStats
        {
            Wins = wins,
            Losses = losses
        };
    }
}
