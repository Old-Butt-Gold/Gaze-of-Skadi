import React from 'react';
import { usePlayerTotals } from '../../../hooks/queries/usePlayerTotals';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import {type PlayerEndpointParameters, PlayerField} from '../../../types/player';

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

// Configuration: Label and Grouping
const FIELD_CONFIG: Record<string, { label: string; group: string; isDuration?: boolean; tooltip?: string; }> = {
    [PlayerField.Kills]: { label: 'Kills', group: 'Combat' },
    [PlayerField.Deaths]: { label: 'Deaths', group: 'Combat' },
    [PlayerField.Assists]: { label: 'Assists', group: 'Combat' },
    [PlayerField.Kda]: { label: 'KDA Sum', group: 'Combat' },
    [PlayerField.Stuns]: { label: 'Stuns Duration', group: 'Combat', isDuration: true},

    [PlayerField.GoldPerMin]: { label: 'Total GPM', group: 'Farming', tooltip: "Gold earned per minute" },
    [PlayerField.XpPerMin]: { label: 'Total XPM', group: 'Farming', tooltip: "Experience earned per minute" },
    [PlayerField.LastHits]: { label: 'Last Hits', group: 'Farming' },
    [PlayerField.Denies]: { label: 'Denies', group: 'Farming' },

    [PlayerField.HeroDamage]: { label: 'Hero Damage', group: 'Performance' },
    [PlayerField.TowerDamage]: { label: 'Tower Damage', group: 'Performance' },
    [PlayerField.HeroHealing]: { label: 'Hero Healing', group: 'Performance' },
    [PlayerField.Level]: { label: 'Total Levels', group: 'Performance' },
    [PlayerField.ActionsPerMin]: { label: 'Total APM', group: 'Performance', tooltip: "Actions per minute" },

    [PlayerField.TowerKills]: { label: 'Towers Destroyed', group: 'Objectives' },
    [PlayerField.NeutralKills]: { label: 'Neutrals Killed', group: 'Objectives' },
    [PlayerField.CourierKills]: { label: 'Couriers Killed', group: 'Objectives' },

    [PlayerField.PurchaseWardObserver]: { label: 'Observer Wards', group: 'Items', tooltip: "Observer wards" },
    [PlayerField.PurchaseWardSentry]: { label: 'Sentry Wards', group: 'Items', tooltip: "Sentry wards" },
    [PlayerField.PurchaseTpScroll]: { label: 'TP Scrolls', group: 'Items', tooltip: "Town Portal Scrolls" },
    [PlayerField.PurchaseGem]: { label: 'Gems', group: 'Items', tooltip: "Gems of True Sight" },
    [PlayerField.PurchaseRapier]: { label: 'Rapiers', group: 'Items', tooltip: "Divine Rapiers" },

    [PlayerField.Duration]: { label: 'Time Played', group: 'Misc', isDuration: true },
    [PlayerField.Pings]: { label: 'Map Pings', group: 'Misc' },
};

const formatDuration = (totalSeconds: number): string => {
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
};

const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const formatValue = (num: number, isDuration?: boolean): string => {
    if (isDuration) {
        return formatDuration(num);
    }
    return formatNumber(num);
};

export const PlayerStatsTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data: totals, isLoading, isError } = usePlayerTotals(accountId, filters);

    if (isLoading) return <LoadingSpinner text="Analyzing Statistics..." />;
    if (isError || !totals) return <div className="text-center text-[#808fa6] py-10">Failed to load statistics</div>;
    if (totals.length === 0) return <div className="text-center text-[#808fa6] py-10">No records found.</div>;

    const groupedStats: Record<string, React.ReactNode[]> = {};
    const groupsOrder = ['Combat', 'Farming', 'Performance', 'Objectives', 'Items', 'Misc'];

    totals.forEach((item) => {
        const key = item.field.value;
        const config = FIELD_CONFIG[key];

        if (config) {
            const displayValue = formatValue(item.sum, config.isDuration);

            if (!groupedStats[config.group]) {
                groupedStats[config.group] = [];
            }

            groupedStats[config.group].push(
                <div key={key} className="flex flex-col justify-between p-4 bg-gradient-to-br from-[#101216] to-[#15171c] border border-[#2e353b] rounded-lg shadow-sm hover:border-[#58606e] transition-colors group" title={config.tooltip}>
                    <span className="text-[11px] text-[#808fa6] font-bold uppercase tracking-widest mb-1 group-hover:text-white transition-colors">
                        {config.label}
                    </span>
                    <span className="text-[#e3e3e3] font-mono font-bold text-2xl tracking-tight drop-shadow-sm group-hover:text-[#e7d291] transition-colors">
                        {displayValue}
                    </span>
                </div>
            );
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {groupsOrder.map((groupName) => {
                const items = groupedStats[groupName];
                if (!items || items.length === 0) return null;

                return (
                    <div key={groupName} className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">
                        <div className="bg-[#1a1d24] px-5 py-3 border-b border-[#2e353b] flex items-center gap-3">
                            <div className="w-1 h-5 bg-gradient-to-b from-[#e7d291] to-[#b88a44] rounded-sm shadow-[0_0_8px_rgba(231,210,145,0.4)]" />
                            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-[0.15em]">
                                {groupName}
                            </h3>
                        </div>

                        <div className="p-5 grid grid-cols-2 gap-4">
                            {items}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
