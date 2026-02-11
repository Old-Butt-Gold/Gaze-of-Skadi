using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Domain.Matches.Enums;
using GoS.Infrastructure.OptionsProvider.Converters;
using GoS.Infrastructure.OptionsProvider.Converters.Factories;

namespace GoS.Infrastructure.OptionsProvider.Extensions;

public static class JsonSerializerOptionsExtensions
{
    public static void ConfigureGoSSerializerOptions(this JsonSerializerOptions options)
    {
        options.Converters.Add(new SingleOrArrayConverter());
        options.Converters.Add(new BooleanStateConverter());
        options.Converters.Add(new JsonNumberEnumConverter<BarracksStatus>());
        options.Converters.Add(new JsonNumberEnumConverter<TowerStatus>());
        options.Converters.Add(new EnumListConverterFactory());
        options.Converters.Add(new EnumConverterFactory());
        options.Converters.Add(new EnumDictionaryConverterFactory());

        options.IncludeFields = true;
    }
}
