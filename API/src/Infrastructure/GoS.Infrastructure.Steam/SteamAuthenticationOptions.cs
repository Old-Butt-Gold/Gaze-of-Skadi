using AspNet.Security.OpenId;

namespace GoS.Infrastructure.Steam;

public class SteamAuthenticationOptions : OpenIdAuthenticationOptions
{
    public SteamAuthenticationOptions()
    {
        Authority = new Uri(SteamAuthenticationDefaults.Authority);
        CallbackPath = SteamAuthenticationDefaults.CallbackPath;
    }

    /// <summary>
    /// Gets or sets the application key used to retrieve user details from Steam's API.
    /// </summary>
    public string? ApplicationKey { get; set; }

    /// <summary>
    /// Gets or sets the endpoint used to retrieve user details.
    /// </summary>
    public string UserInformationEndpoint { get; set; } = SteamAuthenticationDefaults.UserInformationEndpoint;
}