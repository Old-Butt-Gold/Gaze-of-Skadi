import React from 'react';
import { Link } from 'react-router-dom';
import type { TeamPlayerDto } from '../../types/teams';
import { Icon } from '../Icon';
import clsx from 'clsx';

interface Props {
    players: TeamPlayerDto[];
}

export const TeamRoster: React.FC<Props> = ({ players }) => {
    // Separate active and former players
    const activePlayers = players.filter(p => p.isCurrentTeamMember?.value === 1).sort((a, b) => b.gamesPlayed - a.gamesPlayed);
    const formerPlayers = players.filter(p => p.isCurrentTeamMember?.value !== 1).sort((a, b) => b.gamesPlayed - a.gamesPlayed);

    const PlayerCard = ({ player, isActive }: { player: TeamPlayerDto, isActive: boolean }) => {
        const winRate = player.gamesPlayed > 0 ? (player.wins / player.gamesPlayed) * 100 : 0;

        return (
            <Link
                to={`/players/${player.accountId}`} // Assuming you have a player profile route
                className={clsx(
                    "relative bg-[#1a1d24] border rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-1 block",
                    isActive
                        ? "border-[#2e353b] hover:border-[#e7d291]/50 hover:shadow-[0_0_15px_rgba(231,210,145,0.1)]"
                        : "border-[#2e353b]/50 opacity-90 hover:opacity-100 hover:border-[#4a5568]"
                )}
            >
                {/* Background Gradient */}
                <div className={clsx(
                    "absolute top-0 left-0 right-0 h-1",
                    isActive ? "bg-gradient-to-r from-emerald-500 to-emerald-700" : "bg-[#2e353b]"
                )} />

                <div className="p-4 flex items-center gap-4">
                    {/* Avatar with Ring */}
                    <div className={clsx(
                        "w-16 h-16 rounded-lg bg-[#0f1114] border-2 flex-shrink-0 overflow-hidden shadow-lg",
                        isActive ? "border-[#e7d291]/30" : "border-[#2e353b]"
                    )}>
                        <Icon src={player.imageUrl} size={16} fallbackSrc="/assets/images/unknown_pro.png" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                        <h4 className={clsx(
                            "font-bold text-base truncate transition-colors",
                            isActive ? "text-[#e3e3e3] group-hover:text-white" : "text-[#808fa6]"
                        )}>
                            {player.name || `Player ${player.accountId}`}
                        </h4>

                        <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                            <div className="flex flex-col">
                                <span className="text-[#58606e] text-[10px] uppercase font-bold">Games</span>
                                <span className="text-[#e3e3e3] font-bold">{player.gamesPlayed}</span>
                            </div>
                            <div className="w-px h-6 bg-[#2e353b]"></div>
                            <div className="flex flex-col">
                                <span className="text-[#58606e] text-[10px] uppercase font-bold">Winrate</span>
                                <span className={winRate >= 50 ? "text-emerald-400 font-bold" : "text-[#e3e3e3] font-bold"}>
                                    {winRate.toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="space-y-10">
            {/* Active Roster Section */}
            {activePlayers.length > 0 && (
                <section>
                    <h4 className="text-[#e7d291] font-serif font-bold text-lg mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#e7d291] rounded-full"></span>
                        Active Roster
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activePlayers.map(player => <PlayerCard key={player.accountId} player={player} isActive={true} />)}
                    </div>
                </section>
            )}

            {/* Former Players Section */}
            {formerPlayers.length > 0 && (
                <section>
                    <h4 className="text-[#808fa6] font-serif font-bold text-lg mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#2e353b] rounded-full"></span>
                        Former Players
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {formerPlayers.map(player => <PlayerCard key={player.accountId} player={player} isActive={false} />)}
                    </div>
                </section>
            )}
        </div>
    );
};
