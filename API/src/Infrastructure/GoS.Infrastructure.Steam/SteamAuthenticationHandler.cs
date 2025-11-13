using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.Json;
using AspNet.Security.OpenId;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GoS.Infrastructure.Steam;

public class SteamAuthenticationHandler : OpenIdAuthenticationHandler<SteamAuthenticationOptions>
{
    public SteamAuthenticationHandler(
        IOptionsMonitor<SteamAuthenticationOptions> options, ILoggerFactory logger, UrlEncoder encoder)
        : base(options, logger, encoder)
    {
    }

    protected override async Task<AuthenticationTicket> CreateTicketAsync(ClaimsIdentity identity, AuthenticationProperties properties,
        string identifier, IReadOnlyDictionary<string, string> attributes)
    {
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, properties, Scheme.Name);

        // Return the authentication ticket as-is if the user information endpoint has not been set.
        if (string.IsNullOrEmpty(Options.UserInformationEndpoint))
        {
            LogSteam.NoUserInformationEndpoint(Logger);
            return await RunAuthenticatedEventAsync();
        }

        // Return the authentication ticket as-is if the application key has not been set.
        if (string.IsNullOrEmpty(Options.ApplicationKey))
        {
            LogSteam.NoApplicationKey(Logger);
            return await RunAuthenticatedEventAsync();
        }

        // Note: prior to April 2018, the Steam identifier was prefixed with an HTTP base address.
        // Since then, the prefix is now an HTTPS address. The following logic supports both prefixes.
        if (identifier.StartsWith(SteamAuthenticationConstants.Namespaces.Identifier, StringComparison.Ordinal))
        {
            identifier = identifier[SteamAuthenticationConstants.Namespaces.Identifier.Length..];
        }
        else if (identifier.StartsWith(SteamAuthenticationConstants.Namespaces.LegacyIdentifier, StringComparison.Ordinal))
        {
            identifier = identifier[SteamAuthenticationConstants.Namespaces.LegacyIdentifier.Length..];
        }
        else
        {
            LogSteam.InvalidIdentifier(Logger, identifier);

            throw new AuthenticationFailureException($"The OpenID claimed identifier '{identifier}' is not valid.");
        }

        identity.AddClaim(new Claim(SteamClaimTypes.SteamId64, identifier, ClaimValueTypes.String, Options.ClaimsIssuer));
        identity.AddClaim(new Claim(SteamClaimTypes.SteamId32, ConvertSteamIdTo32(identifier), ClaimValueTypes.String, Options.ClaimsIssuer));
        
        var address = QueryHelpers.AddQueryString(Options.UserInformationEndpoint, new Dictionary<string, string?>
        {
            [SteamAuthenticationConstants.Parameters.Key] = Options.ApplicationKey,
            [SteamAuthenticationConstants.Parameters.SteamId] = identifier
        });

        using var request = new HttpRequestMessage(HttpMethod.Get, address);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(OpenIdAuthenticationConstants.Media.Json));

        // Return the authentication ticket as-is if the userinfo request failed.
        using var response = await Options.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, Context.RequestAborted);
        if (!response.IsSuccessStatusCode)
        {
            LogSteam.UserInformationEndpointHttpError(
                Logger,
                response.StatusCode,
                response.Headers.ToString(),
                await response.Content.ReadAsStringAsync(Context.RequestAborted));

            throw new HttpRequestException("An error occurred while retrieving the user profile from Steam.");
        }

        using var payload = JsonDocument.Parse(await response.Content.ReadAsStringAsync(Context.RequestAborted));

        // Try to extract the profile name of the authenticated user.
        var profile = payload.RootElement
            .GetProperty(SteamAuthenticationConstants.Parameters.Response)
            .GetProperty(SteamAuthenticationConstants.Parameters.Players)
            .EnumerateArray()
            .FirstOrDefault();

        if (profile.ValueKind == JsonValueKind.Object)
        {
            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.SteamName, out var name) && name.ValueKind != JsonValueKind.Null)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.SteamName, name.GetString()!, ClaimValueTypes.String, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.ProfileUrl, out var profileUrl) && profileUrl.ValueKind != JsonValueKind.Null)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.ProfileUrl, profileUrl.GetString()!, ClaimValueTypes.String, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.Avatar, out var avatar) && avatar.ValueKind != JsonValueKind.Null)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.Avatar, avatar.GetString()!, ClaimValueTypes.String, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.AvatarMedium, out var avatarMedium) && avatarMedium.ValueKind != JsonValueKind.Null)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.AvatarMedium, avatarMedium.GetString()!, ClaimValueTypes.String, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.AvatarFull, out var avatarFull) && avatarFull.ValueKind != JsonValueKind.Null)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.AvatarFull, avatarFull.GetString()!, ClaimValueTypes.String, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.RealName, out var realName) && realName.ValueKind != JsonValueKind.Null)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.RealName, realName.GetString()!, ClaimValueTypes.String, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.TimeCreated, out var timeCreated) && timeCreated.ValueKind == JsonValueKind.Number)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.TimeCreated, timeCreated.GetInt64().ToString(), ClaimValueTypes.Integer64, Options.ClaimsIssuer));
            }

            if (profile.TryGetProperty(SteamAuthenticationConstants.Parameters.LastLogoff, out var lastLogoff) && lastLogoff.ValueKind == JsonValueKind.Number)
            {
                identity.AddClaim(new Claim(SteamClaimTypes.LastLogoff, lastLogoff.GetInt64().ToString(), ClaimValueTypes.Integer64, Options.ClaimsIssuer));
            }
        }

        return await RunAuthenticatedEventAsync(payload);

        async Task<AuthenticationTicket> RunAuthenticatedEventAsync(JsonDocument? user = null)
        {
            var context = new OpenIdAuthenticatedContext(Context, Scheme, Options, ticket)
            {
                UserPayload = user
            };

            // Copy the attributes to the context object.
            foreach (var attribute in attributes)
            {
                context.Attributes.Add(attribute);
            }

            await Events.Authenticated(context);

            // Note: return the authentication ticket associated
            // with the notification to allow replacing the ticket.
            return context.Ticket;
        }
    }
    
    private static string ConvertSteamIdTo32(string steamId64)
    {
        if (ulong.TryParse(steamId64, out var steamId))
        {
            var steamId32 = (steamId - 76561197960265728) & 0xFFFFFFFF;
            return steamId32.ToString();
        }

        return steamId64;
    }
}