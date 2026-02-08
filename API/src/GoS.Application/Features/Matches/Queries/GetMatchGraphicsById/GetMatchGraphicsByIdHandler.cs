using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Application.Features.Matches.Queries.GetMatchOverviewById;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchGraphicsById;

internal sealed class GetMatchGraphicsByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchGraphicsByIdQuery, MatchGraphicsDto?>
{
    public async Task<MatchGraphicsDto?> Handle(
        GetMatchGraphicsByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        return new MatchGraphicsDto
        {
            Objectives = MapObjectives(match),
            Teamfights = MapTeamfights(match),
            TeamAdvantages = MapTeamAdvantages(match),
            PlayerGraphs = MapPlayerGraphs(match.Players)
        };
    }

    private IEnumerable<ObjectiveDto> MapObjectives(Match match)
    {
        var objectives = new List<ObjectiveDto>();

        var firstBlood = match.Objectives
            .FirstOrDefault(o => o.Type == ObjectiveType.ChatMessageFirstBlood);

        if (firstBlood?.Slot is not null && firstBlood.Time.HasValue)
        {
            var killerIndex = (int)firstBlood.Slot;
            PlayerInfoDto? victimPlayer = null;

            if (int.TryParse(firstBlood.Key?.GetRawText().Trim('"'), out var victimIndex) &&
                victimIndex >= 0 && victimIndex < match.Players.Count)
            {
                victimPlayer = mapper.Map<PlayerInfoDto>(match.Players[victimIndex]);
            }

            objectives.Add(new ObjectiveDto
            {
                Time = firstBlood.Time.Value,
                Type = mapper.Map<BaseEnumDto<ObjectiveType>>(firstBlood.Type),
                KillerPlayer = killerIndex >= 0 && killerIndex < match.Players.Count
                    ? mapper.Map<PlayerInfoDto>(match.Players[killerIndex])
                    : null,
                VictimPlayer = victimPlayer
            });
        }

        var roshanKills = match.Objectives
            .Where(o => o is { Type: ObjectiveType.ChatMessageRoshanKill, Time: not null });

        objectives.AddRange(roshanKills.Select(roshanKill => new ObjectiveDto
        {
            Time = roshanKill.Time!.Value,
            Type = mapper.Map<BaseEnumDto<ObjectiveType>>(roshanKill.Type),
            KillerPlayer = null,
            VictimPlayer = null
        }));

        var tormentorKills = match.Objectives
            .Where(x => x is { Type: ObjectiveType.ChatMessageTormentorKill, Time: not null, Slot: not null });

        objectives.AddRange(tormentorKills.Select(tormentorKill =>
        {
            var killerIndex = (int)tormentorKill.Slot!;

            return new ObjectiveDto
            {
                Time = tormentorKill.Time!.Value,
                Type = mapper.Map<BaseEnumDto<ObjectiveType>>(tormentorKill.Type),
                KillerPlayer = killerIndex >= 0 && killerIndex < match.Players.Count
                    ? mapper.Map<PlayerInfoDto>(match.Players[killerIndex])
                    : null,
                VictimPlayer = null
            };
        }));

        return objectives.OrderBy(x => x.Time);
    }

    private IEnumerable<TeamfightDto> MapTeamfights(Match match) =>
        match.Teamfights.Select(tf => new TeamfightDto
        {
            Deaths = tf.Deaths,
            Start = tf.Start,
            End = tf.End,
            Players = Enumerable.Range(0, tf.Players.Count)
                .Select(i => CreateTeamfightPlayerState(tf.Players[i], match.Players[i]))
                .OrderByDescending(x => x.GoldDelta)
                .ToList()
        });

    private TeamfightPlayerStateDto CreateTeamfightPlayerState(TeamfightPlayer state, MatchPlayer player) =>
        new()
        {
            PlayerInfo = mapper.Map<PlayerInfoDto>(player),
            GoldDelta = state.GoldDelta,
            WasDead = state.Deaths > 0
        };

    private static IEnumerable<TeamAdvantageDto> MapTeamAdvantages(Match match)
    {
        var goldCount = match.RadiantGoldAdvantage.Count;
        var xpCount = match.RadiantXpAdvantage.Count;
        var minuteCount = Math.Min(goldCount, xpCount);

        return Enumerable.Range(0, minuteCount)
            .Select(minute => new TeamAdvantageDto
            {
                Minute = minute,
                RadiantGoldAdvantage = match.RadiantGoldAdvantage[minute],
                RadiantXpAdvantage = match.RadiantXpAdvantage[minute]
            });
    }

    private IEnumerable<PlayerGraphsDto> MapPlayerGraphs(IReadOnlyList<MatchPlayer> players) =>
        players.Select(player => new PlayerGraphsDto
        {
            PlayerInfo = mapper.Map<PlayerInfoDto>(player),
            GoldPerMinute = CreateMinuteValues(player.GoldEachMinute),
            XpPerMinute = CreateMinuteValues(player.XpEachMinute),
            LastHitsPerMinute = CreateMinuteValues(player.LastHitsEachMinute)
        });

    private IEnumerable<MinuteValueDto> CreateMinuteValues(IReadOnlyList<int> values) =>
        Enumerable.Range(0, values.Count)
            .Select(minute => new MinuteValueDto
            {
                Minute = minute,
                Value = values[minute]
            });
}
