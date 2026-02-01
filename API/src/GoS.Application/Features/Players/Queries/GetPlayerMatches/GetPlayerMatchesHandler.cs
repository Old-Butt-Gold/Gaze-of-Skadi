using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerMatches;

internal sealed class GetPlayerMatchesHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayerMatchesQuery, IEnumerable<PlayerMatchDto>?>
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
        "hero_variant",
        "party_size",
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

    public async Task<IEnumerable<PlayerMatchDto>?> Handle(GetPlayerMatchesQuery request, CancellationToken ct)
    {
        request.Parameters.Project = Project;
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerMatches = await requester.GetResponseAsync<IEnumerable<PlayerMatch>>($"players/{request.AccountId}/matches", parameters, ct);
        return mapper.Map<IEnumerable<PlayerMatchDto>?>(playerMatches);
    }
}
