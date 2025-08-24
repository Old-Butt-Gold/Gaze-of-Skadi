using GoS.Application.Abstractions;
using GoS.Domain.Search.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

internal sealed class GetPlayersByNameHandler(IRequester requester)
    : IRequestHandler<GetPlayersByNameQuery, IEnumerable<PlayerResponse>?>
{
    public Task<IEnumerable<PlayerResponse>?> Handle(GetPlayersByNameQuery request, CancellationToken ct)
    {
        var parameters = new[]
        {
            new KeyValuePair<string, string>("q", request.PersonaName)
        };

        return requester.GetResponseAsync<IEnumerable<PlayerResponse>>("search", parameters, ct);
    }
}