using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamById;

internal sealed class GetTeamByIdHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetTeamByIdQuery, TeamByIdDto?>
{
    public async Task<TeamByIdDto?> Handle(GetTeamByIdQuery request, CancellationToken ct)
    {
        var team = await requester.GetResponseAsync<Team>($"teams/{request.Id}", ct: ct);

        return mapper.Map<TeamByIdDto>(team);
    }
}
