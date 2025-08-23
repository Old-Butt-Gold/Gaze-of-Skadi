using System.Text.Json;
using System.Text.Json.Serialization;
using GoS.Domain.Matches.Enums;
using OpenDota.Converters;
using OpenDota.Converters.Factories;

namespace OpenDota;

/// <summary>
/// Represents the OpenDot.NET settings.
/// </summary>
public sealed class OpenDotaSettings
{
	/// <summary>
	/// The OpenDot API key.
	/// </summary>
	public string? ApiKey { get; set; } = null;

	/// <summary>
	/// The JSON serializer options. If you want to use own options, set this property.
	/// </summary>
	public JsonSerializerOptions? JsonSerializerOptions { get; set; } = CreateJsonSerializerOptions();

	public static JsonSerializerOptions CreateJsonSerializerOptions()
	{
		return new(JsonSerializerOptions.Web)
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
}
