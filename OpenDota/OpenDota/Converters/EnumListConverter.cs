using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenDota.Converters;

public class EnumListConverter<TEnum> : JsonConverter<List<TEnum>> where TEnum : struct, Enum
{
    public override List<TEnum> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var jsonValue = reader.GetString()!;
            var value = ParseEnumValue(jsonValue);
            return [value];
        }
        

        if (reader.TokenType != JsonTokenType.StartArray)
            throw new JsonException($"Expected array start but got {reader.TokenType}");

        var list = new List<TEnum>();
        
        while (reader.Read() && reader.TokenType != JsonTokenType.EndArray)
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.String:
                    {
                        var jsonValue = reader.GetString()!;
                        var value = ParseEnumValue(jsonValue);
                        list.Add(value);
                        break;
                    }
                case JsonTokenType.Number when reader.TryGetInt32(out int intValue):
                    {
                        if (Enum.IsDefined(typeof(TEnum), intValue))
                            list.Add((TEnum)(object)intValue);
                        else
                            throw new JsonException($"Value {intValue} is not defined in {typeof(TEnum).Name}");
                        break;
                    }
                default:
                    throw new JsonException($"Unexpected token type '{reader.TokenType}' in enum array");
            }
        }

        return list;
    }

    public override void Write(Utf8JsonWriter writer, List<TEnum> value, JsonSerializerOptions options)
    {
        writer.WriteStartArray();
        foreach (var item in value)
        {
            var member = typeof(TEnum).GetMember(item.ToString())[0];
            var attr = member.GetCustomAttribute<JsonPropertyNameAttribute>();
            writer.WriteStringValue(attr?.Name ?? item.ToString());
        }
        writer.WriteEndArray();
    }

    private static TEnum ParseEnumValue(string jsonValue)
    {
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

        throw new JsonException($"Unable to convert '{jsonValue}' to {typeof(TEnum).Name}");
    }
}