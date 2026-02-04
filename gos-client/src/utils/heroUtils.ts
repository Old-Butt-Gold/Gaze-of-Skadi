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
    case 'attack': return "/assets/images/icon_damage.png";
    case 'attack_rate': return "/assets/images/icon_attack_time.png";
    case 'attack_range': return "/assets/images/icon_attack_range.png";
    case 'projectile_speed': return "/assets/images/icon_projectile_speed.png";
    case 'armor': return "/assets/images/icon_armor.png";
    case 'base_magic_resistance': return "/assets/images/icon_magic_resist.png";
    case 'move_speed': return "/assets/images/icon_movement_speed.png";
    case 'turn_rate': return "/assets/images/icon_turn_rate.png";
    case 'vision': return "/assets/images/icon_vision.png";

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

export const calculateMagicResistance = (hero: HeroInfo): string => {
  const base = hero.base_mr / 100;
  const intBonus = hero.base_int * 0.001;
  const totalResistance = 1 - ((1 - base) * (1 - intBonus));

  return (totalResistance * 100).toFixed(1);
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

// Маппинг ID героя -> CSS String градиента
export const HERO_GRADIENTS: Record<number, string> = {
  1: "linear-gradient(135deg, rgba(205, 185, 218, 0.15), rgba(61, 28, 109, 0.15))",
  2: "linear-gradient(135deg, rgba(163, 155, 171, 0.15), rgba(101, 31, 21, 0.15))",
  3: "linear-gradient(135deg, rgba(88, 42, 111, 0.15), rgba(36, 12, 115, 0.15))",
  4: "linear-gradient(135deg, rgba(188, 168, 148, 0.15), rgba(94, 22, 13, 0.15))",
  5: "linear-gradient(135deg, rgba(156, 186, 151, 0.15), rgba(19, 37, 103, 0.15))",
  6: "linear-gradient(135deg, rgba(175, 185, 212, 0.15), rgba(21, 83, 116, 0.15))",
  7: "linear-gradient(135deg, rgba(146, 95, 7, 0.15), rgba(125, 41, 8, 0.15))",
  8: "linear-gradient(135deg, rgba(213, 209, 184, 0.15), rgba(119, 65, 14, 0.15))",
  9: "linear-gradient(135deg, rgba(12, 124, 141, 0.15), rgba(4, 37, 103, 0.15))",
  10: "linear-gradient(135deg, rgba(120, 190, 196, 0.15), rgba(4, 84, 124, 0.15))",
  11: "linear-gradient(135deg, rgba(124, 40, 29, 0.15), rgba(98, 4, 4, 0.15))",
  12: "linear-gradient(135deg, rgba(167, 168, 170, 0.15), rgba(65, 33, 11, 0.15))",
  13: "linear-gradient(135deg, rgba(28, 93, 125, 0.15), rgba(14, 38, 160, 0.15))",
  14: "linear-gradient(135deg, rgba(149, 199, 143, 0.15), rgba(124, 36, 4, 0.15))",
  15: "linear-gradient(135deg, rgba(37, 105, 116, 0.15), rgba(4, 58, 108, 0.15))",
  16: "linear-gradient(135deg, rgba(139, 125, 14, 0.15), rgba(127, 70, 5, 0.15))",
  17: "linear-gradient(135deg, rgba(148, 180, 188, 0.15), rgba(28, 66, 110, 0.15))",
  18: "linear-gradient(135deg, rgba(28, 83, 125, 0.15), rgba(23, 69, 105, 0.15))",
  19: "linear-gradient(135deg, rgba(191, 197, 202, 0.15), rgba(4, 11, 27, 0.15))",
  20: "linear-gradient(135deg, rgba(156, 185, 211, 0.15), rgba(4, 20, 78, 0.15))",
  21: "linear-gradient(135deg, rgba(116, 96, 37, 0.15), rgba(127, 34, 10, 0.15))",
  22: "linear-gradient(135deg, rgba(141, 173, 180, 0.15), rgba(4, 66, 93, 0.15))",
  23: "linear-gradient(135deg, rgba(197, 196, 155, 0.15), rgba(40, 66, 87, 0.15))",
  25: "linear-gradient(135deg, rgba(212, 177, 161, 0.15), rgba(108, 40, 19, 0.15))",
  26: "linear-gradient(135deg, rgba(104, 50, 49, 0.15), rgba(129, 16, 4, 0.15))",
  27: "linear-gradient(135deg, rgba(172, 180, 136, 0.15), rgba(127, 72, 5, 0.15))",
  28: "linear-gradient(135deg, rgba(134, 132, 200, 0.15), rgba(4, 93, 134, 0.15))",
  29: "linear-gradient(135deg, rgba(124, 187, 180, 0.15), rgba(5, 102, 75, 0.15))",
  30: "linear-gradient(135deg, rgba(120, 59, 33, 0.15), rgba(54, 43, 94, 0.15))",
  31: "linear-gradient(135deg, rgba(146, 177, 191, 0.15), rgba(12, 61, 110, 0.15))",
  32: "linear-gradient(135deg, rgba(173, 152, 205, 0.15), rgba(15, 51, 97, 0.15))",
  33: "linear-gradient(135deg, rgba(98, 17, 136, 0.15), rgba(36, 19, 98, 0.15))",
  34: "linear-gradient(135deg, rgba(173, 167, 185, 0.15), rgba(108, 46, 9, 0.15))",
  35: "linear-gradient(135deg, rgba(207, 171, 199, 0.15), rgba(120, 27, 13, 0.15))",
  36: "linear-gradient(135deg, rgba(17, 136, 39, 0.15), rgba(77, 118, 20, 0.15))",
  37: "linear-gradient(135deg, rgba(132, 21, 21, 0.15), rgba(138, 15, 15, 0.15))",
  38: "linear-gradient(135deg, rgba(116, 65, 37, 0.15), rgba(118, 18, 5, 0.15))",
  39: "linear-gradient(135deg, rgba(166, 159, 203, 0.15), rgba(90, 12, 28, 0.15))",
  40: "linear-gradient(135deg, rgba(101, 142, 11, 0.15), rgba(147, 147, 6, 0.15))",
  41: "linear-gradient(135deg, rgba(189, 176, 216, 0.15), rgba(49, 32, 91, 0.15))",
  42: "linear-gradient(135deg, rgba(33, 120, 82, 0.15), rgba(29, 104, 54, 0.15))",
  43: "linear-gradient(135deg, rgba(172, 196, 161, 0.15), rgba(9, 119, 108, 0.15))",
  44: "linear-gradient(135deg, rgba(131, 168, 175, 0.15), rgba(6, 96, 111, 0.15))",
  45: "linear-gradient(135deg, rgba(105, 119, 34, 0.15), rgba(87, 139, 9, 0.15))",
  46: "linear-gradient(135deg, rgba(151, 159, 196, 0.15), rgba(40, 72, 93, 0.15))",
  47: "linear-gradient(135deg, rgba(34, 119, 79, 0.15), rgba(5, 108, 143, 0.15))",
  48: "linear-gradient(135deg, rgba(200, 188, 200, 0.15), rgba(32, 38, 106, 0.15))",
  49: "linear-gradient(135deg, rgba(175, 172, 172, 0.15), rgba(98, 12, 4, 0.15))",
  50: "linear-gradient(135deg, rgba(201, 197, 201, 0.15), rgba(94, 12, 111, 0.15))",
  51: "linear-gradient(135deg, rgba(202, 171, 145, 0.15), rgba(119, 29, 13, 0.15))",
  52: "linear-gradient(135deg, rgba(142, 168, 169, 0.15), rgba(4, 43, 67, 0.15))",
  53: "linear-gradient(135deg, rgba(47, 104, 106, 0.15), rgba(78, 42, 4, 0.15))",
  54: "linear-gradient(135deg, rgba(193, 187, 143, 0.15), rgba(99, 23, 13, 0.15))",
  55: "linear-gradient(135deg, rgba(169, 143, 189, 0.15), rgba(48, 20, 113, 0.15))",
  56: "linear-gradient(135deg, rgba(113, 131, 173, 0.15), rgba(149, 45, 4, 0.15))",
  57: "linear-gradient(135deg, rgba(193, 174, 139, 0.15), rgba(124, 4, 4, 0.15))",
  58: "linear-gradient(135deg, rgba(183, 134, 113, 0.15), rgba(134, 28, 4, 0.15))",
  59: "linear-gradient(135deg, rgba(191, 167, 115, 0.15), rgba(126, 55, 17, 0.15))",
  60: "linear-gradient(135deg, rgba(9, 72, 144, 0.15), rgba(7, 64, 110, 0.15))",
  61: "linear-gradient(135deg, rgba(134, 19, 33, 0.15), rgba(98, 14, 24, 0.15))",
  62: "linear-gradient(135deg, rgba(170, 146, 141, 0.15), rgba(136, 71, 7, 0.15))",
  63: "linear-gradient(135deg, rgba(127, 34, 26, 0.15), rgba(11, 111, 110, 0.15))",
  64: "linear-gradient(135deg, rgba(206, 199, 229, 0.15), rgba(157, 53, 12, 0.15))",
  65: "linear-gradient(135deg, rgba(190, 214, 184, 0.15), rgba(134, 45, 4, 0.15))",
  66: "linear-gradient(135deg, rgba(210, 208, 178, 0.15), rgba(36, 68, 117, 0.15))",
  67: "linear-gradient(135deg, rgba(24, 63, 129, 0.15), rgba(4, 50, 149, 0.15))",
  68: "linear-gradient(135deg, rgba(9, 61, 144, 0.15), rgba(8, 84, 166, 0.15))",
  69: "linear-gradient(135deg, rgba(114, 86, 39, 0.15), rgba(113, 35, 9, 0.15))",
  70: "linear-gradient(135deg, rgba(173, 170, 168, 0.15), rgba(80, 28, 7, 0.15))",
  71: "linear-gradient(135deg, rgba(160, 193, 202, 0.15), rgba(28, 63, 84, 0.15))",
  72: "linear-gradient(135deg, rgba(179, 180, 147, 0.15), rgba(149, 93, 4, 0.15))",
  73: "linear-gradient(135deg, rgba(164, 127, 154, 0.15), rgba(98, 61, 30, 0.15))",
  74: "linear-gradient(135deg, rgba(188, 160, 118, 0.15), rgba(132, 86, 6, 0.15))",
  75: "linear-gradient(135deg, rgba(202, 184, 180, 0.15), rgba(94, 8, 32, 0.15))",
  76: "linear-gradient(135deg, rgba(123, 163, 139, 0.15), rgba(4, 124, 20, 0.15))",
  77: "linear-gradient(135deg, rgba(98, 180, 188, 0.15), rgba(5, 120, 133, 0.15))",
  78: "linear-gradient(135deg, rgba(119, 102, 34, 0.15), rgba(108, 44, 4, 0.15))",
  79: "linear-gradient(135deg, rgba(135, 18, 22, 0.15), rgba(52, 4, 10, 0.15))",
  80: "linear-gradient(135deg, rgba(140, 89, 13, 0.15), rgba(134, 60, 4, 0.15))",
  81: "linear-gradient(135deg, rgba(130, 57, 23, 0.15), rgba(103, 40, 15, 0.15))",
  82: "linear-gradient(135deg, rgba(179, 167, 162, 0.15), rgba(89, 36, 23, 0.15))",
  83: "linear-gradient(135deg, rgba(169, 194, 137, 0.15), rgba(76, 110, 12, 0.15))",
  84: "linear-gradient(135deg, rgba(135, 146, 171, 0.15), rgba(27, 54, 101, 0.15))",
  85: "linear-gradient(135deg, rgba(163, 177, 129, 0.15), rgba(44, 99, 75, 0.15))",
  86: "linear-gradient(135deg, rgba(163, 190, 209, 0.15), rgba(59, 96, 11, 0.15))",
  87: "linear-gradient(135deg, rgba(19, 126, 134, 0.15), rgba(11, 88, 116, 0.15))",
  88: "linear-gradient(135deg, rgba(212, 208, 191, 0.15), rgba(78, 4, 4, 0.15))",
  89: "linear-gradient(135deg, rgba(168, 209, 209, 0.15), rgba(4, 78, 118, 0.15))",
  90: "linear-gradient(135deg, rgba(212, 206, 175, 0.15), rgba(129, 91, 29, 0.15))",
  91: "linear-gradient(135deg, rgba(157, 190, 205, 0.15), rgba(36, 44, 101, 0.15))",
  92: "linear-gradient(135deg, rgba(149, 182, 183, 0.15), rgba(4, 29, 78, 0.15))",
  93: "linear-gradient(135deg, rgba(193, 143, 147, 0.15), rgba(107, 28, 15, 0.15))",
  94: "linear-gradient(135deg, rgba(165, 207, 167, 0.15), rgba(12, 105, 85, 0.15))",
  95: "linear-gradient(135deg, rgba(193, 173, 159, 0.15), rgba(119, 48, 4, 0.15))",
  96: "linear-gradient(135deg, rgba(145, 161, 148, 0.15), rgba(5, 65, 72, 0.15))",
  97: "linear-gradient(135deg, rgba(8, 122, 145, 0.15), rgba(6, 98, 116, 0.15))",
  98: "linear-gradient(135deg, rgba(195, 179, 146, 0.15), rgba(104, 21, 8, 0.15))",
  99: "linear-gradient(135deg, rgba(112, 103, 41, 0.15), rgba(117, 44, 11, 0.15))",
  100: "linear-gradient(135deg, rgba(180, 201, 202, 0.15), rgba(116, 42, 44, 0.15))",
  101: "linear-gradient(135deg, rgba(135, 161, 192, 0.15), rgba(93, 53, 4, 0.15))",
  102: "linear-gradient(135deg, rgba(30, 16, 137, 0.15), rgba(5, 45, 133, 0.15))",
  103: "linear-gradient(135deg, rgba(177, 185, 185, 0.15), rgba(121, 20, 6, 0.15))",
  104: "linear-gradient(135deg, rgba(206, 193, 177, 0.15), rgba(97, 46, 10, 0.15))",
  105: "linear-gradient(135deg, rgba(205, 190, 177, 0.15), rgba(98, 51, 4, 0.15))",
  106: "linear-gradient(135deg, rgba(203, 141, 139, 0.15), rgba(131, 32, 12, 0.15))",
  107: "linear-gradient(135deg, rgba(201, 207, 191, 0.15), rgba(98, 104, 13, 0.15))",
  108: "linear-gradient(135deg, rgba(179, 196, 166, 0.15), rgba(9, 30, 68, 0.15))",
  109: "linear-gradient(135deg, rgba(14, 127, 139, 0.15), rgba(9, 106, 123, 0.15))",
  110: "linear-gradient(135deg, rgba(212, 160, 182, 0.15), rgba(129, 29, 4, 0.15))",
  111: "linear-gradient(135deg, rgba(194, 185, 142, 0.15), rgba(126, 32, 73, 0.15))",
  112: "linear-gradient(135deg, rgba(124, 161, 182, 0.15), rgba(12, 172, 116, 0.15))",
  113: "linear-gradient(135deg, rgba(185, 123, 188, 0.15), rgba(7, 76, 171, 0.15))",
  114: "linear-gradient(135deg, rgba(201, 166, 186, 0.15), rgba(104, 68, 29, 0.15))",
  119: "linear-gradient(135deg, rgba(145, 153, 197, 0.15), rgba(98, 4, 38, 0.15))",
  120: "linear-gradient(135deg, rgba(184, 163, 179, 0.15), rgba(94, 29, 38, 0.15))",
  121: "linear-gradient(135deg, rgba(148, 188, 188, 0.15), rgba(115, 14, 12, 0.15))",
  123: "linear-gradient(135deg, rgba(151, 144, 135, 0.15), rgba(123, 97, 30, 0.15))",
  126: "linear-gradient(135deg, rgba(186, 163, 194, 0.15), rgba(68, 28, 125, 0.15))",
  128: "linear-gradient(135deg, rgba(153, 181, 184, 0.15), rgba(104, 66, 24, 0.15))",
  129: "linear-gradient(135deg, rgba(156, 150, 162, 0.15), rgba(124, 22, 4, 0.15))",
  131: "linear-gradient(135deg, rgba(137, 173, 118, 0.15), rgba(128, 188, 140, 0.15))",
  135: "linear-gradient(135deg, rgba(222, 216, 192, 0.15), rgba(112, 69, 26, 0.15))",
  136: "linear-gradient(135deg, rgba(194, 168, 147, 0.15), rgba(129, 63, 9, 0.15))",
  137: "linear-gradient(135deg, rgba(159, 188, 183, 0.15), rgba(126, 55, 16, 0.15))",
  138: "linear-gradient(135deg, rgba(135, 147, 151, 0.15), rgba(140, 34, 18, 0.15))",
  145: "linear-gradient(135deg, rgba(46, 73, 142, 0.15), rgba(151, 211, 216, 0.15))",
  155: "linear-gradient(135deg, rgba(207, 194, 170, 0.15), rgba(32, 85, 52, 0.15))",
};

export const getHeroGradientStyle = (heroId: number) => {
  const gradient = HERO_GRADIENTS[heroId];
  if (gradient) {
    return { backgroundImage: gradient };
  }
  return undefined;
};
