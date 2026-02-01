using MediatR;

namespace GoS.Application.Features.Steam.Queries.GetSteamPlayers;

public sealed record GetSteamPlayersQuery(string[] SteamIds32)
    : IRequest<IEnumerable<SteamPlayerDto>?>;
