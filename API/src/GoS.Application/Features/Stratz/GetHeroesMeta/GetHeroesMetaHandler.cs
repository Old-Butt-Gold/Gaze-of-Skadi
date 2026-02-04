using System.Net.Http.Json;
using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Stratz;
using MediatR;

namespace GoS.Application.Features.Stratz.GetHeroesMeta;

internal sealed class GetHeroesMetaHandler(IRequester<StratzHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetHeroesMetaQuery, HeroesMetaDto?>
{
    public async Task<HeroesMetaDto?> Handle(GetHeroesMetaQuery request, CancellationToken cancellationToken)
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

        var response = await requester.PostRequestAsync<HeroesMetaData>("graphql", content, cancellationToken);

        var pos1 = GroupAndSumHeroes(response?.Data?.HeroesPos1?.WinDay);
        var pos2 = GroupAndSumHeroes(response?.Data?.HeroesPos2?.WinDay);
        var pos3 = GroupAndSumHeroes(response?.Data?.HeroesPos3?.WinDay);
        var pos4 = GroupAndSumHeroes(response?.Data?.HeroesPos4?.WinDay);
        var pos5 = GroupAndSumHeroes(response?.Data?.HeroesPos5?.WinDay);

        return new HeroesMetaDto
        {
            HeroesPos1 = mapper.Map<IEnumerable<HeroStatsDto>>(pos1.OrderByDescending(x => x.WinRate)),
            HeroesPos2 = mapper.Map<IEnumerable<HeroStatsDto>>(pos2.OrderByDescending(x => x.WinRate)),
            HeroesPos3 = mapper.Map<IEnumerable<HeroStatsDto>>(pos3.OrderByDescending(x => x.WinRate)),
            HeroesPos4 = mapper.Map<IEnumerable<HeroStatsDto>>(pos4.OrderByDescending(x => x.WinRate)),
            HeroesPos5 = mapper.Map<IEnumerable<HeroStatsDto>>(pos5.OrderByDescending(x => x.WinRate)),
        };
    }

    private static IEnumerable<HeroWinDay> GroupAndSumHeroes(List<HeroWinDay>? winDays)
    {
        if (winDays == null || winDays.Count == 0)
            return [];

        var query = winDays
            .GroupBy(x => x.HeroId)
            .Select(g => new HeroWinDay
            {
                HeroId = g.Key,
                MatchCount = g.Sum(x => x.MatchCount),
                WinCount = g.Sum(x => x.WinCount)
            })
            .OrderByDescending(x => x.WinRate)
            .ThenByDescending(x => x.MatchCount);

        return query.ToList();
    }
}
