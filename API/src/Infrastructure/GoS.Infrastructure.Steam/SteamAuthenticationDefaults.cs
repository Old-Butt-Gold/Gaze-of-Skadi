namespace GoS.Infrastructure.Steam;

/// <summary>
/// Contains various constants used as default values
/// for the Steam authentication middleware.
/// </summary>
public static class SteamAuthenticationDefaults
{
    public const string AuthenticationScheme = "Steam";

    public const string DisplayName = "Steam";

    public const string CallbackPath = "/signin-steam";

    public const string Authority = "https://steamcommunity.com/openid/";

    public const string UserInformationEndpoint = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/";
}