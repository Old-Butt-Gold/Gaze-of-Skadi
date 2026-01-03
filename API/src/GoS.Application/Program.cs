/*
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using GoS.Domain.Resources.Models.ItemColors;
using OpenDota;

var openDota = new OpenDotaApi();
// 8382164196
// 8382886087
// 8055485802
Console.WriteLine("Enter match id to parse: ");
var matchId = 8055485802;//long.Parse(Console.ReadLine());

var matchInfo = await openDota.Matches.GetMatchByIdAsync(matchId);

while (true)
{
    Console.Clear();
    Console.WriteLine("Choose option to write about: " +
                      "\n0 - Overview" +
                      "\n1 – Benchmarks" +
                      "\n2 – Perfomances" +
                      "\n3 – Laning" +
                      "\n4 – Damage" +
                      "\n5 – Earnings" +
                      "\n6 – Items" +
                      "\n7 – Graphics" +
                      "\n8 – Abilities" +
                      "\n9 – Objectives" +
                      "\n10 – Wards" +
                      "\n11 – Actions" +
                      "\n12 – Team Fights" +
                      "\n13 – Journal" +
                      "\n14 – Chat");

    var value = Console.ReadLine();

    switch (value)
    {
        case "0":
            await PrintOverviewInfo(matchInfo!);
            break;
        case "1":
            await PrintBenchmarksInfo(matchInfo!);
            break;
        case "2":
            await PrintPerfomances(matchInfo!);
            break;
        case "3":
            await PrintLaning(matchInfo!);
            break;
        case "4":
            await PrintDamage(matchInfo!);
            break;
        case "5":
            await PrintEarnings(matchInfo!);
            break;
        case "6":
            await PrintItems(matchInfo!);
            break;
        case "7":
            await PrintGraphics(matchInfo!);
            break;
        case "8":
            await PrintAbilities(matchInfo!);
            break;
        case "9":
            await PrintObjectives(matchInfo!);
            break;
        case "10":
            await PrintWards(matchInfo!);
            break;
        case "11":
            await PrintActions(matchInfo!);
            break;
        case "12":
            await PrintTeamFights(matchInfo!);
            break;
        case "13":
            await PrintJournal(matchInfo!);
            break;
        case "14":
            await PrintChat(matchInfo!);
            break;
    }

    Console.ReadKey();
}

static async Task PrintOverviewInfo(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var items = await openDota.Resource.GetItemsAsync();
    var itemIds = await openDota.Resource.GetItemIdsAsync();
    var abilities = await openDota.Resource.GetAbilitiesAsync();
    var abilityIds = await openDota.Resource.GetAbilityIdsAsync();

    Console.WriteLine($"Who won: {(match.RadiantWin == BooleanState.True ? "Radiant" : "Dire")}");
    Console.WriteLine($"Radiant stats: {match.RadiantScore}");
    Console.WriteLine($"Dire stats: {match.DireScore}");
    Console.WriteLine($"Game mode: {match.GameMode}");
    Console.WriteLine($"Duration: {GetTime(match.Duration)}");
    Console.WriteLine($"Ended: {GetTimeFromUnix(match.StartTime + match.Duration)}");
    Console.WriteLine($"Match Id: {match.MatchId}");
    Console.WriteLine($"Region: {match.Region}");
    Console.WriteLine($"Replay URL: {match.ReplayUrl}");

    Console.WriteLine("Picks & Bans:");

    foreach (var pickBan in match.PicksBans)
    {
        Console.WriteLine($"Pick {pickBan.Order + 1} - IsPicked: {pickBan.IsPick} - {pickBan.Team} - Hero name: {pickBan.HeroId.ToString()}");
    }

    Console.WriteLine("-----------------------------");

    Console.WriteLine("Radiant players info:");

    foreach (var player in match.Players)
    {
        if (player.IsRadiant == BooleanState.True)
        {
            Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");
            Console.WriteLine($"Player name: {(!string.IsNullOrEmpty(player.Personaname) ? player.Personaname : "Anonimous")}");
            Console.WriteLine($"Lane: {player.LaneRole}");
            Console.WriteLine($"Rank: {(player.RankTier is not null ? player.RankTier : "N/A")}");
            Console.WriteLine($"Level: {player.Level}");
            Console.WriteLine($"Kills: {player.Kills}");
            Console.WriteLine($"Deaths: {player.Deaths}");
            Console.WriteLine($"Assists: {player.Assists}");
            Console.WriteLine($"Killed Creeps: {player.LastHitsEachMinute.LastOrDefault()}");
            Console.WriteLine($"Denies: {player.Denies}");
            Console.WriteLine($"Networth: {player.NetWorth}");
            Console.WriteLine($"Gold per min: {player.GoldPerMin}");
            Console.WriteLine($"Xp per min: {player.XpPerMin}");
            Console.WriteLine($"Hero damage: {player.HeroDamage}");
            Console.WriteLine($"Tower damage: {player.TowerDamage}");
            Console.WriteLine($"Healing: {player.HeroHealing}");

            Console.WriteLine("Items: ");
            if (player.Item0 is not 0) Console.WriteLine($"Item 0: {items[itemIds[player.Item0.ToString()]].DisplayName} : {(player.FirstPurchaseTime.Count != 0 ? GetTime(player.FirstPurchaseTime[itemIds[player.Item0.ToString()]]) : "unknown time")}");
            if (player.Item1 is not 0) Console.WriteLine($"Item 1: {items[itemIds[player.Item1.ToString()]].DisplayName} : {(player.FirstPurchaseTime.Count != 0 ? GetTime(player.FirstPurchaseTime[itemIds[player.Item1.ToString()]]) : "unknown time")}");
            if (player.Item2 is not 0) Console.WriteLine($"Item 2: {items[itemIds[player.Item2.ToString()]].DisplayName} : {(player.FirstPurchaseTime.Count != 0 ? GetTime(player.FirstPurchaseTime[itemIds[player.Item2.ToString()]]) : "unknown time")}");
            if (player.Item3 is not 0) Console.WriteLine($"Item 3: {items[itemIds[player.Item3.ToString()]].DisplayName} : {(player.FirstPurchaseTime.Count != 0 ? GetTime(player.FirstPurchaseTime[itemIds[player.Item3.ToString()]]) : "unknown time")}");
            if (player.Item4 is not 0) Console.WriteLine($"Item 4: {items[itemIds[player.Item4.ToString()]].DisplayName} : {(player.FirstPurchaseTime.Count != 0 ? GetTime(player.FirstPurchaseTime[itemIds[player.Item4.ToString()]]) : "unknown time")}");
            if (player.Item5 is not 0) Console.WriteLine($"Item 5: {items[itemIds[player.Item5.ToString()]].DisplayName} : {(player.FirstPurchaseTime.Count != 0 ? GetTime(player.FirstPurchaseTime[itemIds[player.Item5.ToString()]]) : "unknown time")}");

            if (player.Backpack0 is not 0) Console.WriteLine($"Backpack 0: {items[itemIds[player.Backpack0.ToString()]].DisplayName} : {GetTime(player.FirstPurchaseTime[itemIds[player.Backpack0.ToString()]])}");
            if (player.Backpack1 is not 0) Console.WriteLine($"Backpack 1: {items[itemIds[player.Backpack1.ToString()]].DisplayName} : {GetTime(player.FirstPurchaseTime[itemIds[player.Backpack1.ToString()]])}");
            if (player.Backpack2 is not 0) Console.WriteLine($"Backpack 2: {items[itemIds[player.Backpack2.ToString()]].DisplayName} : {GetTime(player.FirstPurchaseTime[itemIds[player.Backpack2.ToString()]])}");
            if (player.ItemNeutral is not 0) Console.WriteLine($"Neutral item: {items[itemIds[player.ItemNeutral.ToString()]].DisplayName}");
            if (player.ItemNeutralAura is not null) Console.WriteLine($"Neutral aura: {items[itemIds[player.ItemNeutralAura.Value.ToString()]].DisplayName}");
        }

        Console.WriteLine("Ability upgrades: ");

        foreach (var abilityUpgrade in player.AbilityUpgradesArr)
        {
            Console.WriteLine(abilities[abilityIds[abilityUpgrade.ToString()]].DisplayName);
        }
        Console.WriteLine("Ability upgrades ended");

        Console.WriteLine();
    }

    int time = 0;
    foreach (var stat in match.RadiantGoldAdvantage)
    {
        Console.WriteLine($"Gold advantage {GetTime(time * 60)} - team: {(stat > 0 ? Team.Radiant : Team.Dire)} - {Math.Abs(stat)}");
        Console.WriteLine($"Xp advantage {GetTime(time * 60)} - team: {(match.RadiantXpAdvantage[time] > 0 ? Team.Radiant : Team.Dire)} - {Math.Abs(match.RadiantXpAdvantage[time])}");
        time++;
        Console.WriteLine();
    }
}

static async Task PrintWards(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();

    var visibilityNames = GetVisibilityNames();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        Console.WriteLine("Purchased: ");
        foreach (var item in player.Purchase.Where(x => visibilityNames.Contains(x.Key)))
        {
            Console.WriteLine(item.Key + " : " + item.Value);
        }

        Console.WriteLine("Used: ");
        foreach (var item in player.ItemUses.Where(x => visibilityNames.Contains(x.Key)))
        {
            Console.WriteLine(item.Key + " : " + item.Value);
        }

        Console.WriteLine("--------------------------------------------");
    }

    var groups = match.Players
        .SelectMany(p => p.ObsLog
            .Concat(p.ObsLeftLog)
            .Concat(p.SenLog)
            .Concat(p.SenLeftLog)
            .Select(w => new { Player = p, Log = w })
        ) // allWards
        .GroupBy(x => x.Log.Ehandle)
        .Select(g => new
        {
            Ehandle = g.Key,
            Entries = g.OrderBy(e => e.Log.Time).ToList(),
            FirstTime = g.Min(e => e.Log.Time)
        })
        .OrderBy(g => g.FirstTime)
        .ToList();

    Console.WriteLine("Type – Owner – Placement Start – Placement End – Duration – Destroyed by");

    foreach (var g in groups)
    {
        var entries = g.Entries;

        var placementEntry = entries.First(e => e.Log.Type is LogType.ObsLog or LogType.SenLog);
        var leftEntry = entries.FirstOrDefault(e => e.Log.Type is LogType.ObsLeftLog or LogType.SenLeftLog);

        var typeStr = placementEntry.Log.Type == LogType.SenLog
            ? "Sentry"
            : "Observer";

        // Владелец (имя героя если есть)
        var owner = "Unknown";
        var ownerPlayer = placementEntry.Player;

        var heroKey = ownerPlayer.HeroId.ToString();
        if (heroes != null && heroes.TryGetValue(heroKey, out var heroInfo) && !string.IsNullOrWhiteSpace(heroInfo.LocalizedName))
            owner = heroInfo.LocalizedName;

        string placementLocation = $"({placementEntry.Log.X:F0}, {placementEntry.Log.Y:F0})";

        string startTimeStr = GetTime(placementEntry.Log.Time).ToString();
        string endTimeStr = leftEntry != null ? GetTime(leftEntry.Log.Time).ToString() : string.Empty;

        string durationStr;
        if (leftEntry != null)
        {
            var seconds = leftEntry.Log.Time - placementEntry.Log.Time;
            if (seconds < 0) seconds = 0;
            durationStr = TimeSpan.FromSeconds(seconds).ToString();
        }
        else
        {
            var lastRecorded = match.Duration;
            var seconds = lastRecorded - placementEntry.Log.Time;
            if (seconds < 0) seconds = 0;
            durationStr = $"{TimeSpan.FromSeconds(seconds)} (recorded)";
        }

        var destroyedBy = "N/A";
        if (leftEntry != null)
        {
            var attacker = leftEntry.Log.AttackerName;
            if (!string.IsNullOrWhiteSpace(attacker))
                destroyedBy = attacker;
            else if (leftEntry.Log.EntityLeft == BooleanState.True)
                destroyedBy = "Expired / left";
        }

        Console.WriteLine($"{typeStr} – {owner} – {startTimeStr} – {endTimeStr} – {durationStr} – {destroyedBy} (loc: {placementLocation})");
    }
}

static HashSet<string> GetVisibilityNames()
{
    return ["ward_sentry", "ward_observer", "dust", "gem", "smoke_of_deceit"];
}

static TimeSpan GetTime(long time) => TimeSpan.FromSeconds(time);

static DateTime GetTimeFromUnix(long time)
{
    var dto = DateTimeOffset.FromUnixTimeSeconds(time);
    return dto.DateTime;
}
*/
