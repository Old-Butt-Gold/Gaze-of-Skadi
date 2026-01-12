import { LaneRole } from "../types/scenarios";

export const getLaneConfig = (roleValue: number) => {
  switch (roleValue) {
    case LaneRole.SafeLane:
      return { label: 'Safe Lane', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', iconSrc: '/assets/images/lane_safe.svg' };
    case LaneRole.MidLane:
      return { label: 'Mid Lane', style: 'bg-rose-50 text-rose-700 border-rose-200', iconSrc: '/assets/images/lane_mid.svg' };
    case LaneRole.OffLane:
      return { label: 'Off Lane', style: 'bg-orange-50 text-orange-700 border-orange-200', iconSrc: '/assets/images/lane_off.svg' };
    case LaneRole.Jungle:
      return { label: 'Jungle', style: 'bg-lime-50 text-lime-700 border-lime-200', iconSrc: '/assets/images/lane_jungle.svg' };
    default:
      return { label: 'Unknown', style: 'bg-slate-50 text-slate-500 border-slate-200', iconSrc: '' };
  }
};

export const LANE_OPTIONS = [
  { value: LaneRole.SafeLane, label: 'Safe Lane' },
  { value: LaneRole.MidLane, label: 'Mid Lane' },
  { value: LaneRole.OffLane, label: 'Off Lane' },
  { value: LaneRole.Jungle, label: 'Jungle' },
];
