using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Common.Queries.GetLeagues;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Application.Features.Matches.Queries.GetMatchPlayersById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

internal sealed class GetMatchOverviewByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager)
    : IRequestHandler<GetMatchOverviewByIdQuery, MatchOverviewDto?>
{
    private Dictionary<string, string> _objectives = [];
    private Dictionary<string, string> _itemIds = [];

    public async Task<MatchOverviewDto?> Handle(GetMatchOverviewByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        _itemIds = (await resourceManager.GetItemIdsAsync())!;
        _objectives = (await resourceManager.GetObjectiveNamesAsync())!;

        return MapMatchOverview(match);
    }

    private MatchOverviewDto MapMatchOverview(Match match) =>
        new()
        {
            Winner = mapper.Map<BaseEnumDto<TeamEnum>>(match.RadiantWin == BooleanState.True
                ? TeamEnum.Radiant
                : TeamEnum.Dire),
            RadiantScore = match.RadiantScore,
            DireScore = match.DireScore,
            GameMode = mapper.Map<BaseEnumDto<GameMode>>(match.GameMode),
            LobbyType = mapper.Map<BaseEnumDto<LobbyType>>(match.LobbyType),
            Duration = match.Duration,
            StartTime = match.StartTime,
            EndTime = match.StartTime + match.Duration,
            MatchId = match.MatchId,
            Region = mapper.Map<BaseEnumDto<Region>>(match.Region),
            ReplayUrl = match.ReplayUrl,
            PicksBans = MapPicksBans(match.PicksBans),
            Players = match.Players.Select(MapPlayerOverview)
                .ToList(),
            TeamAdvantages = MapTeamAdvantages(match)
                .ToList(),
            DireBarracksStatus = mapper.Map<BaseEnumDto<BarracksStatus>>(match.BarracksStatusDire),
            RadiantBarracksStatus = mapper.Map<BaseEnumDto<BarracksStatus>>(match.BarracksStatusRadiant),
            RadiantTowersStatus = mapper.Map<BaseEnumDto<TowerStatus>>(match.TowerStatusRadiant),
            DireTowersStatus = mapper.Map<BaseEnumDto<TowerStatus>>(match.TowerStatusDire),
            IsParsed = mapper.Map<BaseEnumDto<BooleanState>>(match.Version is not null
                ? BooleanState.True
                : BooleanState.False),
            Patch = mapper.Map<BaseEnumDto<Patch>>(match.Patch),
            RadiantTeam = mapper.Map<MatchTeamDto?>(match.RadiantTeam),
            DireTeam = mapper.Map<MatchTeamDto?>(match.DireTeam),
            League = mapper.Map<LeagueDto?>(match.League),
            Throw = match.Throw,
            Comeback = match.Comeback,
            Loss = match.Loss,
            Stomp = match.Stomp,
        };

    private IEnumerable<PickBanDto> MapPicksBans(IEnumerable<PickBan>? picksBans)
    {
        if (picksBans == null) return [];

        return picksBans.Select(pb => new PickBanDto
        {
            Order = pb.Order + 1,
            IsPick = pb.IsPick is null ? null : pb.IsPick.Value == BooleanState.True,
            Team = mapper.Map<BaseEnumDto<TeamEnum>>(pb.TeamEnum),
            HeroId = pb.HeroId
        });
    }

    private PlayerOverviewDto MapPlayerOverview(MatchPlayer player)
    {
        const string shardKey = "aghanims_shard";
        const string aghanimKey = "ultimate_scepter";

        var aghanimShardBuff = player.PermanentBuffs.Any(x => x.PermanentBuffEnum == PermanentBuffEnum.AghanimsShard)
                               || player.PurchaseLog.Any(x => x.Key == shardKey);

        var aghanimBuff = player.PermanentBuffs.Any(x => x.PermanentBuffEnum == PermanentBuffEnum.UltimateScepter)
                               || player.PurchaseLog.Any(x => x.Key == aghanimKey);

        return new PlayerOverviewDto
        {
            PermanentBuff = mapper.Map<IEnumerable<PermanentBuffDto>>(player.PermanentBuffs),
            PlayerInfo = mapper.Map<PlayerInfoDto>(player),
            Kills = player.Kills,
            Deaths = player.Deaths,
            Assists = player.Assists,
            LastHits = player.LastHitsEachMinute.Count > 0
                ? player.LastHitsEachMinute[^1]
                : 0,
            Denies = player.Denies,
            NetWorth = player.NetWorth,
            GoldPerMin = player.GoldPerMin,
            XpPerMin = player.XpPerMin,
            HeroDamage = player.HeroDamage,
            TowerDamage = player.TowerDamage,
            HeroHealing = player.HeroHealing,
            Items = MapPlayerItems([
                    player.Item0,
                    player.Item1,
                    player.Item2,
                    player.Item3,
                    player.Item4,
                    player.Item5
                ],
                player.FirstPurchaseTime),
            BackpackItems = MapPlayerItems([
                    player.Backpack0,
                    player.Backpack1,
                    player.Backpack2
                ],
                player.FirstPurchaseTime),
            NeutralItem = player.ItemNeutral != 0
                ? player.ItemNeutral
                : null,
            NeutralAura = player.ItemNeutralAura,
            AbilityUpgrades = player.AbilityUpgradesArr.Select(abilityId => new AbilityUpgradeDto
                {
                    AbilityId = abilityId
                })
                .ToList(),
            AghanimShardBuff = aghanimShardBuff,
            AghanimBuff = aghanimBuff,
            Objectives = GetObjectiveDataForPlayer(player),
            Kda = Math.Round(player.Kda, 2),
            PredVict = mapper.Map<BaseEnumDto<BooleanState>?>(player.PredVict),
            Randomed = mapper.Map<BaseEnumDto<BooleanState>?>(player.Randomed),
        };
    }

    private IEnumerable<ItemPurchaseDto> MapPlayerItems(long[] itemSlots, IDictionary<string, int> firstPurchaseTime)
    {
        var items = new List<ItemPurchaseDto>();
        var index = 0;
        foreach (var itemId in itemSlots)
        {
            if (itemId == 0) continue;

            var itemPurchase = new ItemPurchaseDto {
                ItemIndex = index,
                ItemId = itemId,
                FirstPurchaseTime = null
            };

            if (firstPurchaseTime.Count != 0 && firstPurchaseTime.TryGetValue(_itemIds[itemId.ToString()], out var purchaseTime))
            {
                itemPurchase.FirstPurchaseTime = purchaseTime;
            }

            items.Add(itemPurchase);
            index++;
        }

        return items;
    }

    private IEnumerable<TeamAdvantageDto> MapTeamAdvantages(Match match)
    {
        var goldCount = match.RadiantGoldAdvantage.Count;
        var xpCount = match.RadiantXpAdvantage.Count;
        var minuteCount = Math.Min(goldCount, xpCount);

        if (minuteCount == 0) return [];

        var advantages = new List<TeamAdvantageDto>();
        for (var minute = 0; minute < minuteCount; minute++)
        {
            advantages.Add(new TeamAdvantageDto
            {
                Minute = minute,
                RadiantGoldAdvantage = match.RadiantGoldAdvantage[minute],
                RadiantXpAdvantage = match.RadiantXpAdvantage[minute]
            });
        }

        return advantages;
    }

    private IEnumerable<ObjectiveDataDto> GetObjectiveDataForPlayer(MatchPlayer player) =>
        player.Damage
            .Where(x => _objectives.ContainsKey(x.Key))
            .Select(damage => new ObjectiveDataDto { Key = damage.Key, Value = damage.Value, })
            .ToList();
}
