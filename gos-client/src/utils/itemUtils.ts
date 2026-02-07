import {
  AbilityType,
  DamageType,
} from "../types/items";
import {Behavior, Dispellable, TargetTeam, TargetType} from "../types/common.ts";

export const getDamageTypeName = (type: DamageType): string => {
  switch (type) {
    case DamageType.Magical: return 'Magical';
    case DamageType.Physical: return 'Physical';
    case DamageType.Pure: return 'Pure';
    default: return 'Unknown';
  }
};

export const getDamageTypeColor = (type: DamageType): string => {
  switch (type) {
    case DamageType.Magical: return 'text-blue-400';
    case DamageType.Physical: return 'text-red-400';
    case DamageType.Pure: return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

export const getDispellableName = (dispellable: Dispellable): string => {
  switch (dispellable) {
    case Dispellable.Yes: return 'Yes';
    case Dispellable.No: return 'No';
    case Dispellable.StrongDispelsOnly: return 'Strong Dispels Only';
    default: return '';
  }
};

export const getBehaviorName = (behavior: Behavior): string => {
  switch (behavior) {
    case Behavior.UnitTarget: return 'Unit Target';
    case Behavior.Channeled: return 'Channeled';
    case Behavior.Hidden: return 'Hidden';
    case Behavior.Passive: return 'Passive';
    case Behavior.NoTarget: return 'No Target';
    case Behavior.Autocast: return 'Autocast';
    case Behavior.InstantCast: return 'Instant Cast';
    case Behavior.AreaOfEffect: return 'AOE';
    case Behavior.PointTarget: return 'Point Target';
    case Behavior.AttackModifier: return 'Attack Modifier';
    default: return 'Unknown';
  }
};

export const getTargetTeamName = (team: TargetTeam): string => {
  switch (team) {
    case TargetTeam.Enemy: return 'Enemy';
    case TargetTeam.Friendly: return 'Friendly';
    case TargetTeam.Both: return 'Unit'; // Usually implies both
    default: return 'Unknown';
  }
};

export const getTargetTypeName = (type: TargetType): string => {
  switch (type) {
    case TargetType.Hero: return 'Heroes';
    case TargetType.Basic: return 'Units';
    case TargetType.Building: return 'Buildings';
    case TargetType.Tree: return 'Trees';
    default: return 'Unknown';
  }
};

export const getAbilityTypeName = (type: AbilityType): string => {
  switch (type) {
    case AbilityType.Active: return 'Active';
    case AbilityType.Passive: return 'Passive';
    case AbilityType.Use: return 'Use';
    case AbilityType.Upgrade: return 'Upgrade';
    case AbilityType.Toggle: return 'Toggle';
    default: return 'Unknown';
  }
};
