using System.Text.Json;
using GoS.Application.Abstractions;
using GoS.Infrastructure.OptionsProvider.Extensions;

namespace GoS.Infrastructure.OptionsProvider;

internal sealed class SerializationOptionsProvider : ISerializationOptionsProvider
{
    public JsonSerializerOptions CreateJsonSerializerOptions()
    {
        var options = new JsonSerializerOptions(JsonSerializerOptions.Web);
        options.ConfigureGoSSerializerOptions();
        return options;
    }
}
