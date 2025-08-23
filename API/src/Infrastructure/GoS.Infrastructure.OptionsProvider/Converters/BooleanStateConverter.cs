using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Domain.BaseEnums;

namespace GoS.Infrastructure.OptionsProvider.Converters;

internal sealed class BooleanStateConverter : JsonConverter<BooleanState>
{
    public override BooleanState Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.True:
                return BooleanState.True;
            case JsonTokenType.False:
                return BooleanState.False;
            case JsonTokenType.Number:
            {
                var num = reader.GetInt16();
                return num switch
                {
                    1 => BooleanState.True,
                    0 => BooleanState.False,
                    _ => throw new JsonException($"Unrecognized boolean state '{num}'")
                };
            }
            case JsonTokenType.String:
            {
                var s = reader.GetString()!;
                return s.Trim().ToLowerInvariant() switch
                {
                    "yes" or "true" => BooleanState.True,
                    "no" or "false" => BooleanState.False,
                    _ => throw new JsonException($"Unrecognized boolean state '{s}'")
                };
            }
        }
        
        throw new JsonException($"Expected BooleanState, got {reader.TokenType}");
    }

    public override void Write(Utf8JsonWriter writer, BooleanState value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value == BooleanState.True ? "True" : "False");
    }
}