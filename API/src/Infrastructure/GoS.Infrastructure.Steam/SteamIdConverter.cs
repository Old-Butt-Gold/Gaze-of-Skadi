using GoS.Application.Abstractions;

namespace GoS.Infrastructure.Steam;

public sealed class SteamIdConverter : ISteamIdConverter
{
    private const ulong SteamId64Base = 76561197960265728;

    public string ConvertSteamId64To32(string steamId64)
    {
        if (ulong.TryParse(steamId64, out var steamId))
        {
            var steamId32 = (steamId - SteamId64Base) & 0xFFFFFFFF;
            return steamId32.ToString();
        }
        return steamId64;
    }

    public string ConvertSteamId32To64(string steamId32)
    {
        if (ulong.TryParse(steamId32, out var steamId32Value))
        {
            var steamId64 = steamId32Value + SteamId64Base;
            return steamId64.ToString();
        }
        return steamId32;
    }

    public bool TryConvertSteamId64To32(string steamId64, out string steamId32)
    {
        steamId32 = steamId64;
        if (ulong.TryParse(steamId64, out var steamId))
        {
            steamId32 = ((steamId - SteamId64Base) & 0xFFFFFFFF).ToString();
            return true;
        }
        return false;
    }

    public bool TryConvertSteamId32To64(string steamId32, out string steamId64)
    {
        steamId64 = steamId32;
        if (ulong.TryParse(steamId32, out var steamId32Value))
        {
            steamId64 = (steamId32Value + SteamId64Base).ToString();
            return true;
        }
        return false;
    }
}
