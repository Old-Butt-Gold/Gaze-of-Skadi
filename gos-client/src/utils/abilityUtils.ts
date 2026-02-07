import {BooleanState} from "../types/common.ts";

export const getAbilityIconUrl = (abilityKey: string | null, is_innate : BooleanState | null, originalImg : string | null)  => {
  if (abilityKey === null) return "/assets/images/innate_icon.png";

  const isInnate = is_innate === BooleanState.True;

  if (!isInnate) return originalImg;

  return '/assets/images/innate_icon.png';
}
