using System.Text.Json;

namespace GoS.Application.Abstractions;

public interface ISerializationOptionsProvider
{
    public JsonSerializerOptions CreateJsonSerializerOptions();
}