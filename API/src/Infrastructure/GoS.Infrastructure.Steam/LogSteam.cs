using System.Net;
using Microsoft.Extensions.Logging;

namespace GoS.Infrastructure.Steam;

public static partial class LogSteam
{
    [LoggerMessage(1, LogLevel.Information, "The userinfo request was skipped because no userinfo endpoint was configured.")]
    internal static partial void NoUserInformationEndpoint(ILogger logger);

    [LoggerMessage(2, LogLevel.Information, "The userinfo request was skipped because no application key was configured.")]
    internal static partial void NoApplicationKey(ILogger logger);

    [LoggerMessage(3, LogLevel.Warning, "The userinfo request was skipped because an invalid identifier was received: {Identifier}.")]
    internal static partial void InvalidIdentifier(ILogger logger, string identifier);

    [LoggerMessage(4, LogLevel.Warning, "The userinfo request failed because an invalid response was received: the identity provider " +
                                        "returned returned a {Status} response with the following payload: {Headers} {Body}.")]
    internal static partial void UserInformationEndpointHttpError(ILogger logger, HttpStatusCode status, string headers, string body);
}