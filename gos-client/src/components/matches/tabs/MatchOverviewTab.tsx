import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchOverview } from '../../../hooks/queries/useMatchOverview';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { HeroCell } from '../../heroes/HeroCell';
import { Icon } from '../../Icon';
import { TeamEnum } from '../../../types/common';
import {BarracksStatus, type PickBanDto, TowerStatus} from '../../../types/matchOverview';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import { isRadiantTeam } from '../../../utils/matchUtils';

interface BuildingConfig {
    id: string;
    type: 'tower' | 'rax' | 'fort';
    x: number;
    y: number;
    img: string;
    bit?: number;
    sizeClass: string;
}

const RADIANT_BUILDINGS: BuildingConfig[] = [
    { id: 'rad_t1_top', type: 'tower', bit: TowerStatus.TopTier1, x: 12, y: 44, img: 'radiant_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t2_top', type: 'tower', bit: TowerStatus.TopTier2, x: 12, y: 62, img: 'radiant_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t3_top', type: 'tower', bit: TowerStatus.TopTier3, x: 12, y: 74, img: 'radiant_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t1_mid', type: 'tower', bit: TowerStatus.MidTier1, x: 44, y: 55, img: 'radiant_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t2_mid', type: 'tower', bit: TowerStatus.MidTier2, x: 34, y: 65, img: 'radiant_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t3_mid', type: 'tower', bit: TowerStatus.MidTier3, x: 26, y: 73, img: 'radiant_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t1_bot', type: 'tower', bit: TowerStatus.BottomTier1, x: 82, y: 88, img: 'radiant_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t2_bot', type: 'tower', bit: TowerStatus.BottomTier2, x: 55, y: 88, img: 'radiant_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t3_bot', type: 'tower', bit: TowerStatus.BottomTier3, x: 28, y: 88, img: 'radiant_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t4_1', type: 'tower', bit: TowerStatus.T4Left, x: 17, y: 81, img: 'radiant_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_t4_2', type: 'tower', bit: TowerStatus.T4Right, x: 20, y: 84, img: 'radiant_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'rad_rax_top_m', type: 'rax', bit: BarracksStatus.MeleeTop, x: 10, y: 77, img: 'radiant_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'rad_rax_top_r', type: 'rax', bit: BarracksStatus.RangedTop, x: 14, y: 77, img: 'radiant_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'rad_rax_mid_m', type: 'rax', bit: BarracksStatus.MeleeMiddle, x: 22, y: 76, img: 'radiant_rax_angle.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'rad_rax_mid_r', type: 'rax', bit: BarracksStatus.RangedMiddle, x: 25, y: 79, img: 'radiant_rax_angle.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'rad_rax_bot_m', type: 'rax', bit: BarracksStatus.MeleeBottom, x: 26, y: 86, img: 'radiant_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'rad_rax_bot_r', type: 'rax', bit: BarracksStatus.RangedBottom, x: 26, y: 90, img: 'radiant_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'rad_fort', type: 'fort', x: 14, y: 86, img: 'radiant_fort.png', sizeClass: 'w-8 sm:w-12' },
];

const DIRE_BUILDINGS: BuildingConfig[] = [
    { id: 'dire_t1_top', type: 'tower', bit: TowerStatus.TopTier1, x: 18, y: 15, img: 'dire_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t2_top', type: 'tower', bit: TowerStatus.TopTier2, x: 45, y: 15, img: 'dire_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t3_top', type: 'tower', bit: TowerStatus.TopTier3, x: 72, y: 15, img: 'dire_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t1_mid', type: 'tower', bit: TowerStatus.MidTier1, x: 55, y: 44, img: 'dire_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t2_mid', type: 'tower', bit: TowerStatus.MidTier2, x: 65, y: 34, img: 'dire_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t3_mid', type: 'tower', bit: TowerStatus.MidTier3, x: 74, y: 26, img: 'dire_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t1_bot', type: 'tower', bit: TowerStatus.BottomTier1, x: 88, y: 56, img: 'dire_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t2_bot', type: 'tower', bit: TowerStatus.BottomTier2, x: 88, y: 38, img: 'dire_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t3_bot', type: 'tower', bit: TowerStatus.BottomTier3, x: 88, y: 28, img: 'dire_tower.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t4_1', type: 'tower', bit: TowerStatus.T4Left, x: 80, y: 16, img: 'dire_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_t4_2', type: 'tower', bit: TowerStatus.T4Right, x: 83, y: 19, img: 'dire_tower_angle.png', sizeClass: 'w-4 sm:w-6' },
    { id: 'dire_rax_top_m', type: 'rax', bit: BarracksStatus.MeleeTop, x: 74, y: 10, img: 'dire_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'dire_rax_top_r', type: 'rax', bit: BarracksStatus.RangedTop, x: 74, y: 14, img: 'dire_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'dire_rax_mid_m', type: 'rax', bit: BarracksStatus.MeleeMiddle, x: 75, y: 21, img: 'dire_rax_angle.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'dire_rax_mid_r', type: 'rax', bit: BarracksStatus.RangedMiddle, x: 78, y: 24, img: 'dire_rax_angle.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'dire_rax_bot_m', type: 'rax', bit: BarracksStatus.MeleeBottom, x: 86, y: 23, img: 'dire_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'dire_rax_bot_r', type: 'rax', bit: BarracksStatus.RangedBottom, x: 90, y: 23, img: 'dire_rax.png', sizeClass: 'w-3 sm:w-4.5' },
    { id: 'dire_fort', type: 'fort', x: 86, y: 14, img: 'dire_fort.png', sizeClass: 'w-8 sm:w-12' },
];

export const MatchOverviewTab: React.FC = () => {
    const { matchId, players } = useOutletContext<MatchOutletContext>();
    const { data: overview, isLoading, isError } = useMatchOverview(matchId);

    const matchWinner = useMemo(() => {
        if (!players || players.length === 0) return null;
        const anyRadiant = players.find(p => isRadiantTeam(p.isRadiant));
        if (!anyRadiant) return null;
        return anyRadiant.isRadiant.value === 1 && anyRadiant.isRadiant ? TeamEnum.Radiant : TeamEnum.Dire;
    }, [players]);

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

                <div className="flex flex-col gap-6">
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
                </div>

                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden p-5 flex flex-col items-center justify-center relative">
                    <h3 className="text-lg font-serif font-bold text-[#e3e3e3] uppercase tracking-widest mb-6 w-full text-center">
                        Building Status
                    </h3>

                    <div className="relative w-full max-w-[500px] aspect-square rounded-xl border border-[#2e353b] overflow-hidden bg-[#0f1114]">
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
                                isAlive = matchWinner !== TeamEnum.Radiant;
                            }

                            return (
                                <div
                                    key={b.id}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 drop-shadow-md"
                                    style={{
                                        left: `${b.x}%`,
                                        top: `${b.y}%`,
                                        filter: isAlive ? 'none' : 'grayscale(100%) brightness(70%) opacity(0.8)'
                                    }}
                                >
                                    <img src={`/assets/images/${b.img}`} alt={b.id} className={clsx("object-contain", b.sizeClass)} />
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
                                isAlive = matchWinner !== TeamEnum.Dire;
                            }

                            return (
                                <div
                                    key={b.id}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 drop-shadow-md"
                                    style={{
                                        left: `${b.x}%`,
                                        top: `${b.y}%`,
                                        filter: isAlive ? 'none' : 'grayscale(100%) brightness(70%) opacity(0.8)'
                                    }}
                                >
                                    <img src={`/assets/images/${b.img}`} alt={b.id} className={clsx("object-contain", b.sizeClass)} />
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};
