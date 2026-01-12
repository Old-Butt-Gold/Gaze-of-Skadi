import { LaneRole } from '../types/scenarios';

export const getLaneRoleName = (roleValue: LaneRole): string => {
  switch (roleValue) {
    case LaneRole.SafeLane: return 'Safe Lane';
    case LaneRole.MidLane: return 'Mid Lane';
    case LaneRole.OffLane: return 'Offlane';
    case LaneRole.Jungle: return 'Jungle';
    default: return 'Unknown'; // Covers 0 (None)
  }
};

export const getLaneRoleColor = (roleValue: LaneRole): string => {
  switch (roleValue) {
    case LaneRole.SafeLane: return 'bg-green-100 text-green-700 border-green-200'; // Safe
    case LaneRole.MidLane: return 'bg-red-100 text-red-700 border-red-200';     // Mid
    case LaneRole.OffLane: return 'bg-orange-100 text-orange-700 border-orange-200'; // Offlane
    case LaneRole.Jungle: return 'bg-slate-100 text-slate-600 border-slate-200';    // Jungle
    default: return 'bg-gray-50 text-gray-500';
  }
};
