using System.Net.Http.Json;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Stratz;
using MediatR;

namespace GoS.Application.Features.Stratz.GetHeroesMetaChange;

internal sealed class HeroMetaChangeHandler(IRequester<StratzHttpRequesterOptions> requester)
    : IRequestHandler<HeroMetaChangeQuery, HeroMetaTimelineDto?>
{
    public async Task<HeroMetaTimelineDto?> Handle(HeroMetaChangeQuery request, CancellationToken cancellationToken)
    {
        var graphqlQuery = new
        {
            operationName = "HeroesMetaPositions",
            variables = new { },
            query = """
                    query HeroesMetaPositions($bracketIds: [RankBracket], $gameModeIds: [GameModeEnumType]) {
                      heroesPos1: heroStats {
                        winDay(
                          take: 30
                          positionIds: [POSITION_1]
                          bracketIds: $bracketIds
                          gameModeIds: $gameModeIds
                        ) {
                          heroId
                          matchCount
                          winCount
                        }
                      }
                      heroesPos2: heroStats {
                        winDay(
                          take: 30
                          positionIds: [POSITION_2]
                          bracketIds: $bracketIds
                          gameModeIds: $gameModeIds
                        ) {
                          heroId
                          matchCount
                          winCount
                        }
                      }
                      heroesPos3: heroStats {
                        winDay(
                          take: 30
                          positionIds: [POSITION_3]
                          bracketIds: $bracketIds
                          gameModeIds: $gameModeIds
                        ) {
                          heroId
                          matchCount
                          winCount
                        }
                      }
                      heroesPos4: heroStats {
                        winDay(
                          take: 30
                          positionIds: [POSITION_4]
                          bracketIds: $bracketIds
                          gameModeIds: $gameModeIds
                        ) {
                          heroId
                          matchCount
                          winCount
                        }
                      }
                      heroesPos5: heroStats {
                        winDay(
                          take: 30
                          positionIds: [POSITION_5]
                          bracketIds: $bracketIds
                          gameModeIds: $gameModeIds
                        ) {
                          heroId
                          matchCount
                          winCount
                        }
                      }
                    }
                    """
        };

        var content = JsonContent.Create(graphqlQuery);
        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

        var response = await requester.PostRequestAsync<HeroesMetaData>("graphql", null, content, cancellationToken);

        return new HeroMetaTimelineDto
        {
            Pos1 = GroupAndSumHeroes(response?.Data?.HeroesPos1?.WinDay, request.HeroId),
            Pos2 = GroupAndSumHeroes(response?.Data?.HeroesPos2?.WinDay, request.HeroId),
            Pos3 = GroupAndSumHeroes(response?.Data?.HeroesPos3?.WinDay, request.HeroId),
            Pos4 = GroupAndSumHeroes(response?.Data?.HeroesPos4?.WinDay, request.HeroId),
            Pos5 = GroupAndSumHeroes(response?.Data?.HeroesPos5?.WinDay, request.HeroId)
        };
    }

    private static IEnumerable<HeroMetaPointDto> GroupAndSumHeroes(IEnumerable<HeroWinDay>? winDays, int heroId)
    {
        if (winDays == null || !winDays.Any())
            return [];

        var heroData = winDays
            .Where(x => x.HeroId == heroId)
            .ToList();

        if (heroData.Count == 0)
            return [];

        var timeline = new List<HeroMetaPointDto>();
        double? previousWinRate = null;

        // Индекс 0 = -1 день (вчера), индекс 1 = -2 дня и т.д.
        for (var i = 0; i < heroData.Count; i++)
        {
            var day = heroData[i];

            var winRate = day.MatchCount > 0
                ? Math.Round((double)day.WinCount / day.MatchCount * 100, 2)
                : 0;

            var winRateChanged = 0.0;
            if (previousWinRate.HasValue)
            {
                winRateChanged = Math.Round(winRate - previousWinRate.Value, 2);
            }

            var daysAgo = i + 1;
            var timestamp = DateTimeOffset.UtcNow.AddDays(-daysAgo).ToUnixTimeSeconds();

            timeline.Add(new HeroMetaPointDto
            {
                WinRate = winRate,
                WinRateChanged = winRateChanged,
                TimeStamp = timestamp,
                MatchCount = day.MatchCount,
            });

            previousWinRate = winRate;
        }

        return timeline.OrderBy(x => x.TimeStamp).ToList();
    }
}
