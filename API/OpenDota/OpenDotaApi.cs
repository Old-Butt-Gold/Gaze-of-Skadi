using OpenDota.Routes.Common;
using OpenDota.Routes.Heroes;
using OpenDota.Routes.Matches;
using OpenDota.Routes.Players;
using OpenDota.Routes.Resources;
using OpenDota.Routes.Search;
using OpenDota.Routes.Teams;
using OpenDota.Utilities;

namespace OpenDota;

/// <inheritdoc />
public class OpenDotaApi : IOpenDotaApi
{

	/// <inheritdoc />
	public IResourceEndpoint Resource { get; }

    /// <inheritdoc />
    public ICommonEndpoint Common { get; set; }

	/// <inheritdoc />
	public IHeroesEndpoint Heroes { get; }

	/// <inheritdoc />
	public IMatchesEndpoint Matches { get; }

	/// <inheritdoc />
	public IPlayersEndpoint Players { get; }

	/// <inheritdoc />
	public ISearchEndpoint Search { get; }

	/// <inheritdoc />
	public ITeamsEndpoint Teams { get; }

	/// <summary>
	/// Creates new instance of <see cref="OpenDotaApi"/>
	/// </summary>
	/// <param name="configure">configuration action which will be applied to settings</param>
	public OpenDotaApi(Action<OpenDotaSettings>? configure = null)
	{
		var settings = new OpenDotaSettings();

		configure?.Invoke(settings);

		var request = new Requester(settings);

		Matches = new MatchesEndpoint(request);
		Players = new PlayersEndpoint(request);
        Common = new CommonEndpoint(request);
		Search = new SearchEndpoint(request);
		Heroes = new HeroesEndpoint(request);
		Teams = new TeamsEndpoint(request);
		Resource = new ResourceEndpoint();
	}
}
