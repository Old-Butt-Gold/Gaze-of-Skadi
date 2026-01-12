import {HeroAttackType, HeroPrimaryAttribute, HeroRole, type HeroStatsIcon} from '../types/heroes';

export const getAttributeColor = (attr: HeroPrimaryAttribute) => {
  switch (attr) {
    case HeroPrimaryAttribute.Strength: return 'text-red-500';
    case HeroPrimaryAttribute.Agility: return 'text-emerald-500';
    case HeroPrimaryAttribute.Intelligence: return 'text-blue-400';
    case HeroPrimaryAttribute.All: return 'text-amber-400'; // Universal
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
