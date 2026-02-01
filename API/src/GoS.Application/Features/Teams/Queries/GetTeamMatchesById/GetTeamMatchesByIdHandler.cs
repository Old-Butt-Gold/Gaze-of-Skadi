using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Teams.Models;
using MediatR;

namespace GoS.Application.Features.Teams.Queries.GetTeamMatchesById;

internal sealed class GetTeamMatchesByIdHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetTeamMatchesByIdQuery, IEnumerable<TeamMatchDto>?>
{
    public async Task<IEnumerable<TeamMatchDto>?> Handle(GetTeamMatchesByIdQuery request, CancellationToken ct)
    {
        var matches = await requester.GetResponseAsync<IEnumerable<TeamMatch>>($"teams/{request.Id}/matches", ct: ct);

        return mapper.Map<IEnumerable<TeamMatchDto>>(matches);
    }
}
