using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Steam;
using MediatR;

namespace GoS.Application.Features.Steam.Queries.GetSteamNews;

internal sealed class GetSteamNewsHandler(IRequester<SteamHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetSteamNewsQuery, IEnumerable<SteamNewsDto>>
{
    private const int Dota2AppId = 570;

    public async Task<IEnumerable<SteamNewsDto>> Handle(GetSteamNewsQuery request, CancellationToken cancellationToken)
    {
        var parameters = BuildParameters(request.Count);
        var response = await requester.GetResponseAsync<SteamNewsResponse?>(
            "ISteamNews/GetNewsForApp/v1",
            parameters,
            ct: cancellationToken);

        var news = response?.AppNews.NewsItems.NewsItemList ?? [];

        return mapper.Map<IEnumerable<SteamNewsDto>>(news);
    }

    private static IEnumerable<KeyValuePair<string, string>> BuildParameters(int count)
    {
        return
        [
            new("appid", Dota2AppId.ToString()),
            new("count", count.ToString())
        ];
    }
}
