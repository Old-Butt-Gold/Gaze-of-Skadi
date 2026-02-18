using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchTeamfightsById;

internal sealed class GetMatchTeamfightsByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager
) : IRequestHandler<GetMatchTeamfightsByIdQuery, IEnumerable<TeamfightDetailedDto>?>
{
    private Dictionary<string, int> _heroNameToIdMap = [];
    private HashSet<string> _validHeroNames = [];
    private HashSet<string> _validAbilityKeys = [];

    public async Task<IEnumerable<TeamfightDetailedDto>?> Handle(GetMatchTeamfightsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        var heroes = await resourceManager.GetHeroInfosAsync();
        var abilities = await resourceManager.GetAbilitiesAsync();

        _heroNameToIdMap = heroes!.ToDictionary(
            h => h.Value.Name,
            h => h.Value.Id
        );

        _validHeroNames = new HashSet<string>(_heroNameToIdMap.Keys);
        _validAbilityKeys = new HashSet<string>(abilities!.Keys);

        return match.Teamfights.Select(tf => MapTeamfight(tf, match.Players)).ToList();
    }

    private TeamfightDetailedDto MapTeamfight(Teamfight fight, IReadOnlyList<MatchPlayer> allPlayers)
    {
        var radiantGold = 0L;
        var direGold = 0L;
        var radiantXp = 0L;
        var direXp = 0L;

        for (var i = 0; i < fight.Players.Count; i++)
        {
            var tfPlayer = fight.Players[i];
            var isRadiantSide = i < 5;

            if (isRadiantSide)
            {
                radiantGold += tfPlayer.GoldDelta;
                radiantXp += tfPlayer.XpDelta;
            }
            else
            {
                direGold += tfPlayer.GoldDelta;
                direXp += tfPlayer.XpDelta;
            }
        }

        var netGold = radiantGold - direGold;

        BaseEnumDto<TeamEnum> winner;

        switch (netGold)
        {
            case > 0:
                winner = mapper.Map<BaseEnumDto<TeamEnum>>(TeamEnum.Radiant);
                break;
            case < 0:
                winner = mapper.Map<BaseEnumDto<TeamEnum>>(TeamEnum.Dire);
                break;
            default:
            {
                var netXp = radiantXp - direXp;
                winner = netXp switch
                {
                    > 0 => mapper.Map<BaseEnumDto<TeamEnum>>(TeamEnum.Radiant),
                    <= 0 => mapper.Map<BaseEnumDto<TeamEnum>>(TeamEnum.Dire),
                };
                break;
            }
        }

        return new TeamfightDetailedDto
        {
            Start = fight.Start,
            End = fight.End,
            TotalDeaths = fight.Deaths,
            LastDeathTime = fight.LastDeath,
            Result = new TeamfightResultDto
            {
                Winner = winner,
                GoldAdvantage = Math.Abs(radiantGold - direGold),
                XpAdvantage = Math.Abs(radiantXp - direXp)
            },
            Players = fight.Players.Select((tfPlayer, index) => MapTeamfightPlayer(tfPlayer, allPlayers[index], index)),
        };
    }

    private TeamfightPlayerDto MapTeamfightPlayer(TeamfightPlayer playerState, MatchPlayer matchPlayer, int index) =>
        new()
        {
            PlayerIndex = index,
            WasDead = playerState.Deaths > 0,
            Damage = playerState.Damage,
            Healing = playerState.Healing,
            GoldDelta = playerState.GoldDelta,
            XpDelta = playerState.XpDelta,
            UsedBuyback = playerState.Buybacks > 0,
            AbilityUses = MapAbilityUses(playerState.AbilityUses),
            ItemUses = MapItemUses(playerState.ItemUses),
            KilledHeroes = MapKilledHeroes(playerState.Killed),
            DeathPositions = MapDeathPositions(playerState.DeathsPos)
        };

    private IEnumerable<AbilityUseDto> MapAbilityUses(IDictionary<string, int>? abilityUses)
    {
        if (abilityUses == null) return [];

        return abilityUses
            .Where(ability => _validAbilityKeys.Contains(ability.Key))
            .Select(ability => new AbilityUseDto
            {
                AbilityKey = ability.Key,
                Uses = ability.Value
            });
    }

    private IEnumerable<ItemUseDto> MapItemUses(IDictionary<string, long>? itemUses)
    {
        if (itemUses == null) return [];

        return itemUses.Select(item => new ItemUseDto
        {
            ItemKey = item.Key,
            Uses = item.Value
        });
    }

    private IEnumerable<KilledHeroDto> MapKilledHeroes(IDictionary<string, long>? killedHeroes)
    {
        if (killedHeroes == null) return [];

        return killedHeroes
            .Where(killed => _validHeroNames.Contains(killed.Key))
            .Select(killed => new KilledHeroDto
            {
                HeroId = _heroNameToIdMap[killed.Key],
                Times = killed.Value
            });
    }

    private IEnumerable<TeamfightPositionDto> MapDeathPositions(Dictionary<string, Dictionary<string, int>>? deathsPos)
    {
        if (deathsPos == null) return [];

        return deathsPos
            .SelectMany(xEntry => xEntry.Value
                .Select(yEntry => new TeamfightPositionDto
                {
                    X = (int)double.Parse(xEntry.Key, System.Globalization.CultureInfo.InvariantCulture),
                    Y = (int)double.Parse(yEntry.Key, System.Globalization.CultureInfo.InvariantCulture),
                    Count = yEntry.Value
                }));
    }
}
