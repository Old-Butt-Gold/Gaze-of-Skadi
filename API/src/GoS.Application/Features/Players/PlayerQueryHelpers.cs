using GoS.Application.EndpointParameters;
using GoS.Domain.Extensions;

namespace GoS.Application.Features.Players;

internal static class PlayerQueryHelpers
{
    public static ICollection<KeyValuePair<string, string>>? BuildParameters(PlayerEndpointParameters? parameters)
    {
        if (parameters is null)
            return null;

        var args = new List<KeyValuePair<string, string>>();

        AddIfNotNull(args, "limit", parameters.Limit);
        AddIfNotNull(args, "offset", parameters.Offset);
        AddIfNotNull(args, "win", parameters.Win);
        AddIfNotNull(args, "patch", (int?)parameters.Patch);
        AddIfNotNull(args, "game_mode", (int?)parameters.GameMode);
        AddIfNotNull(args, "lobby_type", (int?)parameters.LobbyType);
        AddIfNotNull(args, "region", (int?)parameters.Region);
        AddIfNotNull(args, "date", parameters.Date);
        AddIfNotNull(args, "lane_role", (int?)parameters.LaneRole);
        AddIfNotNull(args, "hero_id", parameters.HeroId);
        AddIfNotNull(args, "is_radiant", parameters.IsRadiant);
        AddIfNotNull(args, "significant", 0);
        AddIfNotNull(args, "having", parameters.Having);
        AddIfNotNull(args, "party_size", parameters.PartySize);

        if (parameters.Sort.HasValue)
            args.Add(new KeyValuePair<string, string>("sort", parameters.Sort.ToSnakeCase()));

        AddListParameters(args, "with_hero_id", parameters.WithHeroIds);
        AddListParameters(args, "against_hero_id", parameters.AgainstHeroIds);
        AddListParameters(args, "project", parameters.Project);

        return args.Count == 0 ? null : args;
    }

    private static void AddIfNotNull(List<KeyValuePair<string, string>> list, string key, int? value)
    {
        if (value.HasValue)
            list.Add(new KeyValuePair<string, string>(key, value.Value.ToString()));
    }

    private static void AddListParameters<T>(List<KeyValuePair<string, string>> list, string key, IEnumerable<T>? values)
    {
        if (values is null) return;
        list.AddRange(values.Select(v => new KeyValuePair<string, string>(key, v?.ToString() ?? "")));
    }
}
