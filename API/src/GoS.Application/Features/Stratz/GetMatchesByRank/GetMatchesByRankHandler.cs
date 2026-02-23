using System.Net.Http.Json;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Stratz;
using MediatR;

namespace GoS.Application.Features.Stratz.GetMatchesByRank;

internal sealed class GetMatchesByRankHandler(IRequester<StratzHttpRequesterOptions> requester)
    : IRequestHandler<GetMatchesByRankQuery, MatchesByRankDto?>
{
    public async Task<MatchesByRankDto?> Handle(GetMatchesByRankQuery request, CancellationToken cancellationToken)
    {
        var graphqlQuery = new
        {
            variables = new { take = request.Take },
            query = """
                    query ($take: Int!) {
                      heroStats {
                        HERALD: winMonth(take: $take, bracketIds: [HERALD], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        GUARDIAN: winMonth(take: $take, bracketIds: [GUARDIAN], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        CRUSADER: winMonth(take: $take, bracketIds: [CRUSADER], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        ARCHON: winMonth(take: $take, bracketIds: [ARCHON], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        LEGEND: winMonth(take: $take, bracketIds: [LEGEND], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        ANCIENT: winMonth(take: $take, bracketIds: [ANCIENT], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        DIVINE: winMonth(take: $take, bracketIds: [DIVINE], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        IMMORTAL: winMonth(take: $take, bracketIds: [IMMORTAL], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        __typename
                      }
                    }
                    """
        };

        var content = JsonContent.Create(graphqlQuery);
        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

        var response = await requester.PostRequestAsync<MatchesByRankResponse>("graphql", null, content, cancellationToken);

        return new MatchesByRankDto
        {
            Herald = GroupAndSumByMonth(response?.Data?.HeroStats?.Herald),
            Guardian = GroupAndSumByMonth(response?.Data?.HeroStats?.Guardian),
            Crusader = GroupAndSumByMonth(response?.Data?.HeroStats?.Crusader),
            Archon = GroupAndSumByMonth(response?.Data?.HeroStats?.Archon),
            Legend = GroupAndSumByMonth(response?.Data?.HeroStats?.Legend),
            Ancient = GroupAndSumByMonth(response?.Data?.HeroStats?.Ancient),
            Divine = GroupAndSumByMonth(response?.Data?.HeroStats?.Divine),
            Immortal = GroupAndSumByMonth(response?.Data?.HeroStats?.Immortal)
        };
    }

    private static IEnumerable<RankStatsDto> GroupAndSumByMonth(IEnumerable<WinMonthData>? data)
    {
        if (data == null || !data.Any())
            return [];

        return data
            .GroupBy(x => x.Month)
            .Select(g => new RankStatsDto
            {
                MonthUnix = g.Key,
                MatchCount = g.Sum(x => x.MatchCount)
            })
            .OrderBy(x => x.MonthUnix)
            .ToList();
    }
}
