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
    private HashSet<string> _objectives = [];
    private HashSet<string> _validHeroNames = [];

    public async Task<MatchJournalDto?> Handle(GetMatchJournalByIdQuery request, CancellationToken ct)
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

        _objectives = objectives!.ToHashSet();

        return new MatchJournalDto
        {
            Objectives = MapObjectives(match.Objectives, match.Players),
            Buybacks = MapBuybacks(match.Players),
            Connections = MapConnections(match.Players),
            Kills = MapKills(match.Players),
            Runes = MapRunes(match.Players)
        };
    }

    private IEnumerable<ObjectiveEventDto> MapObjectives(IEnumerable<Objective> objectives, IReadOnlyList<MatchPlayer> players)
    {
        objectives = objectives.Where(x => x.Type != ObjectiveType.ChatMessageCourierLost);

        List<ObjectiveEventDto> objectiveEventDtos = [];
        foreach (var objective in objectives)
        {
            if (!objective.Time.HasValue) continue;

            if (objective.Type == ObjectiveType.BuildingKill)
            {
                var key = GetCleanedObjectiveKey(objective.Key?.GetRawText());
                if (key != null && _objectives.Contains(key))
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
                                PlayerIndex = playerIndex,
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
                            PlayerIndex = null,
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
                            PlayerIndex = playerIndex,
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
                            PlayerIndex = playerIndex,
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
                    PlayerIndex = null,
                    Target = null,
                    TargetTeam = null,
                });
            }
        }

        return objectiveEventDtos.OrderBy(x => x.Time);
    }

    private static string? GetCleanedObjectiveKey(string? rawKey) => rawKey?.Trim('"').Trim();

    private IEnumerable<BuybackEventDto> MapBuybacks(IReadOnlyList<MatchPlayer> players) =>
        players
            .SelectMany((player, index) => player.BuybackLogs.Select(log => new BuybackEventDto
            {
                Time = log.Time,
                PlayerIndex = index
            }))
            .OrderBy(x => x.Time);

    private IEnumerable<ConnectionEventDto> MapConnections(IReadOnlyList<MatchPlayer> players) =>
        players
            .SelectMany((player, index) => player.ConnectionLog.Select(log => new ConnectionEventDto
            {
                Time = log.Time,
                Event = mapper.Map<BaseEnumDto<ConnectionEvent>>(log.Event),
                PlayerIndex = index
            }))
            .OrderBy(x => x.Time);

    private IEnumerable<KillEventDto> MapKills(IReadOnlyList<MatchPlayer> players) =>
        players
            .SelectMany((player, index) => player.KillsLog
                .Where(kill => _validHeroNames.Contains(kill.Key))
                .Select(kill => new KillEventDto
                {
                    Time = kill.Time,
                    KillerIndex = index,
                    VictimHeroId = _heroNameToId[kill.Key]
                }))
            .OrderBy(x => x.Time);

    private IEnumerable<RuneEventDto> MapRunes(IReadOnlyList<MatchPlayer> players) =>
        players
            .SelectMany((player, index) => player.RuneLogs.Select(rune => new RuneEventDto
            {
                Time = rune.Time,
                Rune = mapper.Map<BaseEnumDto<Runes>>(rune.Key),
                PlayerIndex = index
            }))
            .OrderBy(x => x.Time);
}
