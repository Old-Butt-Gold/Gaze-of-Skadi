using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerPros;

internal sealed class GetPlayerProsHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetPlayerProsQuery, IEnumerable<PlayerProDto>?>
{
    public async Task<IEnumerable<PlayerProDto>?> Handle(GetPlayerProsQuery request, CancellationToken ct)
    {
        var parameters = PlayerQueryHelpers.BuildParameters(request.Parameters);
        var playerPros = await requester.GetResponseAsync<IEnumerable<PlayerPro>>($"players/{request.AccountId}/pros", parameters, ct);
        return mapper.Map<IEnumerable<PlayerProDto>?>(playerPros);
    }
}