using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenDota.Converters;

public class EnumDictionaryConverter<TEnum, TValue> : JsonConverter<Dictionary<TEnum, TValue>>
    where TEnum : struct, Enum
{
    private static readonly Dictionary<string, TEnum> _fromString;
    private static readonly Dictionary<TEnum, string> _toString;

    static EnumDictionaryConverter()
    {
        _fromString = new Dictionary<string, TEnum>(StringComparer.OrdinalIgnoreCase);
        _toString   = new Dictionary<TEnum, string>();

        var enumType = typeof(TEnum);
        foreach (var field in enumType.GetFields(BindingFlags.Public | BindingFlags.Static))
        {
            var enumValue = (TEnum)field.GetValue(null)!;
            var name = field.Name;

            _fromString[name] = enumValue;

            var jp = field.GetCustomAttribute<JsonPropertyNameAttribute>();
            if (jp != null && !string.IsNullOrWhiteSpace(jp.Name))
            {
                _fromString[jp.Name] = enumValue;
                _toString[enumValue]  = jp.Name;
            }
            else
            {
                _toString[enumValue]  = name;
            }
        }
    }

    public override Dictionary<TEnum, TValue> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
            throw new JsonException("Expected object start.");
        var result = new Dictionary<TEnum, TValue>();

        while (reader.Read())
        {
            if (reader.TokenType == JsonTokenType.EndObject)
                return result;

            if (reader.TokenType != JsonTokenType.PropertyName)
                continue;

            var keyText = reader.GetString()!;

            if (Enum.TryParse(keyText, ignoreCase: true, out TEnum enumValue))
            {
                reader.Read();
                var value = JsonSerializer.Deserialize<TValue>(ref reader, options)!;
                result.Add(enumValue, value);
                continue;
            }

            if (_fromString.TryGetValue(keyText, out var enumKey))
            {
                reader.Read();
                var value = JsonSerializer.Deserialize<TValue>(ref reader, options)!;
                result.Add(enumKey, value);
                continue;
            }

            throw new JsonException(
                $"Unknown key '{keyText}' for enum {typeof(TEnum).Name}. " +
                $"Supported names: {string.Join(", ", _fromString.Keys)}");
        }

        throw new JsonException("Incomplete JSON object for Dictionary<,>");
    }

    public override void Write(Utf8JsonWriter writer, Dictionary<TEnum, TValue> value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        foreach (var (enumKey, val) in value)
        {
            var propName = _toString.TryGetValue(enumKey, out var s)
                ? s
                : enumKey.ToString()!;
            writer.WritePropertyName(propName);
            JsonSerializer.Serialize(writer, val, options);
        }
        writer.WriteEndObject();
    }
}
