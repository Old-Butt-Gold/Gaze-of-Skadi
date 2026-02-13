using AutoMapper;
using GoS.Application.Features.Players.Queries.GetPlayerMatches;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerActivity;

internal sealed class GetPlayerActivityHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetPlayerActivityQuery, Dictionary<DateOnly, IEnumerable<PlayerMatchDto>>?>
{
    private static Dictionary<DateOnly, IEnumerable<PlayerMatchDto>> GroupMatchesByDay(
        IEnumerable<PlayerMatchDto> matches)
    {
        var matchesByDay = matches
            .GroupBy(m => DateOnly.FromDateTime(DateTimeOffset.FromUnixTimeSeconds(m.StartTime).DateTime))
            .ToDictionary(g => g.Key, g => g.AsEnumerable());

        if (matchesByDay.Count == 0)
            return matchesByDay;

        var minDate = matchesByDay.Keys.Min();
        var maxDate = matchesByDay.Keys.Max();

        var allDates = Enumerable.Range(0, (maxDate.ToDateTime(TimeOnly.MinValue) - minDate.ToDateTime(TimeOnly.MinValue)).Days + 1)
            .Select(offset => minDate.AddDays(offset));

        var result = new Dictionary<DateOnly, IEnumerable<PlayerMatchDto>>();
        foreach (var date in allDates)
        {
            result[date] = matchesByDay.TryGetValue(date, out var dayMatches)
                ? dayMatches
                : [];
        }

        return result.OrderBy(kvp => kvp.Key).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
    }

    public async Task<Dictionary<DateOnly, IEnumerable<PlayerMatchDto>>?> Handle(GetPlayerActivityQuery request,
        CancellationToken cancellationToken)
    {
        var playerMatches = await sender.Send(new GetPlayerMatchesQuery(request.AccountId, request.Parameters), cancellationToken);

        if (playerMatches == null || !playerMatches.Any())
            return new Dictionary<DateOnly, IEnumerable<PlayerMatchDto>>();

        return GroupMatchesByDay(playerMatches);
    }
}
