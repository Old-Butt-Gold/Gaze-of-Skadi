import React from 'react';
import clsx from 'clsx';
import { useAbilities } from '../../hooks/queries/useAbilities';
import type { Talent, TalentLevel } from '../../types/heroAbility';
import {Icon} from "../Icon.tsx";

interface TalentTreeProps {
    talents: Talent[];
}

const LEVELS: TalentLevel[] = [4, 3, 2, 1];

const LEVEL_DISPLAY_MAP: Record<TalentLevel, number> = {
    4: 25,
    3: 20,
    2: 15,
    1: 10
};

export const TalentTree: React.FC<TalentTreeProps> = ({ talents }) => {
    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="bg-[#1a1d24] px-4 py-3 border-b border-[#2e353b] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <Icon src={"/assets/images/talents_tree.svg"} size={5} />
                    <h3 className="text-sm font-bold text-[#e3e3e3] uppercase tracking-widest font-serif">
                        Talent Tree
                    </h3>
                </div>
            </div>

            <div className="p-6 relative min-h-[300px]">
                <div className="absolute inset-0 bg-[#0f1114]/95" />

                <div className="absolute left-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#2e353b] to-transparent -translate-x-1/2 z-0" />

                <div className="relative z-10 flex flex-col gap-1">
                    {LEVELS.map((level) => {
                        const levelTalents = talents.filter(t => t.level === level);

                        const rightTalent = levelTalents[0];
                        const leftTalent = levelTalents[1];

                        return (
                            <TalentRow
                                key={level}
                                displayLevel={LEVEL_DISPLAY_MAP[level]}
                                leftTalent={leftTalent}
                                rightTalent={rightTalent}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const TalentRow = ({
                       displayLevel,
                       leftTalent,
                       rightTalent
                   }: {
    displayLevel: number,
    leftTalent?: Talent,
    rightTalent?: Talent
}) => {
    return (
        <div className="flex items-center justify-between relative py-2 group hover:bg-white/[0.02] transition-colors rounded-lg">
            <TalentCell talent={leftTalent} side="left" />

            <div className="shrink-0 z-10 mx-4">
                <div className="w-12 h-12 rounded-full bg-[#15171c] border-2 border-[#2e353b] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:border-[#58606e] group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-radial-gradient from-[#e7d291]/10 to-transparent opacity-50" />

                    <span
                        className="font-serif font-black text-xl leading-none relative z-10 select-none"
                        style={{
                            color: '#e7d291',
                            textShadow: '0 0 10px rgba(255, 83, 28, 0.6)'
                        }}
                    >
                        {displayLevel}
                    </span>
                </div>
            </div>

            <TalentCell talent={rightTalent} side="right" />
        </div>
    );
};

const TalentCell = ({ talent, side }: { talent?: Talent, side: 'left' | 'right' }) => {
    const { getAbility } = useAbilities();

    const abilityData = talent ? getAbility(talent.name) : null;
    const displayName = abilityData?.dname || talent?.name || 'Empty';

    return (
        <div
            className={clsx(
                "flex-1 flex items-center h-full px-2 transition-all duration-300",
                side === 'left' ? "justify-end text-right" : "justify-start text-left",
                talent ? "opacity-100" : "opacity-20 grayscale"
            )}
        >
            <span
                className={clsx(
                    "text-xs md:text-sm font-medium leading-tight max-w-[200px] md:max-w-none",
                    talent
                        ? "text-[#a3aab8] group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                        : "text-[#2e353b]"
                )}
            >
                {displayName}
            </span>
        </div>
    );
};
