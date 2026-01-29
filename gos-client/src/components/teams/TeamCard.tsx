import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { TeamDto } from '../../types/teams';
import { formatRelativeTime } from '../../utils/formatUtils';
import { Icon } from '../Icon';

interface Props {
    team: TeamDto & { rank: number };
}

export const TeamCard: React.FC<Props> = ({ team }) => {
    const totalGames = team.wins + team.losses;
    const winRate = totalGames > 0 ? (team.wins / totalGames) * 100 : 0;

    const winRateColor = winRate >= 60 ? 'text-emerald-400'
        : winRate >= 50 ? 'text-[#e7d291]'
            : 'text-[#808fa6]';

    return (
        <Link
            to={`/teams/${team.teamId}`}
            className="group relative bg-[#1a1d24] border border-[#2e353b] hover:border-[#4a5568] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-1 block"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute top-0 left-0 bg-[#2e353b] text-[#e7d291] text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-md z-10 font-mono border-r border-b border-black/50">
                #{team.rank}
            </div>

            <div className="relative p-5 flex flex-col h-full">

                {/* Header: Logo & Name */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#0f1114] rounded-lg border border-[#2e353b] flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-blue-900/20 transition-shadow overflow-hidden">
                        <Icon
                            src={team.logoUrl || "fallback"}
                            size={12}
                            fallbackSrc="/assets/images/icon_team_default.png"
                            alt={team.tag || "Team Logo"}
                        />
                    </div>
                    <div className="min-w-0">
                        <h3 className={clsx(
                            "text-lg font-bold font-serif tracking-wide truncate transition-colors",
                            team.name ? "text-white group-hover:text-[#e7d291]" : "text-[#58606e] italic"
                        )}>
                            {team.name || 'Unknown'}
                        </h3>
                        <span className="text-xs font-bold text-[#58606e] uppercase tracking-wider bg-[#15171c] px-2 py-0.5 rounded border border-[#2e353b]">
                            {team.tag || 'No Tag'}
                        </span>
                    </div>
                </div>

                <div className="h-px w-full bg-[#2e353b] mb-4" />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-y-3 text-sm flex-grow">
                    <div>
                        <div className="text-[10px] uppercase text-[#58606e] font-bold tracking-wider mb-0.5">Rating</div>
                        <div className="text-[#e7d291] font-mono font-bold text-lg leading-none">
                            {team.rating.toFixed(0)}
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-[10px] uppercase text-[#58606e] font-bold tracking-wider mb-0.5">Winrate</div>
                        <div className={clsx("font-mono font-bold text-lg leading-none", winRateColor)}>
                            {winRate.toFixed(2)}%
                        </div>
                        <div className="text-[10px] text-[#58606e]">
                            {team.wins}W - {team.losses}L
                        </div>
                    </div>

                    <div className="col-span-2 mt-2 pt-2 border-t border-[#2e353b]/50 flex items-center justify-between">
                        <span className="text-[10px] uppercase text-[#58606e] font-bold tracking-wider">Last Match</span>
                        <span className="text-xs text-[#808fa6] font-medium">
                            {formatRelativeTime(team.lastMatchTime)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
