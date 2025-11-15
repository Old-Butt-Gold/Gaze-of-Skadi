using GoS.Application.Dto;
using GoS.Domain.BaseEnums;
using GoS.Domain.Resources.Enums;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

public class HeroInfoDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public BaseEnumDto<HeroPrimaryAttribute> PrimaryAttribute { get; set; }
    public BaseEnumDto<HeroAttackType> AttackType { get; set; }
    public IEnumerable<BaseEnumDto<HeroRole>> Roles { get; set; } = [];
    public string Lore { get; set; } = string.Empty;
    public string Video { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty;
    public string IconPath { get; set; } = string.Empty;
    public int BaseHealth { get; set; }
    public double? BaseHealthRegen { get; set; }
    public int BaseMana { get; set; }
    public double? BaseManaRegen { get; set; }
    public double BaseArmor { get; set; }
    public double BaseMagicResistance { get; set; }
    public int BaseAttackMin { get; set; }
    public int BaseAttackMax { get; set; }
    public int BaseStrength { get; set; }
    public int BaseAgility { get; set; }
    public int BaseIntelligence { get; set; }
    public double StrengthGain { get; set; }
    public double AgilityGain { get; set; }
    public double IntelligenceGain { get; set; }
    public int AttackRange { get; set; }
    public int ProjectileSpeed { get; set; }
    public double AttackRate { get; set; }
    public int BaseAttackTime { get; set; }
    public double AttackPoint { get; set; }
    public int MoveSpeed { get; set; }
    public double TurnRate { get; set; }
    public BaseEnumDto<BooleanState> CmEnabled { get; set; }
    public int Legs { get; set; }
    public int DayVision { get; set; }
    public int NightVision { get; set; }
    public string LocalizedName { get; set; } = string.Empty;
}