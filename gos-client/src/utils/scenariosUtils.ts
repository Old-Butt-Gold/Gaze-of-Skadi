import {LaneRole} from "../types/common.ts";

export const getLaneConfig = (roleValue: number) => {
  const baseStyle = "border backdrop-blur-md bg-opacity-20";

  switch (roleValue) {
    case LaneRole.Safe:
      return {
        label: 'Safe Lane',
        style: `${baseStyle} bg-emerald-500/10 text-emerald-400 border-emerald-500/30`,
        iconSrc: '/assets/images/lane_safe.svg'
      };
    case LaneRole.Mid:
      return {
        label: 'Mid Lane',
        style: `${baseStyle} bg-red-500/10 text-red-400 border-red-500/30`,
        iconSrc: '/assets/images/lane_mid.svg'
      };
    case LaneRole.Offlane:
      return {
        label: 'Off Lane',
        style: `${baseStyle} bg-orange-500/10 text-orange-400 border-orange-500/30`,
        iconSrc: '/assets/images/lane_off.svg'
      };
    case LaneRole.Jungle:
      return {
        label: 'Jungle',
        style: `${baseStyle} bg-lime-500/10 text-lime-400 border-lime-500/30`,
        iconSrc: '/assets/images/lane_jungle.svg'
      };
    default:
      return {
        label: 'Unknown',
        style: `${baseStyle} bg-slate-500/10 text-slate-400 border-slate-600/30`,
        iconSrc: ''
      };
  }
};

export const LANE_OPTIONS = [
  { value: LaneRole.Safe, label: 'Safe Lane' },
  { value: LaneRole.Mid, label: 'Mid Lane' },
  { value: LaneRole.Offlane, label: 'Off Lane' },
  { value: LaneRole.Jungle, label: 'Jungle' },
];
