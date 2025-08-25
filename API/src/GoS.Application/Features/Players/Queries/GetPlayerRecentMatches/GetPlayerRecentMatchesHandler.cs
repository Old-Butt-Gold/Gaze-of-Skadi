using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecentMatches;

internal sealed class GetPlayerRecentMatchesHandler(IRequester requester)
    : IRequestHandler<GetPlayerRecentMatchesQuery, IEnumerable<PlayerMatch>?>
{
    private const int Limit = 20;
    private static readonly List<string> Project = [
        "duration",
        "game_mode",
        "lobby_type",
        "start_time",
        "hero_id",
        "kills",
        "deaths",
        "assists",
        "leaver_status",
        "party_size",
        "average_rank",
        "hero_variant",
        "item_0",
        "item_1",
        "item_2",
        "item_3",
        "item_4",
        "item_5",
        "heroes",
        "start_time",
        "lane_role",
        "level",
        "version"
    ];

    public Task<IEnumerable<PlayerMatch>?> Handle(GetPlayerRecentMatchesQuery request, CancellationToken ct)
    {
        var parameters = request.Parameters;
        parameters.Limit ??= Limit;
        parameters.Project = Project;

        var queryParameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerMatch>>($"players/{request.AccountId}/matches", queryParameters, ct);
    }
}
