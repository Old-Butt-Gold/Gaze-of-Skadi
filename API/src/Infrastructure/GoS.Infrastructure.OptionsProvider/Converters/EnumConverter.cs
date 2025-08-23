using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GoS.Infrastructure.OptionsProvider.Converters;

internal sealed class EnumConverter<TEnum> : JsonConverter<TEnum> where TEnum : struct, Enum
{
    public override TEnum Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.String:
                {
                    var jsonValue = reader.GetString()!;

                    foreach (var member in typeof(TEnum).GetMembers(BindingFlags.Public | BindingFlags.Static))
                    {
                        var attr = member.GetCustomAttribute<JsonPropertyNameAttribute>();
                        if (attr != null && attr.Name.Equals(jsonValue, StringComparison.OrdinalIgnoreCase))
                        {
                            if (Enum.TryParse(member.Name, out TEnum result))
                                return result;
                        }
                    }

                    if (Enum.TryParse(jsonValue, true, out TEnum parsedResult))
                        return parsedResult;

                    throw new JsonException($"Unable to convert '{jsonValue}' to {typeof(TEnum).Name}.");
                }
            case JsonTokenType.Number when reader.TryGetInt32(out int intValue):
                {
                    if (Enum.IsDefined(typeof(TEnum), intValue))
                        return (TEnum)(object)intValue;

                    throw new JsonException($"Value {intValue} is not defined in {typeof(TEnum).Name}");
                }
            default:
                throw new JsonException($"Unexpected token type '{reader.TokenType}' for enum type {typeof(TEnum).Name}");
        }
    }

    public override void Write(Utf8JsonWriter writer, TEnum value, JsonSerializerOptions options)
    {
        var member = typeof(TEnum).GetMember(value.ToString())[0];
        var attr = member.GetCustomAttribute<JsonPropertyNameAttribute>();
        writer.WriteStringValue(attr?.Name ?? value.ToString());
    }
}
