import {HeroAttackType, type HeroInfo, HeroPrimaryAttribute, HeroRole, type HeroStatsIcon} from '../types/heroes';

export const getAttributeColor = (attr: HeroPrimaryAttribute) => {
  switch (attr) {
    case HeroPrimaryAttribute.Strength: return 'text-red-500';
    case HeroPrimaryAttribute.Agility: return 'text-emerald-500';
    case HeroPrimaryAttribute.Intelligence: return 'text-blue-400';
    case HeroPrimaryAttribute.All: return 'text-amber-400';
    default: return 'text-slate-400';
  }
};

export const getAttributeName = (attr: HeroPrimaryAttribute) => {
  switch (attr) {
    case HeroPrimaryAttribute.Strength: return 'Strength';
    case HeroPrimaryAttribute.Agility: return 'Agility';
    case HeroPrimaryAttribute.Intelligence: return 'Intelligence';
    case HeroPrimaryAttribute.All: return 'Universal';
    default: return 'Unknown';
  }
};

export const getThemeColor = (attr: HeroPrimaryAttribute) => {
  switch (attr) {
    case HeroPrimaryAttribute.Strength: return 'border-red-500/50 shadow-red-900/40';
    case HeroPrimaryAttribute.Agility: return 'border-emerald-500/50 shadow-emerald-900/40';
    case HeroPrimaryAttribute.Intelligence: return 'border-blue-500/50 shadow-blue-900/40';
    case HeroPrimaryAttribute.All: return 'border-amber-500/50 shadow-amber-900/40';
    default: return 'border-slate-600 shadow-slate-900';
  }
};

export const getHeroRoleName = (heroRole: HeroRole): string => {
  switch (heroRole) {
    case HeroRole.Carry: return 'Carry';
    case HeroRole.Disabler: return 'Disabler';
    case HeroRole.Durable: return 'Durable';
    case HeroRole.Escape: return 'Escape';
    case HeroRole.Initiator: return 'Initiator';
    case HeroRole.Jungler: return 'Jungler';
    case HeroRole.Nuker: return 'Nuker';
    case HeroRole.Pusher: return 'Pusher';
    case HeroRole.Support: return 'Support';
    default: return 'Unknown';
  }
};

export const isMelee = (attackType: HeroAttackType): boolean => {
  return attackType === HeroAttackType.Melee;
};

export const getStatsIcon = (type: HeroStatsIcon): string => {
  switch (type) {
    case 'armor': return "/assets/images/icon_armor.png";
    case 'attack': return "/assets/images/icon_damage.png";
    case 'move_speed': return "/assets/images/icon_movement_speed.png";

    default: return "";
  }
};

export type AttributeIconInfo = {
    src: string;
    alt: string;
};

export const getAttributeIconInfo = (attr: HeroPrimaryAttribute): AttributeIconInfo => {
    switch (attr) {
        case HeroPrimaryAttribute.Agility:
            return { src: "/assets/images/hero_agility.png", alt: "AGI" };
        case HeroPrimaryAttribute.Intelligence:
            return { src: "/assets/images/hero_intelligence.png", alt: "INT" };
        case HeroPrimaryAttribute.Strength:
            return { src: "/assets/images/hero_strength.png", alt: "STR" };
        case HeroPrimaryAttribute.All:
            return { src: "/assets/images/hero_universal.png", alt: "ALL" };
        default:
            return { src: "", alt: "Unknown" };
    }
};

export const calculateHealth = (hero: HeroInfo): number => {
  return Math.floor(hero.base_health + (hero.base_str * 22));
};

export const calculateHealthRegen = (hero: HeroInfo): string => {
  return (hero.base_health_regen + (hero.base_str * 0.1)).toFixed(1);
};

export const calculateMana = (hero: HeroInfo): number => {
  return Math.floor(hero.base_mana + (hero.base_int * 12));
};

export const calculateManaRegen = (hero: HeroInfo): string => {
  return (hero.base_mana_regen + (hero.base_int * 0.05)).toFixed(1);
};

export const calculateArmor = (hero: HeroInfo): string => {
  return (hero.base_armor + (hero.base_agi / 6)).toFixed(1);
};

export const calculateDamage = (hero: HeroInfo): { min: number; max: number } => {
  let bonusDamage = 0;

  switch (hero.primary_attr) {
    case HeroPrimaryAttribute.Strength:
      bonusDamage = hero.base_str;
      break;
    case HeroPrimaryAttribute.Agility:
      bonusDamage = hero.base_agi;
      break;
    case HeroPrimaryAttribute.Intelligence:
      bonusDamage = hero.base_int;
      break;
    case HeroPrimaryAttribute.All:
      bonusDamage = Math.floor((hero.base_str + hero.base_agi + hero.base_int) * 0.45);
      break;
  }

  return {
    min: Math.floor(hero.base_attack_min + bonusDamage),
    max: Math.floor(hero.base_attack_max + bonusDamage),
  };
};
