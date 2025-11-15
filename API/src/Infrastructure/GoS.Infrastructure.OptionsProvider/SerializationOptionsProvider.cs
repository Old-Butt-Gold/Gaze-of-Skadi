using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Application.Abstractions;
using GoS.Domain.Matches.Enums;
using GoS.Infrastructure.OptionsProvider.Converters;
using GoS.Infrastructure.OptionsProvider.Converters.Factories;

namespace GoS.Infrastructure.OptionsProvider;

internal sealed class SerializationOptionsProvider : ISerializationOptionsProvider
{
    public JsonSerializerOptions CreateJsonSerializerOptions() =>
        new(JsonSerializerOptions.Web)
        {
            Converters =
            {
                new SingleOrArrayConverter(), new BooleanStateConverter(),
                new JsonNumberEnumConverter<BarracksStatus>(), new JsonNumberEnumConverter<TowerStatus>(),
                new EnumListConverterFactory(), new EnumConverterFactory(), new EnumDictionaryConverterFactory(),
            },
            IncludeFields = true,
        };
}