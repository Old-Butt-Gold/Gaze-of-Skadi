using OpenDota.Routes.Common;
using OpenDota.Routes.Heroes;
using OpenDota.Routes.Matches;
using OpenDota.Routes.Players;
using OpenDota.Routes.Resources;
using OpenDota.Routes.Search;
using OpenDota.Routes.Teams;

namespace OpenDota;

/// <summary>
/// The OpenDota API provides Dota 2 related data including advanced match data extracted from match replays.
///
/// </summary>
/// <remarks>
/// Full documentation is available on <see href="https://docs.opendota.com/">OpenDota</see>.
/// You can find data that can be used to convert hero and ability IDs and other information provided by
/// the API from the <see href="https://github.com/odota/dotaconstants">Dota Constants</see> repository.
/// </remarks>
public interface IOpenDotaApi
{
    /// <inheritdoc cref="ICommonEndpoint" />
    ICommonEndpoint Common { get; set; }

	/// <inheritdoc cref="IResourceEndpoint" />
	IResourceEndpoint Resource { get; }

	/// <inheritdoc cref="IHeroesEndpoint" />
	IHeroesEndpoint Heroes { get; }

	/// <inheritdoc cref="IMatchesEndpoint" />
	IMatchesEndpoint Matches { get; }

	/// <inheritdoc cref="IPlayersEndpoint" />
	IPlayersEndpoint Players { get; }

	/// <inheritdoc cref="ISearchEndpoint" />
	ISearchEndpoint Search { get; }

	/// <inheritdoc cref="ITeamsEndpoint" />
	ITeamsEndpoint Teams { get; }
}
