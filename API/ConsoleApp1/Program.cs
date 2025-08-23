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
        Console.WriteLine($"Pick {pickBan.Order + 1} - IsPicked: {pickBan.IsPick} - {pickBan.Team} - Hero name: {heroes[pickBan.HeroId.ToString()].LocalizedName}");
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

static async Task PrintBenchmarksInfo(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        var bench = player.Benchmarks;

        var benchmarkEntries = new (string Name, IDictionary<MatchPlayerBenchmarkEnum, double?>? Data)[]
        {
            (nameof(bench.GoldPerMin), bench.GoldPerMin),
            (nameof(bench.HeroDamagePerMin), bench.HeroDamagePerMin),
            (nameof(bench.HeroHealingPerMin), bench.HeroHealingPerMin),
            (nameof(bench.KillsPerMin), bench.KillsPerMin),
            (nameof(bench.LastHitsPerMin), bench.LastHitsPerMin),
            (nameof(bench.StunsPerMin), bench.StunsPerMin),
            (nameof(bench.TowerDamage), bench.TowerDamage),
            (nameof(bench.XpPerMin), bench.XpPerMin),
        };

        foreach (var (name, data) in benchmarkEntries)
        {
            var rawValue = data != null && data.TryGetValue(MatchPlayerBenchmarkEnum.Raw, out var raw)
                ? raw.ToString()
                : "N/A";

            var pctValue = data != null && data.TryGetValue(MatchPlayerBenchmarkEnum.Percentage, out var pct)
                ? pct.ToString()
                : "N/A";

            Console.WriteLine($"{name} — {MatchPlayerBenchmarkEnum.Raw} – {rawValue} : {MatchPlayerBenchmarkEnum.Percentage} – {pctValue}");
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintPerfomances(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");
        Console.WriteLine($"Kills in a row: {player.MultiKills.Keys.Max()}"); // убийств подряд
        Console.WriteLine($"A series of kills: {player.KillStreaks.Keys.Max()}");
        Console.WriteLine($"Stuns duration: {player.Stuns}");
        Console.WriteLine($"Stacks: {player.CampsStacked}");
        Console.WriteLine($"Dead: {GetTime(player.LifeStateDead)}");
        Console.WriteLine($"Buybacks: {player.BuybackCount}");
        Console.WriteLine($"Max hero hit: {player.MaxHeroHit.Inflictor ?? "Auto-attack"} – {heroes.First(x => x.Value.Name == player.MaxHeroHit.Key).Value.LocalizedName} – {player.MaxHeroHit.Value}");
        Console.WriteLine($"Pings: {player.Pings}"); // Сигналок на карте
        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintLaning(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");
        Console.WriteLine($"Lane: {player.LaneRole}");
        Console.WriteLine($"Lane efficiency in 10 minutes: {player.LaneEfficiency}");
        Console.WriteLine($"Killed creeps in 10 minutes: {player.LastHitsEachMinute[10]}");
        Console.WriteLine($"Killed creeps in 10 minutes: {player.DeniesAtDifferentTimes[10]}");

        Console.WriteLine($"Last Hits + Denies");
        for (int i = 0; i < player.LastHitsEachMinute.Count; i++)
        {
            Console.WriteLine(
                $"Time: {GetTime(i * 60)} – {player.LastHitsEachMinute[i] + player.DeniesAtDifferentTimes[i]}");
        }

        Console.WriteLine("Lane position distribution:");

        foreach (var xEntry in player.LanePos)
        {
            var xKey = xEntry.Key;
            var yDict = xEntry.Value;

            foreach (var yEntry in yDict)
            {
                Console.WriteLine($"Position [{xKey}, {yEntry.Key}] – {yEntry.Value}");
            }
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintDamage(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var abilities = await openDota.Resource.GetAbilitiesAsync();
    var items = await openDota.Resource.GetItemsAsync();
    var namesSet = heroes.Select(x => x.Value.Name).ToHashSet();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");
        Console.WriteLine("\nKilled:");
        var killDict = new Dictionary<string, int>();
        foreach (var kill in player.KillsLog)
        {
            killDict.TryAdd(kill.Key, 0);
            killDict[kill.Key]++;
        }

        foreach (var kill in killDict)
        {
            Console.WriteLine($"{heroes.First(x => x.Value.Name == kill.Key).Value.LocalizedName} – {kill.Value}");
        }

        Console.WriteLine("\nKilled By: ");
        foreach (var killedBy in player.KilledBy)
        {
            Console.WriteLine($"{heroes.First(x => x.Value.Name == killedBy.Key).Value.LocalizedName} – {killedBy.Value}");
        }

        Console.WriteLine("\nDamage Dealt:");
        foreach (var damage in player.Damage.Where(damage => namesSet.Contains(damage.Key)))
        {
            Console.WriteLine($"{heroes.First(x => x.Value.Name == damage.Key).Value.LocalizedName} – {damage.Value}");
        }

        Console.WriteLine("\nDamage Taken:");
        foreach (var damageTaken in player.DamageTaken.Where(damage => namesSet.Contains(damage.Key)))
        {
            Console.WriteLine($"{heroes.First(x => x.Value.Name == damageTaken.Key).Value.LocalizedName} – {damageTaken.Value}");
        }

        Console.WriteLine("\nDamage Dealt Description: ");
        foreach (var damage in player.DamageInflictor)
        {
            var description = player.DamageTargets[damage.Key];
            Console.WriteLine($"{damage.Key} – {description.Values.Sum()}");
            foreach (var desc in description)
            {
                Console.WriteLine($"{heroes.First(x => x.Value.Name == desc.Key).Value.LocalizedName} – {desc.Value}");
            }

            Console.WriteLine();
        }

        Console.WriteLine("\nDamage Taken Description");
        foreach (var damageTaken in player.DamageInflictorReceived)
        {
            if (damageTaken.Key is "null")
            {
                Console.WriteLine($"Auto-attack : {damageTaken.Value}");
            }
            else
            {
                if (abilities.TryGetValue(damageTaken.Key, out var ability))
                {
                    Console.WriteLine($"{ability.DisplayName} – {damageTaken.Value}");
                }

                if (items.TryGetValue(damageTaken.Key, out var item))
                {
                    Console.WriteLine($"{item.DisplayName} – {damageTaken.Value}");
                }
            }
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintEarnings(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");
        Console.WriteLine($"Heroes killed: {player.Kills}");
        Console.WriteLine($"Lane Creeps killed: {player.LaneKills}");
        Console.WriteLine($"Neutral Creeps killed: {player.NeutralKills}");
        Console.WriteLine($"Ancient Creeps killed: {player.AncientKills}");
        Console.WriteLine($"Towers killed: {player.TowerKills}");
        Console.WriteLine($"Couriers killed: {player.CourierKills}");
        Console.WriteLine($"Roshan killed: {player.RoshanKills}");
        Console.WriteLine($"Observer killed: {player.ObserverKills}");
        Console.WriteLine($"Roshan killed: {player.RoshanKills}");

        Console.WriteLine("Creeps last hits in minutes:");
        Console.WriteLine($"5 min: {player.LastHitsEachMinute[5]}");
        Console.WriteLine($"10 min: {player.LastHitsEachMinute[10]}");
        Console.WriteLine($"15 min: {player.LastHitsEachMinute[15]}");
        Console.WriteLine($"20 min: {player.LastHitsEachMinute[20]}");

        Console.WriteLine("\nGold incomes:");
        foreach (var gold in player.GoldReasons)
        {
            Console.WriteLine(gold.Key + " : " + gold.Value);
        }

        Console.WriteLine("\nXp incomes:");
        foreach (var xp in player.XpReasons)
        {
            Console.WriteLine(xp.Key + " : " + xp.Value);
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintItems(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var items = await openDota.Resource.GetItemsAsync();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        foreach (var it in player.PurchaseLog)
        {
            var item = items[it.Key];
            if (item.Quality is ItemType.Consumable)
            {
                Console.WriteLine($"{item.Quality} {item.DisplayName} : {GetTime(it.Time)}");
            }
            else
            {
                Console.WriteLine(item.DisplayName + " : " + GetTime(it.Time));
            }

        }
        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintGraphics(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();

    var objective = match.Objectives.FirstOrDefault(x => x.Type == ObjectiveType.ChatMessageFirstBlood);

    if (objective is { Slot: not null })
    {
        var index = ((int?)objective.Slot).Value;
        var key = objective.Key?.GetRawText();
        if (int.TryParse(key, out var heroIndex))
        {
            var player = match.Players[heroIndex];
            var heroName = heroes[player.HeroId.ToString()].LocalizedName;
            Console.WriteLine($"{GetTime(objective.Time.Value)} – {objective.Type} – {heroes[match.Players[index].HeroId.ToString()].LocalizedName} -> {heroName}");
        }
        else
        {
            Console.WriteLine($"{GetTime(objective.Time.Value)} – {objective.Type} – {heroes[match.Players[index].HeroId.ToString()].LocalizedName}");
        }
    }

    foreach (var fight in match.Teamfights)
    {
        Console.WriteLine($"{nameof(fight.Start)} – {fight.Start}");
        Console.WriteLine($"{nameof(fight.End)} – {fight.End}");

        for (int i = 0; i < fight.Players.Count; i++)
        {
            var heroState = fight.Players[i];

            Console.WriteLine($"Hero: {heroes[match.Players[i].HeroId.ToString()].LocalizedName}");
            Console.WriteLine($"{nameof(heroState.GoldDelta)} – {heroState.GoldDelta}");
            Console.WriteLine($"WasDead: {heroState.Deaths > 0}");
            Console.WriteLine();
        }
    }

    int time = 0;
    foreach (var stat in match.RadiantGoldAdvantage)
    {
        Console.WriteLine($"Gold advantage {GetTime(time * 60)} - team: {(stat > 0 ? Team.Radiant : Team.Dire)} - {Math.Abs(stat)}");
        Console.WriteLine($"Xp advantage {GetTime(time * 60)} - team: {(match.RadiantXpAdvantage[time] > 0 ? Team.Radiant : Team.Dire)} - {Math.Abs(match.RadiantXpAdvantage[time])}");
        time++;
        Console.WriteLine();
    }

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        Console.WriteLine("Gold: ");

        for (int i = 0; i < player.GoldEachMinute.Count; i++)
        {
            Console.WriteLine($"Time: {GetTime(i * 60)} – {player.GoldEachMinute[i]}");
        }

        Console.WriteLine("XP: ");
        for (int i = 0; i < player.XpEachMinute.Count; i++)
        {
            Console.WriteLine($"Time: {GetTime(i * 60)} – {player.XpEachMinute[i]}");
        }

        Console.WriteLine("Last Hits: ");
        for (int i = 0; i < player.LastHitsEachMinute.Count; i++)
        {
            Console.WriteLine($"Time: {GetTime(i * 60)} – {player.LastHitsEachMinute[i]}");
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintAbilities(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var abilities = await openDota.Resource.GetAbilitiesAsync()!;

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        Console.WriteLine($"Abilities: ");
        foreach (var item in player.AbilityUses)
        {
            if (abilities.TryGetValue(item.Key, out var ability))
            {
                Console.WriteLine($"Abilities used: {ability.DisplayName} — {item.Value}");
            }

            if (player.AbilityTargets.TryGetValue(item.Key, out var target))
            {
                foreach (var keyValue in target)
                {
                    Console.WriteLine($"Hero: {keyValue.Key} : {keyValue.Value}");
                }
            }
        }

        foreach (var item in player.ItemUses)
        {
            Console.WriteLine(item.Key + " : " + item.Value);
        }

        foreach (var heroHit in player.HeroHits)
        {
            Console.WriteLine($"{heroHit.Key} : {heroHit.Value}");
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintObjectives(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var objectives = await openDota.Resource.GetObjectiveNamesAsync();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        foreach (var damage in player.Damage)
        {
            if (objectives.TryGetValue(damage.Key, out var objective))
            {
                Console.WriteLine($"{objective} – {damage.Value}");
            }
        }

        foreach (var rune in player.Runes)
        {
            Console.WriteLine($"{rune.Key} – {rune.Value}");
        }

        Console.WriteLine("--------------------------------------------");
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

static async Task PrintActions(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();

    foreach (var player in match.Players)
    {
        Console.WriteLine($"Hero: {heroes[player.HeroId.ToString()].LocalizedName}");

        foreach (var action in player.Actions)
        {
            Console.WriteLine(action.Key + " : " + action.Value);
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintTeamFights(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var abilities = await openDota.Resource.GetAbilitiesAsync();
    var namesDictionary = heroes.Select(x => new
    {
        x.Value.Name,
        x.Value.LocalizedName,
    }).ToDictionary(x => x.Name);

    foreach (var fight in match.Teamfights)
    {
        Console.WriteLine($"Start: {GetTime(fight.Start)}");
        Console.WriteLine($"End: {GetTime(fight.End)}");
        Console.WriteLine($"Deaths: {fight.Deaths}");
        Console.WriteLine($"Last Death: {GetTime(fight.LastDeath)}");

        long radiantGold = 0;
        long direGold = 0;
        long direXp = 0;
        long radiantXp = 0;

        for (var i = 0; i < fight.Players.Count; i++)
        {
            var tfPlayer = fight.Players[i];

            var isRadiantSide = i < 5;
            if (isRadiantSide) { radiantGold += tfPlayer.GoldDelta; radiantXp += tfPlayer.XpDelta; }
            else { direGold += tfPlayer.GoldDelta; direXp += tfPlayer.XpDelta; }
        }

        string winner;
        var netGold = radiantGold - direGold;
        switch (netGold)
        {
            case > 0:
                winner = "Radiant (gold advantage)";
                break;
            case < 0:
                winner = "Dire (gold advantage)";
                break;
            default:
                {
                    var netXp = radiantXp - direXp;
                    winner = netXp switch
                    {
                        > 0 => "Radiant (xp advantage)",
                        < 0 => "Dire (xp advantage)",
                        _ => "Tie"
                    };
                    break;
                }
        }

        Console.WriteLine($"Winner: {winner} – Gold={Math.Abs(radiantGold - direGold)}, Xp={Math.Abs(radiantXp - direXp)}");
        Console.WriteLine();

        for (int i = 0; i < fight.Players.Count; i++)
        {
            var player = fight.Players[i];
            Console.WriteLine($"Hero: {heroes[match.Players[i].HeroId.ToString()].LocalizedName}");
            Console.WriteLine($"Was dead: {player.Deaths > 0}");
            Console.WriteLine($"Damage: {player.Damage}");
            Console.WriteLine($"Healed total: {player.Healing}");
            Console.WriteLine($"Gold Delta: {player.GoldDelta}");
            Console.WriteLine($"XP Delta: {player.XpDelta}");
            Console.WriteLine($"Buybacks: {player.Buybacks > 0}");
            Console.WriteLine("Abilities: ");
            foreach (var item in player.AbilityUses)
            {
                if (abilities.TryGetValue(item.Key, out var ability))
                {
                    Console.WriteLine($"Abilities used: {ability.DisplayName} — {item.Value}");
                }
            }

            Console.WriteLine("Items: ");
            foreach (var item in player.ItemUses)
            {
                Console.WriteLine(item.Key + " : " + item.Value);
            }

            Console.WriteLine("Killed");
            foreach (var killed in player.Killed)
            {
                Console.WriteLine(namesDictionary[killed.Key].LocalizedName + " : " + killed.Value);
            }

            Console.WriteLine($"Deaths POS: ");
            foreach (var xEntry in player.DeathsPos)
            {
                var xKey = xEntry.Key;
                var yDict = xEntry.Value;

                foreach (var yEntry in yDict)
                {
                    Console.WriteLine($"Position [{xKey}, {yEntry.Key}] – {yEntry.Value}");
                }
            }

            Console.WriteLine("-----------------------------");
        }

        Console.WriteLine("--------------------------------------------");
    }
}

static async Task PrintJournal(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var objectives = await openDota.Resource.GetObjectiveNamesAsync();
    var namesDictionary = heroes.Select(x => new
    {
        x.Value.Name,
        x.Value.LocalizedName,
    }).ToDictionary(x => x.Name);

    foreach (var objective in match.Objectives)
    {
        if (objective.Type == ObjectiveType.BuildingKill)
        {
            var key = objective.Key?.GetRawText().Trim('\"');
            if (key != null && objectives!.TryGetValue(key, out var objectiveName))
            {
                if (objective.Slot != null)
                {
                    var index = ((int?)objective.Slot).Value;
                    Console.WriteLine(
                        $"{GetTime(objective.Time.Value)} – {objectiveName} – {objective.Type} – {heroes[match.Players[index].HeroId.ToString()].LocalizedName}");
                }
                else
                {
                    var isRadiant = key.Contains("goodguys");

                    Console.WriteLine($"{GetTime(objective.Time.Value)} – {objectiveName} – {objective.Type} – {(isRadiant ? "Dire creeps" : "Radiant creeps")}");
                }
            }
        }
        if (objective.Slot != null)
        {
            var index = ((int?)objective.Slot).Value;
            var key = objective.Key?.GetRawText();
            if (int.TryParse(key, out var heroIndex))
            {
                var player = match.Players[heroIndex];
                var heroName = heroes[player.HeroId.ToString()].LocalizedName;
                Console.WriteLine($"{GetTime(objective.Time.Value)} – {objective.Type} – {heroes[match.Players[index].HeroId.ToString()].LocalizedName} -> {heroName}");
            }
            else
            {
                Console.WriteLine($"{GetTime(objective.Time.Value)} – {objective.Type} – {heroes[match.Players[index].HeroId.ToString()].LocalizedName}");
            }
        }
        else
        {
            Console.WriteLine($"{GetTime(objective.Time.Value)} – {objective.Type}");
        }
    }

    var buybackLogs = match.Players.SelectMany(p => p.BuybackLogs
            .Select(x => new { Player = p, Buyback = x}));

    foreach (var buyback in buybackLogs)
    {
        Console.WriteLine($"{GetTime(buyback.Buyback.Time)} – {heroes[buyback.Player.HeroId.ToString()]}");
    }

    var connectionLogs = match.Players.SelectMany(p => p.ConnectionLog
        .Select(x => new { Player = p, Connection = x}));

    foreach (var connection in connectionLogs)
    {
        Console.WriteLine($"{GetTime(connection.Connection.Time)} – {connection.Connection.Event} – {heroes[connection.Player.HeroId.ToString()].LocalizedName}");
    }

    var killsLogs = match.Players.SelectMany(p => p.KillsLog
        .Select(x => new { Player = p, Kills = x}));

    foreach (var kill in killsLogs)
    {
        Console.WriteLine($"{GetTime(kill.Kills.Time)} – {namesDictionary[kill.Kills.Key].LocalizedName} killed by {heroes[kill.Player.HeroId.ToString()].LocalizedName}");
    }

    var runeLogs = match.Players.SelectMany(p => p.RuneLogs
        .Select(x => new { Player = p, Runes = x}));

    foreach (var rune in runeLogs)
    {
        Console.WriteLine($"{GetTime(rune.Runes.Time)} – {rune.Runes.Key} – {heroes[rune.Player.HeroId.ToString()].LocalizedName}");
    }

    var teamFightLogs = match.Teamfights.Select(x => new { x.Start, x.End });

    foreach (var teamFight in teamFightLogs)
    {
        Console.WriteLine($"{GetTime(teamFight.Start)} – Started team fight");
        Console.WriteLine($"{GetTime(teamFight.End)} – Ended team fight");
    }
}

static async Task PrintChat(Match match)
{
    var openDota = new OpenDotaApi();
    var heroes = await openDota.Resource.GetHeroInfosAsync();
    var chatResources = await openDota.Resource.GetChatWheelsAsync();

    foreach (var chat in match.Chat)
    {
        if (chat.Type == ChatType.Chat)
        {
            var player = match.Players[(int)chat.Slot];
            Console.WriteLine($"{GetTime(chat.Time)} [ALL] {heroes[player.HeroId.ToString()].LocalizedName} {chat.Key}");
        }

        if (chat.Type == ChatType.ChatWheel)
        {
            var player = match.Players[(int)chat.Slot];
            if (chatResources.TryGetValue(chat.Key, out var resource))
            {
                if (resource.SoundExtension != null)
                {
                    Console.WriteLine($"{GetTime(chat.Time)} Sound [ALL] {heroes[player.HeroId.ToString()].LocalizedName} >>> {resource.Message}:{resource.Url}");
                }

                if (resource.Image != null)
                {
                    Console.WriteLine($"{GetTime(chat.Time)} Spray [ALL] {heroes[player.HeroId.ToString()].LocalizedName} >>> {resource.Image}");
                }

                if (resource.Message != null)
                {
                    Console.WriteLine($"{GetTime(chat.Time)} [ALL] {heroes[player.HeroId.ToString()].LocalizedName} >>> {resource.Message}");
                }
            }
        }

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
