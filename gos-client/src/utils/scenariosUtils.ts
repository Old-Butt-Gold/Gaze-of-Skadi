import { LaneRole } from '../types/scenarios';

export const getLaneRoleName = (roleValue: LaneRole): string => {
  switch (roleValue) {
    case 1: return 'Safe Lane';
    case 2: return 'Mid Lane';
    case 3: return 'Offlane';
    case 4: return 'Jungle';
    default: return 'Unknown'; // Covers 0 (None)
  }
};

export const getLaneRoleColor = (roleValue: LaneRole): string => {
  switch (roleValue) {
    case 1: return 'bg-green-100 text-green-700 border-green-200'; // Safe
    case 2: return 'bg-red-100 text-red-700 border-red-200';     // Mid
    case 3: return 'bg-orange-100 text-orange-700 border-orange-200'; // Offlane
    case 4: return 'bg-slate-100 text-slate-600 border-slate-200';    // Jungle
    default: return 'bg-gray-50 text-gray-500';
  }
};
