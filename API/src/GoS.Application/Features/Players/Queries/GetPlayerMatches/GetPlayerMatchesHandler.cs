using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

internal sealed class GetPlayerMatchesHandler(IRequester requester)
    : IRequestHandler<GetPlayerMatchesQuery, IEnumerable<PlayerMatch>?>
{
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
        "level"
    ];
    
    public Task<IEnumerable<PlayerMatch>?> Handle(GetPlayerMatchesQuery request, CancellationToken ct)
    {
        request.Parameters.Project = Project;
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        return requester.GetResponseAsync<IEnumerable<PlayerMatch>>($"players/{request.AccountId}/matches", parameters, ct);
    }
}