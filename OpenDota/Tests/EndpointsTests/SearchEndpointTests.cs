using OpenDota;
using Tests.Extensions;
using Xunit.Abstractions;

namespace Tests.EndpointsTests;

public class SearchEndpointTests(ITestOutputHelper testOutputHelper)
{
	private readonly OpenDotaApi _openDotaApi = new();

	[Fact]
	public async Task TestGetPlayersByName()
	{
		var result = await _openDotaApi.Search.GetPlayersByNameAsync("mind_control");
		testOutputHelper.WriteLine(result.ToJsonString());

		if (result != null)
		{
			Assert.Equal(50, result.Count);

			Assert.Contains(result, x => x.LastMatchTime > new DateTime(2000, 1, 1));

			Assert.True(result.TrueForAll(x => x.AccountId > 0));
			Assert.True(result.TrueForAll(x => x.Similarity > 0));
			Assert.True(result.TrueForAll(x => !x.LastMatchTime.HasValue || x.LastMatchTime > new DateTime(2000, 1, 1)));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.PersonaName)));
			Assert.True(result.TrueForAll(x => !string.IsNullOrWhiteSpace(x.AvatarFull?.ToString())));
		}
	}

    [Fact]
    public async Task TestGetProPlayers()
    {
        var result = await _openDotaApi.Search.GetProPlayersAsync();
        testOutputHelper.WriteLine(result.ToJsonString());

        if (result != null)
        {
            Assert.True(result.TrueForAll(x => x.AccountId > 0));
            Assert.True(result.Any(x => !string.IsNullOrWhiteSpace(x.Name)));
            Assert.True(result.Any(x => !string.IsNullOrWhiteSpace(x.SteamId)));
            Assert.True(result.Any(x => !string.IsNullOrWhiteSpace(x.PersonaName)));
        }
    }
}
