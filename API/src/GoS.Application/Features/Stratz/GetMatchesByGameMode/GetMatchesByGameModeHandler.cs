using System.Net.Http.Json;
using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Stratz;
using MediatR;

namespace GoS.Application.Features.Stratz.GetMatchesByGameMode;

internal sealed class GetMatchesByGameModeHandler(IRequester<StratzHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetMatchesByGameModeQuery, MatchesByGameModeDto?>
{
    public async Task<MatchesByGameModeDto?> Handle(GetMatchesByGameModeQuery request, CancellationToken cancellationToken)
    {

            var graphqlQuery = new
            {
                variables = new { take = request.Take },
                query = """
                        query ($take: Int!) {
                          heroStats {
                            ALL_PICK: winMonth(take: $take, gameModeIds: [ALL_PICK], groupBy: ALL) {
                              month
                              matchCount
                              __typename
                            }
                            CAPTAINS_MODE: winMonth(take: $take, gameModeIds: [CAPTAINS_MODE], groupBy: ALL) {
                              month
                              matchCount
                              __typename
                            }
                            ALL_PICK_RANKED: winMonth(
                              take: $take
                              gameModeIds: [ALL_PICK_RANKED]
                              groupBy: ALL
                            ) {
                              month
                              matchCount
                              __typename
                            }
                            TURBO: winMonth(take: $take, gameModeIds: [TURBO], groupBy: ALL) {
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

            var response = await requester.PostRequestAsync<MatchesByGameModeResponse>("graphql", content, cancellationToken);

            // Группируем и суммируем данные по месяцам для каждого режима
            return new MatchesByGameModeDto
            {
                AllPick = GroupAndSumByMonth(response?.Data?.HeroStats?.AllPick),
                CaptainsMode = GroupAndSumByMonth(response?.Data?.HeroStats?.CaptainsMode),
                AllPickRanked = GroupAndSumByMonth(response?.Data?.HeroStats?.AllPickRanked),
                Turbo = GroupAndSumByMonth(response?.Data?.HeroStats?.Turbo)
            };
    }

    private static IEnumerable<GameModeStatsDto> GroupAndSumByMonth(IEnumerable<WinMonthData>? data)
    {
        if (data is null || !data.Any())
            return [];

        return data
            .GroupBy(x => x.Month)
            .Select(g => new GameModeStatsDto
            {
                MonthUnix = g.Key,
                MatchCount = g.Sum(x => x.MatchCount)
            })
            .OrderBy(x => x.MonthUnix)
            .ToList();
    }
}
