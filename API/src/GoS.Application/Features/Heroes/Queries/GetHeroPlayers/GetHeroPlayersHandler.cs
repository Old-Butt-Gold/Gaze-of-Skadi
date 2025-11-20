using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroPlayers;

internal sealed class GetHeroPlayersHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetHeroPlayersQuery, IEnumerable<HeroPlayerDto>?>
{
    public async Task<IEnumerable<HeroPlayerDto>?> Handle(GetHeroPlayersQuery request, CancellationToken ct)
    {
        var heroPlayers = await requester.GetResponseAsync<IEnumerable<HeroPlayer>>($"heroes/{request.HeroId}/players", ct: ct);
        return heroPlayers is null ? null : mapper.Map<IEnumerable<HeroPlayerDto>>(heroPlayers);
    }
}