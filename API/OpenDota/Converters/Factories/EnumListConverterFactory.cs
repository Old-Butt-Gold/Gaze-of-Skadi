using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenDota.Converters.Factories;

public class EnumListConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert)
    {
        return typeToConvert.IsGenericType &&
               typeToConvert.GetGenericTypeDefinition() == typeof(List<>) &&
               typeToConvert.GetGenericArguments()[0].IsEnum;
    }

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
    {
        var enumType = typeToConvert.GetGenericArguments()[0];
        var converterType = typeof(EnumListConverter<>).MakeGenericType(enumType);
        return (JsonConverter)Activator.CreateInstance(converterType)!;
    }
}
