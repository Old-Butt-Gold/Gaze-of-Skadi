using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GoS.Application.Caching;

internal static class CacheKey
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    public static string Create(string prefix, object? args = null)
    {
        if (string.IsNullOrWhiteSpace(prefix)) throw new ArgumentNullException(nameof(prefix));

        if (args is null) return prefix;

        var json = JsonSerializer.Serialize(args, JsonOptions);
        ReadOnlySpan<byte> hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(json));
        var shortHash = Convert.ToHexString(hashBytes)[..32].ToLowerInvariant().AsSpan();

        return $"{prefix}:{shortHash}";
    }
}
