using System.Text;

namespace OpenDota.Extensions;

/// <summary>
/// Extension methods for <see cref="Enum"/>
/// </summary>
public static class EnumExtensions
{
    /// <summary>
    /// Converts enum to string snake_case.
    /// </summary>
    /// <param name="value">The enum value.</param>
    /// <returns>The snake_case string representation.</returns>
    public static string ToSnakeCase(this Enum value)
    {
        ArgumentNullException.ThrowIfNull(value);

        var str = value.ToString();
        if (str.Length == 0)
            return str;

        var sb = new StringBuilder();
        sb.Append(char.ToLowerInvariant(str[0]));

        for (var i = 1; i < str.Length; i++)
        {
            var current = str[i];
            var previous = str[i - 1];
            var next = i < str.Length - 1 ? str[i + 1] : '\0';

            if (char.IsUpper(current))
            {
                if (char.IsLower(previous) || (char.IsUpper(previous) && next != '\0' && char.IsLower(next)))
                {
                    sb.Append('_');
                }
                sb.Append(char.ToLowerInvariant(current));
            }
            else
            {
                sb.Append(current);
            }
        }

        return sb.ToString();
    }
}
