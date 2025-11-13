namespace GoS.Infrastructure.Steam;

public static class SteamClaimTypes
{
    public const string SteamId64 = $"{SteamAuthenticationDefaults.AuthenticationScheme}_id64";
    public const string SteamId32 = $"{SteamAuthenticationDefaults.AuthenticationScheme}_id32";
    public const string ProfileUrl = $"{SteamAuthenticationDefaults.AuthenticationScheme}_profileurl";
    public const string Avatar = $"{SteamAuthenticationDefaults.AuthenticationScheme}_avatar";
    public const string AvatarMedium = $"{SteamAuthenticationDefaults.AuthenticationScheme}_avatarmedium";
    public const string AvatarFull = $"{SteamAuthenticationDefaults.AuthenticationScheme}_avatarfull";
    public const string SteamName = $"{SteamAuthenticationDefaults.AuthenticationScheme}_steamname";
    public const string RealName = $"{SteamAuthenticationDefaults.AuthenticationScheme}_realname";
    public const string TimeCreated = $"{SteamAuthenticationDefaults.AuthenticationScheme}_timecreated";
    public const string LastLogoff = $"{SteamAuthenticationDefaults.AuthenticationScheme}_lastlogoff";
}