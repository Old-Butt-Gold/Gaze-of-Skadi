using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Domain.Search.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

internal sealed class GetProPlayersByNameHandler(IRequester requester, IMapper mapper)
    : IRequestHandler<GetProPlayersByNameQuery, IEnumerable<ProPlayerDto>?>
{
    public async Task<IEnumerable<ProPlayerDto>?> Handle(GetProPlayersByNameQuery request, CancellationToken ct)
    {
        var proPlayers = await requester.GetResponseAsync<IEnumerable<ProPlayer>>("proPlayers", ct: ct);

        if (proPlayers is null) return null;
        
        if (request.Name is null) return mapper.Map<IEnumerable<ProPlayerDto>>(proPlayers);
        
        var term = request.Name.Trim();
        
        var filteredPlayers = proPlayers.Where(player =>
            ContainsIgnoreCase(player.Name, term) ||
            ContainsIgnoreCase(player.PersonaName, term) ||
            ContainsIgnoreCase(player.TeamName, term)
        );
        
        return mapper.Map<IEnumerable<ProPlayerDto>>(filteredPlayers);
    }
    
    private static bool ContainsIgnoreCase(string? value, string term)
    {
        return !string.IsNullOrEmpty(value) 
               && value.Contains(term, StringComparison.OrdinalIgnoreCase);
    }
}