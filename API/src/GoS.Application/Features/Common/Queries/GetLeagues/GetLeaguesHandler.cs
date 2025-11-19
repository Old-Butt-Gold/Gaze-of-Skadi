using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetLeagues;

internal sealed class GetLeaguesHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetLeaguesQuery, IEnumerable<LeagueDto>?>
{
    public async Task<IEnumerable<LeagueDto>?> Handle(GetLeaguesQuery request, CancellationToken ct)
    {
        var leagues = await requester.GetResponseAsync<IEnumerable<League>>("leagues", ct: ct);

        return mapper.Map<IEnumerable<LeagueDto>>(leagues);
    }
}