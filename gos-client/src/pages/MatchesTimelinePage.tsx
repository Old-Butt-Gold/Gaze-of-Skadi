import React from 'react';
import { TimelineAreaChart, type SeriesConfig } from '../components/charts/TimelineAreaChart';
import { useMatchesTimeline } from '../hooks/queries/useMatchesTimeline';

const MODE_CONFIG: Record<string, SeriesConfig> = {
    allPickRanked: { label: 'All Pick (Ranked)', color: '#e7d291' },
    allPick: { label: 'All Pick (Unranked)', color: '#60a5fa' },
    turbo: { label: 'Turbo', color: '#f87171' },
    captainsMode: { label: 'Captains Mode', color: '#c084fc' },
};

const REGION_CONFIG: Record<string, SeriesConfig> = {
    europe: { label: 'Europe', color: '#66bb6a' },
    sea: { label: 'SE Asia', color: '#ffa726' },
    china: { label: 'China', color: '#ef5350' },
    northAmerica: { label: 'North America', color: '#42a5f5' },
    southAmerica: { label: 'South America', color: '#ab47bc' },
};

const RANK_CONFIG: Record<string, SeriesConfig> = {
    herald:   { label: 'Herald',   color: 'rgb(98, 162, 52)',   icon: '/assets/images/rank_icon_1.png' },
    guardian: { label: 'Guardian', color: 'rgb(139, 94, 39)',   icon: '/assets/images/rank_icon_2.png' },
    crusader: { label: 'Crusader', color: 'rgb(19, 115, 134)',  icon: '/assets/images/rank_icon_3.png' },
    archon:   { label: 'Archon',   color: 'rgb(32, 177, 155)',  icon: '/assets/images/rank_icon_4.png' },
    legend:   { label: 'Legend',   color: 'rgb(179, 30, 70)',   icon: '/assets/images/rank_icon_5.png' },
    ancient:  { label: 'Ancient',  color: 'rgb(150, 77, 179)',  icon: '/assets/images/rank_icon_6.png' },
    divine:   { label: 'Divine',   color: 'rgb(104, 122, 202)', icon: '/assets/images/rank_icon_7.png' },
    immortal: { label: 'Immortal', color: 'rgb(230, 77, 26)',   icon: '/assets/images/rank_icon_8.png' },
};

export const MatchesTimelinePage: React.FC = () => {
    const { gameModes, regions, ranks } = useMatchesTimeline();

    return (
        <div className="min-h-screen bg-[#0b0e13] text-[#e3e3e3] pb-12">

            <div className="relative h-48 w-full bg-gradient-to-b from-[#1a1d24] to-[#0b0e13] border-b border-[#2e353b] mb-8">
                <div className="absolute inset-0 bg-[url('/assets/images/dashboard_bg_2.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#e7d291]" />
                        <span className="text-[#e7d291] font-bold uppercase tracking-[0.2em] text-xs">Global Statistics</span>
                        <span className="h-px w-10 bg-[#e7d291]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-wider drop-shadow-lg">
                        Matches <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7d291] to-[#b88a44]">Overview</span>
                    </h1>
                    <p className="text-[#808fa6] text-sm mt-3 max-w-xl">
                        Monthly distribution of matches across game modes, regions, and skill brackets.
                    </p>
                </div>
            </div>

            <div className="mx-auto px-4">
                <div className="grid grid-cols-1 gap-8">

                    <div className="w-full">
                        <TimelineAreaChart
                            title="Popularity by Game Mode"
                            description="Monthly matches played per mode"
                            data={gameModes.data}
                            config={MODE_CONFIG}
                            isLoading={gameModes.isLoading}
                            isError={gameModes.isError}
                        />
                    </div>

                    <div className="w-full">
                        <TimelineAreaChart
                            title="Activity by Region"
                            description="Monthly matches played per region"
                            data={regions.data}
                            config={REGION_CONFIG}
                            isLoading={regions.isLoading}
                            isError={regions.isError}
                        />
                    </div>

                    <div className="w-full">
                        <TimelineAreaChart
                            title="Distribution by Rank"
                            description="Monthly matches played per rank tier"
                            data={ranks.data}
                            config={RANK_CONFIG}
                            isLoading={ranks.isLoading}
                            isError={ranks.isError}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};
