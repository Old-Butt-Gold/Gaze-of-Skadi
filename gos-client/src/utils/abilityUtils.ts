import {BooleanState} from "../types/common.ts";

const INNATE_ICONS = new Set([
  "kunkka_admirals_rum",
  "spectre_desolate",
  "slark_essence_shift",
  "phantom_assassin_blur"
]);

export const getAbilityIconUrl = (abilityKey: string | null, is_innate : BooleanState | null, originalImg : string | null)  => {
  if (abilityKey === null) return "/assets/images/innate_icon.png";

  const isInnate = is_innate === BooleanState.True;

  if (!isInnate) return originalImg;

  return INNATE_ICONS.has(abilityKey)
    ? originalImg
    : '/assets/images/innate_icon.png';
}
