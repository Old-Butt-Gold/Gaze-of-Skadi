using System.Text.Json;
using System.Text.Json.Serialization;

namespace OpenDota.Converters.Factories;

public class EnumConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert)
    {
        return typeToConvert.IsEnum;
    }

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
    {
        Type enumType = typeToConvert.IsEnum
            ? typeToConvert
            : typeToConvert.GetGenericArguments()[0];

        Type converterType = typeof(EnumConverter<>).MakeGenericType(enumType);
        return (JsonConverter)Activator.CreateInstance(converterType)!;
    }
}
