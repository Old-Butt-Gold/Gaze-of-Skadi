using GoS.Application.Abstractions;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchDamageById;

internal sealed class GetMatchDamageByIdHandler(ISender sender, IResourceManager resourceManager) 
    : IRequestHandler<GetMatchDamageByIdQuery, IEnumerable<PlayerDamageDto>?>
{
    private Dictionary<string, int> _heroNameToIdMap = new();
    private HashSet<string> _validHeroNames = [];
    private HashSet<string> _validAbilityKeys = [];
    private HashSet<string> _validItemKeys = [];

    public async Task<IEnumerable<PlayerDamageDto>?> Handle(GetMatchDamageByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        var heroes = await resourceManager.GetHeroInfosAsync();
        var abilities = await resourceManager.GetAbilitiesAsync();
        var items = await resourceManager.GetItemsAsync();

        _heroNameToIdMap = heroes!.ToDictionary(
            h => h.Value.Name,
            h => h.Value.Id
        );

        _validHeroNames = new HashSet<string>(_heroNameToIdMap.Keys);
        _validAbilityKeys = new HashSet<string>(abilities!.Keys);
        _validItemKeys = new HashSet<string>(items!.Keys);

        return match.Players.Select(MapPlayerDamage).ToList();
    }

    private PlayerDamageDto MapPlayerDamage(MatchPlayer player, int index) =>
        new()
        {
            PlayerIndex = index,
            KilledHeroes = MapKilledHeroes(player.KillsLog),
            KilledByHeroes = MapKilledByHeroes(player.KilledBy),
            DamageDealtToHeroes = MapHeroDamage(player.Damage),
            DamageTakenFromHeroes = MapHeroDamage(player.DamageTaken),
            DamageDealtByInflictor = MapDamageInflictors(player.DamageInflictor, player.DamageTargets),
            DamageTakenByInflictor = MapDamageTaken(player.DamageInflictorReceived)
        };

    private IEnumerable<HeroKillsDto> MapKilledHeroes(IEnumerable<KillLog>? killsLog)
    {
        if (killsLog == null) return [];

        var killCounts = new Dictionary<string, int>();

        foreach (var heroName in killsLog.Where(name => _validHeroNames.Contains(name.Key)))
        {
            killCounts.TryAdd(heroName.Key, 0);
            killCounts[heroName.Key] += 1;
        }

        return killCounts.Select(kvp => new HeroKillsDto
        {
            HeroId = _heroNameToIdMap[kvp.Key],
            Times = kvp.Value
        });
    }

    private IEnumerable<HeroKillsDto> MapKilledByHeroes(IDictionary<string, int>? killedBy)
    {
        if (killedBy == null) return [];

        return killedBy
            .Where(kvp => _validHeroNames.Contains(kvp.Key))
            .Select(kvp => new HeroKillsDto
            {
                HeroId = _heroNameToIdMap[kvp.Key],
                Times = kvp.Value
            });
    }

    private IEnumerable<HeroDamageDto> MapHeroDamage(IDictionary<string, int>? damageDictionary)
    {
        if (damageDictionary == null) return [];

        return damageDictionary
            .Where(kvp => _validHeroNames.Contains(kvp.Key))
            .Select(kvp => new HeroDamageDto
            {
                HeroId = _heroNameToIdMap[kvp.Key],
                Damage = kvp.Value
            });
    }

    private IEnumerable<DamageInflictorDto> MapDamageInflictors(Dictionary<string, int>? damageInflictors, Dictionary<string, Dictionary<string, int>>? damageTargets)
    {
        if (damageInflictors == null || damageTargets == null)
            return [];

        return damageInflictors
            .Where(inflictor => damageTargets.ContainsKey(inflictor.Key))
            .Select(inflictor =>
            {
                var targetBreakdown = damageTargets[inflictor.Key];
                var validBreakdown = targetBreakdown
                    .Where(target => _validHeroNames.Contains(target.Key))
                    .Select(target => new DamageBreakdownDto
                    {
                        TargetHeroId = _heroNameToIdMap[target.Key],
                        Damage = target.Value
                    })
                    .ToList();

                return new DamageInflictorDto
                {
                    InflictorKey = inflictor.Key,
                    TotalDamage = validBreakdown.Sum(b => b.Damage),
                    Breakdown = validBreakdown
                };
            }).ToList();
    }

    private IEnumerable<DamageSummaryDto> MapDamageTaken(IDictionary<string, int>? damageTaken)
    {
        if (damageTaken == null)
            return [];

        return damageTaken
            .Where(kvp => kvp.Key == "null" || _validAbilityKeys.Contains(kvp.Key) || _validItemKeys.Contains(kvp.Key))
            .Select(kvp => new DamageSummaryDto
            {
                InflictorKey = kvp.Key,
                TotalDamage = kvp.Value,
            }).ToList();
    }
}
