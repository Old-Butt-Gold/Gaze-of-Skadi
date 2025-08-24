using GoS.Application.Abstractions;
using GoS.Domain.Search.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

internal sealed class GetProPlayersByNameHandler(IRequester requester)
    : IRequestHandler<GetProPlayersByNameQuery, IEnumerable<ProPlayer>?>
{
    public async Task<IEnumerable<ProPlayer>?> Handle(GetProPlayersByNameQuery request, CancellationToken ct)
    {
        var proPlayers = await requester.GetResponseAsync<IEnumerable<ProPlayer>>("proPlayers", ct: ct);

        if (proPlayers is null) return null;
        
        if (request.Name is null) return proPlayers;
        
        var term = request.Name.Trim();
        
        var filteredPlayers = proPlayers.Where(player =>
            ContainsIgnoreCase(player.Name, term) ||
            ContainsIgnoreCase(player.PersonaName, term) ||
            ContainsIgnoreCase(player.TeamName, term)
        );
        
        return filteredPlayers;
    }
    
    private static bool ContainsIgnoreCase(string? value, string term)
    {
        return !string.IsNullOrEmpty(value) 
               && value.Contains(term, StringComparison.OrdinalIgnoreCase);
    }
}