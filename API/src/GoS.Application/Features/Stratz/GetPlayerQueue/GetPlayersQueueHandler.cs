using System.Net.Http.Json;
using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Stratz;
using MediatR;

namespace GoS.Application.Features.Stratz.GetPlayerQueue;

internal sealed class GetPlayersQueueHandler(IRequester<StratzHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayersQueueQuery, IEnumerable<PlayersQueueDto>?>
{
    public async Task<IEnumerable<PlayersQueueDto>?> Handle(GetPlayersQueueQuery request, CancellationToken cancellationToken)
    {
        var graphqlQuery = new
        {
            operationName = "GetPlayersRegions",
            variables = new { },
            query = """
                    query GetPlayersRegions {
                      stratz {
                        page {
                          matches {
                            matchmakingStats {
                              timestamp: time
                              australia
                              austria
                              brazil
                              chile
                              dubai
                              europe
                              india
                              japan
                              perfectWorldTelecom
                              perfectWorldTelecomGuangdong
                              perfectWorldTelecomWuhan
                              perfectWorldTelecomZhejiang
                              perfectWorldUnicom
                              perfectWorldUnicomTianjin
                              peru
                              singapore
                              southAfrica
                              stockholm
                              taiwan
                              usEast: uSEast
                              usWest: uSWest
                            }
                          }
                        }
                      }
                    }
                    """
        };

        var content = JsonContent.Create(graphqlQuery);
        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

        var playersRegions = await requester.PostRequestAsync<PlayersRegionsData?>("graphql", null, content, cancellationToken);

        var latestStats = playersRegions?.Data?.Stratz?.Page?.Matches?.MatchmakingStats ?? [];

        return mapper.Map<IEnumerable<PlayersQueueDto>>(latestStats.OrderBy(x => x.Timestamp));
    }
}
