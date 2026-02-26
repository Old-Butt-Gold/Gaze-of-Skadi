import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchOverview } from '../../../hooks/queries/useMatchOverview';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { HeroCell } from '../../heroes/HeroCell';
import { Icon } from '../../Icon';
import { TeamEnum } from '../../../types/common';
import { BarracksStatus, type PickBanDto, TowerStatus } from '../../../types/matchOverview';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';

interface BuildingConfig {
    id: string;
    name: string;
    type: 'tower' | 'rax' | 'fort';
    x: number;
    y: number;
    img: string;
    bit?: number;
    sizeClass: string;
}

const RADIANT_BUILDINGS: BuildingConfig[] = [
    { id: 'rad_t1_top', name: 'Top Tier 1 Tower', type: 'tower', bit: TowerStatus.TopTier1, x: 11, y: 37, img: 'radiant_tower.png', sizeClass: 'w-6' },
    { id: 'rad_t2_top', name: 'Top Tier 2 Tower', type: 'tower', bit: TowerStatus.TopTier2, x: 11, y: 57, img: 'radiant_tower.png', sizeClass: 'w-6' },
    { id: 'rad_t3_top', name: 'Top Tier 3 Tower', type: 'tower', bit: TowerStatus.TopTier3, x: 10, y: 71, img: 'radiant_tower.png', sizeClass: 'w-6' },
    { id: 'rad_t1_mid', name: 'Middle Tier 1 Tower', type: 'tower', bit: TowerStatus.MidTier1, x: 40, y: 56.5, img: 'radiant_tower_angle.png', sizeClass: 'w-6' },
    { id: 'rad_t2_mid', name: 'Middle Tier 2 Tower', type: 'tower', bit: TowerStatus.MidTier2, x: 29, y: 67, img: 'radiant_tower_angle.png', sizeClass: 'w-6' },
    { id: 'rad_t3_mid', name: 'Middle Tier 3 Tower', type: 'tower', bit: TowerStatus.MidTier3, x: 22, y: 75, img: 'radiant_tower_angle.png', sizeClass: 'w-6' },
    { id: 'rad_t1_bot', name: 'Bottom Tier 1 Tower', type: 'tower', bit: TowerStatus.BottomTier1, x: 80, y: 86, img: 'radiant_tower.png', sizeClass: 'w-6' },
    { id: 'rad_t2_bot', name: 'Bottom Tier 2 Tower', type: 'tower', bit: TowerStatus.BottomTier2, x: 47, y: 88, img: 'radiant_tower.png', sizeClass: 'w-6' },
    { id: 'rad_t3_bot', name: 'Bottom Tier 3 Tower', type: 'tower', bit: TowerStatus.BottomTier3, x: 26, y: 86.6, img: 'radiant_tower.png', sizeClass: 'w-6' },

    { id: 'rad_t4_1', name: 'Tier 4 Tower (Left)', type: 'tower', bit: TowerStatus.T4Left, x: 13, y: 81, img: 'radiant_tower_angle.png', sizeClass: 'w-6' },
    { id: 'rad_t4_2', name: 'Tier 4 Tower (Right)', type: 'tower', bit: TowerStatus.T4Right, x: 15.5, y: 83.2, img: 'radiant_tower_angle.png', sizeClass: 'w-6' },

    { id: 'rad_rax_top_m', name: 'Top Melee Barracks', type: 'rax', bit: BarracksStatus.MeleeTop, x: 12, y: 74.5, img: 'radiant_rax.png', sizeClass: 'w-6' },
    { id: 'rad_rax_top_r', name: 'Top Ranged Barracks', type: 'rax', bit: BarracksStatus.RangedTop, x: 8, y: 74.5, img: 'radiant_rax.png', sizeClass: 'w-6' },
    { id: 'rad_rax_mid_m', name: 'Middle Melee Barracks', type: 'rax', bit: BarracksStatus.MeleeMiddle, x: 20.5, y: 78.5, img: 'radiant_rax_angle.png', sizeClass: 'w-6' },
    { id: 'rad_rax_mid_r', name: 'Middle Ranged Barracks', type: 'rax', bit: BarracksStatus.RangedMiddle, x: 18, y: 76, img: 'radiant_rax_angle.png', sizeClass: 'w-6' },
    { id: 'rad_rax_bot_m', name: 'Bottom Melee Barracks', type: 'rax', bit: BarracksStatus.MeleeBottom, x: 22.5, y: 88, img: 'radiant_rax.png', sizeClass: 'w-6' },
    { id: 'rad_rax_bot_r', name: 'Bottom Ranged Barracks', type: 'rax', bit: BarracksStatus.RangedBottom, x: 22.5, y: 84.5, img: 'radiant_rax.png', sizeClass: 'w-6' },

    { id: 'rad_fort', name: 'Radiant Ancient', type: 'fort', x: 11, y: 85, img: 'radiant_fort.png', sizeClass: 'w-6' },
];

