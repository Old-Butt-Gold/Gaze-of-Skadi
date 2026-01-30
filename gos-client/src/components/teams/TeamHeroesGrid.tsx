import React from 'react';
import type {TeamHeroDto} from '../../types/teams';
import { HeroCell } from '../heroes/HeroCell';
import clsx from 'clsx';

interface Props {
    heroes: TeamHeroDto[];
}

export const TeamHeroesGrid: React.FC<Props> = ({ heroes }) => {
    // Sort by games played desc
    const sortedHeroes = [...heroes].sort((a, b) => b.gamesPlayed - a.gamesPlayed);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedHeroes.map((hero) => {
                const winRate = hero.gamesPlayed > 0 ? (hero.wins / hero.gamesPlayed) * 100 : 0;

                return (
                    <div key={hero.heroId} className="bg-[#1a1d24] border border-[#2e353b] rounded-lg p-3 flex items-center justify-between hover:bg-[#1e222b] transition-colors">
                        <HeroCell heroId={hero.heroId} />

                        <div className="text-right">
                            <div className="text-[#e3e3e3] font-mono font-bold text-sm">
                                {hero.gamesPlayed} <span className="text-[#58606e] text-[10px]">Games</span>
                            </div>
                            <div className={clsx(
                                "text-xs font-bold",
                                winRate >= 55 ? "text-emerald-400" : winRate >= 48 ? "text-[#e7d291]" : "text-[#808fa6]"
                            )}>
                                {winRate.toFixed(1)}% WR
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
