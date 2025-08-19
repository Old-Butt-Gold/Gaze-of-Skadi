using Newtonsoft.Json;

namespace Tests.Extensions;

public static class ObjectExtensions
{
	public static string ToJsonString(this object obj)
	{
		return JsonConvert.SerializeObject(obj, Formatting.Indented);
	}
}