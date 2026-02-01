using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamPlayersById;

internal sealed class GetTeamPlayersByIdHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetTeamPlayersByIdQuery, IEnumerable<TeamPlayerDto>?>
{
    public async Task<IEnumerable<TeamPlayerDto>?> Handle(GetTeamPlayersByIdQuery request, CancellationToken ct)
    {
        var players = await requester.GetResponseAsync<IEnumerable<TeamPlayer>>($"teams/{request.Id}/players", ct: ct);

        return mapper.Map<IEnumerable<TeamPlayerDto>>(players);
    }
}
