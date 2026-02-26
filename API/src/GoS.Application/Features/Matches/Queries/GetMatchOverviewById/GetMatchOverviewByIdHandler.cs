using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Application.Features.Matches.Queries.GetMatchGeneralInformationById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

internal sealed class GetMatchOverviewByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager)
    : IRequestHandler<GetMatchOverviewByIdQuery, MatchOverviewDto?>
{
    private Dictionary<string, string> _itemIds = [];

    public async Task<MatchOverviewDto?> Handle(GetMatchOverviewByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        _itemIds = (await resourceManager.GetItemIdsAsync())!;

        return MapMatchOverview(match);
    }

    private MatchOverviewDto MapMatchOverview(Match match) =>
        new()
        {
            PicksBans = MapPicksBans(match.PicksBans),
            Players = match.Players.Select(MapPlayerOverview).ToList(),
            DireBarracksStatus = mapper.Map<BaseEnumDto<BarracksStatus>>(match.BarracksStatusDire),
            RadiantBarracksStatus = mapper.Map<BaseEnumDto<BarracksStatus>>(match.BarracksStatusRadiant),
            RadiantTowersStatus = mapper.Map<BaseEnumDto<TowerStatus>>(match.TowerStatusRadiant),
            DireTowersStatus = mapper.Map<BaseEnumDto<TowerStatus>>(match.TowerStatusDire),
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
                               || player.PurchaseLog.Any(x => x.Key == shardKey)
                               || player.AghanimsShard == BooleanState.True;

        var aghanimBuff = player.PermanentBuffs.Any(x => x.PermanentBuffEnum == PermanentBuffEnum.UltimateScepter)
                               || player.PurchaseLog.Any(x => x.Key == aghanimKey)
                               || player.AghanimsScepter == BooleanState.True;

        return new PlayerOverviewDto
        {
            PlayerInfo = mapper.Map<PlayerInfoDto>(player),
            Kills = player.Kills,
            Deaths = player.Deaths,
            Assists = player.Assists,
            LastHits = player.LastHits,
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
            AbilityUpgradesIds = player.AbilityUpgradesArr,
            AghanimShardBuff = aghanimShardBuff,
            AghanimBuff = aghanimBuff,
            Kda = Math.Round(player.Kda, 2),
            PredVict = mapper.Map<BaseEnumDto<BooleanState>?>(player.PredVict),
            Randomed = mapper.Map<BaseEnumDto<BooleanState>?>(player.Randomed),
            Level = player.Level,
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
                PurchaseTime = null
            };

            if (firstPurchaseTime.Count != 0 && firstPurchaseTime.TryGetValue(_itemIds[itemId.ToString()], out var purchaseTime))
            {
                itemPurchase.PurchaseTime = purchaseTime;
            }

            items.Add(itemPurchase);
            index++;
        }

        return items;
    }
}
