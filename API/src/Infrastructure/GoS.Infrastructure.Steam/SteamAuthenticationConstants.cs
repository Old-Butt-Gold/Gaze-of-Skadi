namespace GoS.Infrastructure.Steam;

public static class SteamAuthenticationConstants
{
    public static class Namespaces
    {
        public const string Identifier = "https://steamcommunity.com/openid/id/";
        public const string LegacyIdentifier = "http://steamcommunity.com/openid/id/";
    }

    public static class Parameters
    {
        public const string Key = "key";
        public const string SteamId = "steamids";
        public const string Response = "response";
        public const string Players = "players";
        
        public const string ProfileUrl = "profileurl";
        public const string SteamName = "personaname";
        public const string Avatar = "avatar";
        public const string AvatarMedium = "avatarmedium";
        public const string AvatarFull = "avatarfull";
        public const string RealName = "realname";
        public const string TimeCreated = "timecreated";
        public const string LastLogoff = "lastlogoff";
    }
}