const DIRE_BUILDINGS: BuildingConfig[] = [
    { id: 'dire_t1_top', name: 'Top Tier 1 Tower', type: 'tower', bit: TowerStatus.TopTier1, x: 17, y: 14.5, img: 'dire_tower.png', sizeClass: 'w-6' },
    { id: 'dire_t2_top', name: 'Top Tier 2 Tower', type: 'tower', bit: TowerStatus.TopTier2, x: 46, y: 12, img: 'dire_tower.png', sizeClass: 'w-6' },
    { id: 'dire_t3_top', name: 'Top Tier 3 Tower', type: 'tower', bit: TowerStatus.TopTier3, x: 70, y: 15, img: 'dire_tower.png', sizeClass: 'w-6' },
    { id: 'dire_t1_mid', name: 'Middle Tier 1 Tower', type: 'tower', bit: TowerStatus.MidTier1, x: 55, y: 44, img: 'dire_tower_angle.png', sizeClass: 'w-6' },
    { id: 'dire_t2_mid', name: 'Middle Tier 2 Tower', type: 'tower', bit: TowerStatus.MidTier2, x: 66.5, y: 35, img: 'dire_tower_angle.png', sizeClass: 'w-6' },
    { id: 'dire_t3_mid', name: 'Middle Tier 3 Tower', type: 'tower', bit: TowerStatus.MidTier3, x: 75, y: 27, img: 'dire_tower_angle.png', sizeClass: 'w-6' },
    { id: 'dire_t1_bot', name: 'Bottom Tier 1 Tower', type: 'tower', bit: TowerStatus.BottomTier1, x: 86, y: 62, img: 'dire_tower.png', sizeClass: 'w-6' },
    { id: 'dire_t2_bot', name: 'Bottom Tier 2 Tower', type: 'tower', bit: TowerStatus.BottomTier2, x: 86.5, y: 46, img: 'dire_tower.png', sizeClass: 'w-6' },
    { id: 'dire_t3_bot', name: 'Bottom Tier 3 Tower', type: 'tower', bit: TowerStatus.BottomTier3, x: 87.3, y: 31.5, img: 'dire_tower.png', sizeClass: 'w-6' },

    { id: 'dire_t4_1', name: 'Tier 4 Tower (Left)', type: 'tower', bit: TowerStatus.T4Left, x: 81.5, y: 18, img: 'dire_tower_angle.png', sizeClass: 'w-6' },
    { id: 'dire_t4_2', name: 'Tier 4 Tower (Right)', type: 'tower', bit: TowerStatus.T4Right, x: 84.5, y: 20.5, img: 'dire_tower_angle.png', sizeClass: 'w-6' },

    { id: 'dire_rax_top_m', name: 'Top Melee Barracks', type: 'rax', bit: BarracksStatus.MeleeTop, x: 73.5, y: 16.5, img: 'dire_rax.png', sizeClass: 'w-6' },
    { id: 'dire_rax_top_r', name: 'Top Ranged Barracks', type: 'rax', bit: BarracksStatus.RangedTop, x: 73.5, y: 12.5, img: 'dire_rax.png', sizeClass: 'w-6' },
    { id: 'dire_rax_mid_m', name: 'Middle Melee Barracks', type: 'rax', bit: BarracksStatus.MeleeMiddle, x: 78.5, y: 25, img: 'dire_rax_angle.png', sizeClass: 'w-6' },
    { id: 'dire_rax_mid_r', name: 'Middle Ranged Barracks', type: 'rax', bit: BarracksStatus.RangedMiddle, x: 75.5, y: 22.5, img: 'dire_rax_angle.png', sizeClass: 'w-6' },
    { id: 'dire_rax_bot_m', name: 'Bottom Melee Barracks', type: 'rax', bit: BarracksStatus.MeleeBottom, x: 89, y: 27.5, img: 'dire_rax.png', sizeClass: 'w-6' },
    { id: 'dire_rax_bot_r', name: 'Bottom Ranged Barracks', type: 'rax', bit: BarracksStatus.RangedBottom, x: 85, y: 27.5, img: 'dire_rax.png', sizeClass: 'w-6' },

    { id: 'dire_fort', name: 'Dire Ancient', type: 'fort', x: 85.5, y: 15.5, img: 'dire_fort.png', sizeClass: 'w-6' },
];

