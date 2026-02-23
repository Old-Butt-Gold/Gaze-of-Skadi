using System.Net.Http.Json;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Stratz;
using MediatR;

namespace GoS.Application.Features.Stratz.GetMatchesByRegion;

internal sealed class GetMatchesByRegionHandler(IRequester<StratzHttpRequesterOptions> requester)
    : IRequestHandler<GetMatchesByRegionQuery, MatchesByRegionDto?>
{
    public async Task<MatchesByRegionDto?> Handle(GetMatchesByRegionQuery request, CancellationToken cancellationToken)
    {

        var graphqlQuery = new
        {
            variables = new { take = request.Take },
            query = """
                    query ($take: Int!) {
                      heroStats {
                        CHINA: winMonth(take: $take, regionIds: [CHINA], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        SEA: winMonth(take: $take, regionIds: [SEA], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        NORTH_AMERICA: winMonth(take: $take, regionIds: [NORTH_AMERICA], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        SOUTH_AMERICA: winMonth(take: $take, regionIds: [SOUTH_AMERICA], groupBy: ALL) {
                          month
                          matchCount
                          __typename
                        }
                        EUROPE: winMonth(take: $take, regionIds: [EUROPE], groupBy: ALL) {
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

        var response = await requester.PostRequestAsync<MatchesByRegionResponse>("graphql", null, content, cancellationToken);

        return new MatchesByRegionDto
        {
            China = GroupAndSumByMonth(response?.Data?.HeroStats?.China),
            Sea = GroupAndSumByMonth(response?.Data?.HeroStats?.Sea),
            NorthAmerica = GroupAndSumByMonth(response?.Data?.HeroStats?.NorthAmerica),
            SouthAmerica = GroupAndSumByMonth(response?.Data?.HeroStats?.SouthAmerica),
            Europe = GroupAndSumByMonth(response?.Data?.HeroStats?.Europe)
        };
    }

    private static IEnumerable<RegionStatsDto> GroupAndSumByMonth(IEnumerable<WinMonthData>? data)
    {
        if (data == null || !data.Any())
            return [];

        return data
            .GroupBy(x => x.Month)
            .Select(g => new RegionStatsDto
            {
                MonthUnix = g.Key,
                MatchCount = g.Sum(x => x.MatchCount)
            })
            .OrderBy(x => x.MonthUnix)
            .ToList();
    }
}
