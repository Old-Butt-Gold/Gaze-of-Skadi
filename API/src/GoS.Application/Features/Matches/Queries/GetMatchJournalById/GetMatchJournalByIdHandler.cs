using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchJournalById;

internal sealed class GetMatchJournalByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager
) : IRequestHandler<GetMatchJournalByIdQuery, MatchJournalDto?>
{
    private Dictionary<string, int> _heroNameToId = [];
    private Dictionary<string, string> _objectiveKeyToName = [];
    private HashSet<string> _validHeroNames = [];

    public async Task<MatchJournalDto?> Handle(
        GetMatchJournalByIdQuery request,
        CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;
        
        var heroes = await resourceManager.GetHeroInfosAsync();
        var objectives = await resourceManager.GetObjectiveNamesAsync();
        
        _heroNameToId = heroes!.ToDictionary(
            h => h.Value.Name,
            h => h.Value.Id
        );
        
        _validHeroNames = new HashSet<string>(_heroNameToId.Keys);

        _objectiveKeyToName = objectives!.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value
        );

        return new MatchJournalDto
        {
            Objectives = MapObjectives(match.Objectives, match.Players),
            Buybacks = MapBuybacks(match.Players),
            Connections = MapConnections(match.Players),
            Kills = MapKills(match.Players),
            Runes = MapRunes(match.Players),
            TeamFights = MapTeamFights(match.Teamfights)
        };
    }

    private IEnumerable<ObjectiveEventDto> MapObjectives(IEnumerable<Objective> objectives, IReadOnlyList<MatchPlayer> players)
    {
        List<ObjectiveEventDto> objectiveEventDtos = [];
        foreach (var objective in objectives)
        {
            if (!objective.Time.HasValue) continue;

            if (objective.Type == ObjectiveType.BuildingKill)
            {
                var key = GetCleanedObjectiveKey(objective.Key?.GetRawText());
                if (key != null && _objectiveKeyToName.TryGetValue(key, out _))
                {
                    if (objective.Slot.HasValue)
                    {
                        var playerIndex = (int)objective.Slot.Value;
                        if (playerIndex >= 0 && playerIndex < players.Count)
                        {
                            var isRadiant = key.Contains("goodguys", StringComparison.OrdinalIgnoreCase);
                            objectiveEventDtos.Add(new()
                            {
                                Time = objective.Time.Value,
                                Type = mapper.Map<BaseEnumDto<ObjectiveType>>(objective.Type),
                                Player = mapper.Map<PlayerInfoDto>(players[playerIndex]),
                                Target = key,
                                TargetTeam = mapper.Map<BaseEnumDto<TeamEnum>>(isRadiant ? TeamEnum.Radiant : TeamEnum.Dire),
                            });
                        }
                    }
                    else
                    {
                        var isRadiant = key.Contains("goodguys", StringComparison.OrdinalIgnoreCase);
                        objectiveEventDtos.Add(new()
                        {
                            Time = objective.Time.Value,
                            Type = mapper.Map<BaseEnumDto<ObjectiveType>>(objective.Type),
                            Player = null,
                            Target = key,
                            TargetTeam = mapper.Map<BaseEnumDto<TeamEnum>>(isRadiant ? TeamEnum.Radiant : TeamEnum.Dire),
                        });
                    }
                }
            }
            else if (objective.Slot.HasValue)
            {
                var playerIndex = (int)objective.Slot.Value;
                if (playerIndex >= 0 && playerIndex < players.Count)
                {
                    var key = objective.Key?.GetRawText();
                    if (int.TryParse(key, out var victimIndex) && victimIndex >= 0 && victimIndex < players.Count)
                    {
                        objectiveEventDtos.Add(new ObjectiveEventDto
                        {
                            Time = objective.Time.Value,
                            Type = mapper.Map<BaseEnumDto<ObjectiveType>>(objective.Type),
                            Player = mapper.Map<PlayerInfoDto>(players[playerIndex]),
                            Target = players[victimIndex].HeroId.ToString(),
                            TargetTeam = null,
                        });
                    }
                    else
                    {
                        objectiveEventDtos.Add(new ObjectiveEventDto
                        {
                            Time = objective.Time.Value,
                            Type = mapper.Map<BaseEnumDto<ObjectiveType>>(objective.Type),
                            Player = mapper.Map<PlayerInfoDto>(players[playerIndex]),
                            Target = null,
                            TargetTeam = null,
                        });
                    }
                }
            }
            else
            {
                objectiveEventDtos.Add(new ObjectiveEventDto
                {
                    Time = objective.Time.Value,
                    Type = mapper.Map<BaseEnumDto<ObjectiveType>>(objective.Type),
                    Player = null,
                    Target = null,
                    TargetTeam = null,
                });
            }
        }

        return objectiveEventDtos.OrderBy(x => x.Time);
    }

    private static string? GetCleanedObjectiveKey(string? rawKey) => rawKey?.Trim('"').Trim();

    private IEnumerable<BuybackEventDto> MapBuybacks(IReadOnlyList<MatchPlayer> players) =>
        (from player in players from buyback in player.BuybackLogs select new BuybackEventDto
        {
            Time = buyback.Time,
            Player = mapper.Map<PlayerInfoDto>(player)
        }).OrderBy(x => x.Time);

    private IEnumerable<ConnectionEventDto> MapConnections(IReadOnlyList<MatchPlayer> players) =>
        (from player in players from connection in player.ConnectionLog select new ConnectionEventDto
        {
            Time = connection.Time,
            Event = mapper.Map<BaseEnumDto<ConnectionEvent>>(connection.Event),
            Player = mapper.Map<PlayerInfoDto>(player)
        }).OrderBy(x => x.Time);

    private IEnumerable<KillEventDto> MapKills(IReadOnlyList<MatchPlayer> players) =>
        (from player in players from kill in player.KillsLog where _validHeroNames.Contains(kill.Key) select new KillEventDto
        {
            Time = kill.Time,
            Killer = mapper.Map<PlayerInfoDto>(player),
            VictimHeroId = _heroNameToId[kill.Key]
        }).OrderBy(x => x.Time);

    private IEnumerable<RuneEventDto> MapRunes(IReadOnlyList<MatchPlayer> players) =>
        (from player in players from rune in player.RuneLogs select new RuneEventDto
        {
            Time = rune.Time,
            Rune = mapper.Map<BaseEnumDto<Runes>>(rune.Key),
            Player = mapper.Map<PlayerInfoDto>(player)
        }).OrderBy(x => x.Time);

    private IEnumerable<TeamFightEventDto> MapTeamFights(IEnumerable<Teamfight> teamfights) =>
        teamfights.Select(fight => new TeamFightEventDto
        {
            StartTime = fight.Start,
            EndTime = fight.End
        }).OrderBy(x => x.StartTime);
}