export const MatchOverviewTab: React.FC = () => {
    const { matchId, generalInformation } = useOutletContext<MatchOutletContext>();
    const { data: overview, isLoading, isError } = useMatchOverview(matchId);

    const matchWinner = generalInformation.winner.value === TeamEnum.Radiant ? TeamEnum.Radiant : TeamEnum.Dire;

    const { radiantDraft, direDraft } = useMemo(() => {
        const rad = { picks: [] as PickBanDto[], bans: [] as PickBanDto[]  };
        const dire = { picks: [] as PickBanDto[] , bans: [] as PickBanDto[] };

        if (overview?.picksBans) {
            const sorted = [...overview.picksBans].sort((a, b) => a.order - b.order);
            sorted.forEach(pb => {
                const target = pb.team.value === TeamEnum.Radiant ? rad : dire;
                if (pb.isPick) target.picks.push(pb);
                else target.bans.push(pb);
            });
        }
        return { radiantDraft: rad, direDraft: dire };
    }, [overview]);

    if (isLoading) return <LoadingSpinner text="Loading Match Overview..." />;
    if (isError || !overview) return <ErrorDisplay message="Failed to load match overview." />;

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 pb-10 space-y-6">

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {(radiantDraft.picks.length > 0 || radiantDraft.bans.length > 0 || direDraft.picks.length > 0 || direDraft.bans.length > 0)
                    && (<div className="flex flex-col gap-6">
                    <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden p-5 relative">
                        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Icon src="/assets/images/radiant.png" size={6} />
                                <h3 className="text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest">Radiant Draft</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-[#58606e] font-bold uppercase tracking-widest">Bans</span>
                                    <div className="flex flex-wrap gap-2">
                                        {radiantDraft.bans.map(b => (
                                            <div key={b.order} className="relative group/ban grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 scale-90 origin-left">
                                                <HeroCell heroId={b.heroId} showName={false} />
                                                <div className="absolute inset-0 mix-blend-color pointer-events-none" />
                                                <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-4 h-4 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#808fa6]">{b.order}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-[#58606e] font-bold uppercase tracking-widest">Picks</span>
                                    <div className="flex flex-wrap gap-3">
                                        {radiantDraft.picks.map(p => (
                                            <div key={p.order} className="relative group/pick transform transition-transform duration-300 hover:-translate-y-1">
                                                <HeroCell heroId={p.heroId} showName={false} />
                                                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-4 h-4 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#e7d291]">{p.order}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden p-5 relative">
                        <div className="absolute inset-0 bg-linear-to-r from-red-500/10 via-transparent to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Icon src="/assets/images/dire.png" size={6} />
                                <h3 className="text-lg font-serif font-bold text-red-400 uppercase tracking-widest">Dire Draft</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-[#58606e] font-bold uppercase tracking-widest">Bans</span>
                                    <div className="flex flex-wrap gap-2">
                                        {direDraft.bans.map(b => (
                                            <div key={b.order} className="relative group/ban grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 scale-90 origin-left">
                                                <HeroCell heroId={b.heroId} showName={false} />
                                                <div className="absolute inset-0 mix-blend-color pointer-events-none" />
                                                <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-4 h-4 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#808fa6]">{b.order}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-[#58606e] font-bold uppercase tracking-widest">Picks</span>
                                    <div className="flex flex-wrap gap-3">
                                        {direDraft.picks.map(p => (
                                            <div key={p.order} className="relative group/pick transform transition-transform duration-300 hover:-translate-y-1">
                                                <HeroCell heroId={p.heroId} showName={false} />
                                                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-4 h-4 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#e7d291]">{p.order}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden p-5 flex flex-col items-center justify-center relative">
                    <h3 className="text-lg font-serif font-bold text-[#e3e3e3] uppercase tracking-widest mb-6 w-full text-center">
                        Building Status
                    </h3>

                    <div className="relative w-full max-w-[500px] aspect-square rounded-xl border border-[#2e353b] bg-[#0f1114]">
                        <img
                            src="/assets/images/detailed_740.webp"
                            alt="Map"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
                        />

                        {RADIANT_BUILDINGS.map((b) => {
                            let isAlive = true;
                            if (b.type === 'tower' && b.bit !== undefined) {
                                isAlive = (overview.radiantTowersStatus.value & b.bit) !== 0;
                            } else if (b.type === 'rax' && b.bit !== undefined) {
                                isAlive = (overview.radiantBarracksStatus.value & b.bit) !== 0;
                            } else if (b.type === 'fort') {
                                isAlive = matchWinner !== TeamEnum.Dire;
                            }

                            return (
                                <div
                                    key={b.id}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-60 transition-all duration-300 group/building cursor-help"
                                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                                >
                                    <img
                                        src={`/assets/images/${b.img}`}
                                        alt={b.name}
                                        className={clsx("object-contain drop-shadow-md", b.sizeClass)}
                                        style={{ filter: isAlive ? 'none' : 'grayscale(100%) brightness(70%) opacity(0.8)' }}
                                    />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-[#1a1d24]/95 border border-[#2e353b] p-2 rounded shadow-xl opacity-0 invisible group-hover/building:opacity-100 group-hover/building:visible transition-all z-50 pointer-events-none flex flex-col items-center">
                                        <span className="text-xs font-bold text-[#e3e3e3]">{b.name}</span>
                                        <span className={clsx("text-xs font-bold uppercase tracking-widest", isAlive ? "text-emerald-400" : "text-red-400")}>
                                            {isAlive ? "Alive" : "Destroyed"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        {DIRE_BUILDINGS.map((b) => {
                            let isAlive = true;
                            if (b.type === 'tower' && b.bit !== undefined) {
                                isAlive = (overview.direTowersStatus.value & b.bit) !== 0;
                            } else if (b.type === 'rax' && b.bit !== undefined) {
                                isAlive = (overview.direBarracksStatus.value & b.bit) !== 0;
                            } else if (b.type === 'fort') {
                                isAlive = matchWinner !== TeamEnum.Radiant;
                            }

                            return (
                                <div
                                    key={b.id}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-60 transition-all duration-300 group/building cursor-help"
                                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                                >
                                    <img
                                        src={`/assets/images/${b.img}`}
                                        alt={b.name}
                                        className={clsx("object-contain drop-shadow-md", b.sizeClass)}
                                        style={{ filter: isAlive ? 'none' : 'grayscale(100%) brightness(70%) opacity(0.8)' }}
                                    />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-[#1a1d24]/95 border border-[#2e353b] p-2 rounded shadow-xl opacity-0 invisible group-hover/building:opacity-100 group-hover/building:visible transition-all z-50 pointer-events-none flex flex-col items-center">
                                        <span className="text-xs font-bold text-[#e3e3e3]">{b.name}</span>
                                        <span className={clsx("text-xs font-bold uppercase tracking-widest", isAlive ? "text-emerald-400" : "text-red-400")}>
                                            {isAlive ? "Alive" : "Destroyed"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};
