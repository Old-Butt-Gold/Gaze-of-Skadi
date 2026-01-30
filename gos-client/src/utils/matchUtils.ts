import type {BaseEnum, BooleanState} from "../types/common.ts";

export const isRadiantTeam = (radiant : BaseEnum<BooleanState>) : boolean => {
  return radiant.value === 1;
}

export const isTeamWon = (radiant : BaseEnum<BooleanState>, win : BaseEnum<BooleanState>) : boolean => {
  return (isRadiantTeam(radiant) && win.value === 1) || (!isRadiantTeam(radiant) && win.value === 0);
}
