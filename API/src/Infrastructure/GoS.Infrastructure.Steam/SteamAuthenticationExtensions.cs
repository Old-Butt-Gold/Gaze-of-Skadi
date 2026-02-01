using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace GoS.Infrastructure.Steam;

/// <summary>
/// Exposes convenient extensions that can be used to add an instance
/// of the Steam authentication middleware in an ASP.NET Core pipeline.
/// </summary>
public static class SteamAuthenticationExtensions
{
    /// <summary>
    /// Adds <see cref="SteamAuthenticationHandler"/> to the specified
    /// <see cref="AuthenticationBuilder"/>, which enables Steam authentication capabilities.
    /// </summary>
    /// <param name="builder">The authentication builder.</param>
    /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
    public static AuthenticationBuilder AddSteam(this AuthenticationBuilder builder)
        => builder.AddSteam(SteamAuthenticationDefaults.AuthenticationScheme, _ => { });

    /// <summary>
    /// Adds <see cref="SteamAuthenticationHandler"/> to the specified
    /// <see cref="AuthenticationBuilder"/>, which enables Steam authentication capabilities.
    /// </summary>
    /// <param name="builder">The authentication builder.</param>
    /// <param name="configuration">The delegate used to configure the OpenID 2.0 options.</param>
    /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
    public static AuthenticationBuilder AddSteam(
        this AuthenticationBuilder builder,
        Action<SteamAuthenticationOptions> configuration)
        => builder.AddSteam(SteamAuthenticationDefaults.AuthenticationScheme, configuration);

    /// <summary>
    /// Adds <see cref="SteamAuthenticationHandler"/> to the specified
    /// <see cref="AuthenticationBuilder"/>, which enables Steam authentication capabilities.
    /// </summary>
    /// <param name="builder">The authentication builder.</param>
    /// <param name="scheme">The authentication scheme associated with this instance.</param>
    /// <param name="configuration">The delegate used to configure the Steam options.</param>
    /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
    public static AuthenticationBuilder AddSteam(
        this AuthenticationBuilder builder, string scheme, Action<SteamAuthenticationOptions> configuration) =>
        builder.AddSteam(scheme, SteamAuthenticationDefaults.DisplayName, configuration);

    /// <summary>
    /// Adds <see cref="SteamAuthenticationHandler"/> to the specified
    /// <see cref="AuthenticationBuilder"/>, which enables Steam authentication capabilities.
    /// </summary>
    /// <param name="builder">The authentication builder.</param>
    /// <param name="scheme">The authentication scheme associated with this instance.</param>
    /// <param name="caption">The optional display name associated with this instance.</param>
    /// <param name="configuration">The delegate used to configure the Steam options.</param>
    /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
    public static AuthenticationBuilder AddSteam(
        this AuthenticationBuilder builder, string scheme, string caption,
        Action<SteamAuthenticationOptions> configuration) =>
        builder.AddOpenId<SteamAuthenticationOptions, SteamAuthenticationHandler>(scheme, caption, configuration);
}
