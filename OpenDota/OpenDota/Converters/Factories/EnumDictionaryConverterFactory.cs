using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenDota.Converters.Factories;

public class EnumDictionaryConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert)
    {
        return typeToConvert.IsGenericType &&
               typeToConvert.GetGenericTypeDefinition() == typeof(Dictionary<,>) &&
               typeToConvert.GetGenericArguments()[0].IsEnum;
    }

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
    {
        var keyType = typeToConvert.GetGenericArguments()[0];
        var valueType = typeToConvert.GetGenericArguments()[1];

        var converterType = typeof(EnumDictionaryConverter<,>)
            .MakeGenericType(keyType, valueType);

        return (JsonConverter)Activator.CreateInstance(converterType)!;
    }
}
