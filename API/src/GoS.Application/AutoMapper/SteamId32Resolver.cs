using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Features.Steam.Queries.GetSteamPlayers;
using GoS.Domain.Steam;

namespace GoS.Application.AutoMapper;

public class SteamId32Resolver(ISteamIdConverter steamIdConverter) : IValueResolver<SteamPlayer, SteamPlayerDto, string>
{
    public string Resolve(SteamPlayer source, SteamPlayerDto destination, string destMember, ResolutionContext context)
        => steamIdConverter.ConvertSteamId64To32(source.SteamId);
}
