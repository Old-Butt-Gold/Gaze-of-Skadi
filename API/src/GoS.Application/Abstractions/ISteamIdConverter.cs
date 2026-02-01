namespace GoS.Application.Abstractions;

public interface ISteamIdConverter
{
    string ConvertSteamId64To32(string steamId64);
    string ConvertSteamId32To64(string steamId32);
    bool TryConvertSteamId64To32(string steamId64, out string steamId32);
    bool TryConvertSteamId32To64(string steamId32, out string steamId64);
}
