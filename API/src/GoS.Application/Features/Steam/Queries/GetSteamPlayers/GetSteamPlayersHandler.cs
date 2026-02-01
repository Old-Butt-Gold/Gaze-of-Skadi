using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Steam;
using MediatR;

namespace GoS.Application.Features.Steam.Queries.GetSteamPlayers;

internal sealed class GetSteamPlayersHandler(IRequester<SteamHttpRequesterOptions> requester, IMapper mapper, ISteamIdConverter steamIdConverter)
    : IRequestHandler<GetSteamPlayersQuery, IEnumerable<SteamPlayerDto>?>
{
    public async Task<IEnumerable<SteamPlayerDto>?> Handle(GetSteamPlayersQuery request, CancellationToken cancellationToken)
    {
        var steamIds64 = request.SteamIds32
            .Select(steamIdConverter.ConvertSteamId32To64)
            .ToArray();

        var parameters = BuildParameters(steamIds64);
        var apiResponse = await requester.GetResponseAsync<SteamApiResponse>(
            "ISteamUser/GetPlayerSummaries/v2",
            parameters,
            ct: cancellationToken);

        var players = apiResponse?.Response.Players ?? [];

        return mapper.Map<IEnumerable<SteamPlayerDto>>(players);
    }

    private static IEnumerable<KeyValuePair<string, string>> BuildParameters(string[] steamIds64)
    {
        List<KeyValuePair<string, string>> parameters = [];
        if (steamIds64.Length == 0) return parameters;

        parameters.Add(new("steamids", string.Join(",", steamIds64)));
        return parameters;
    }
}
