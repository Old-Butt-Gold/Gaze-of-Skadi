import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchChat } from '../../../hooks/queries/useMatchChat';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { HeroCell } from '../../heroes/HeroCell';
import { Icon } from '../../Icon';
import { formatDuration } from '../../../utils/formatUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import { ChatType } from "../../../types/matchChat.ts";
import { isRadiantTeam } from "../../../utils/matchUtils.ts";
import { APP_ROUTES } from '../../../config/navigation';

export const MatchChatTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();

    const [showRegularChat, setShowRegularChat] = useState(true);
    const [showChatWheel, setShowChatWheel] = useState(true);

    const { data: chatData, isLoading, isError } = useMatchChat(matchId, isParsed);

    if (!isParsed) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#2e353b] rounded-2xl bg-[#15171c]/50 mt-6 w-full lg:w-[90%] mx-auto">
                <span className="text-6xl mb-4 opacity-50 grayscale">🔒</span>
                <h2 className="text-2xl font-bold text-white mb-2">Parse Required</h2>
                <p className="text-[#808fa6] max-w-md text-center leading-relaxed px-4">
                    Chat logs are only available for parsed matches.
                </p>
            </div>
        );
    }
    if (isLoading) return <div className="mt-10"><LoadingSpinner text="Decrypting Chat Logs..." /></div>;
    if (isError) return <div className="mt-10"><ErrorDisplay message="Failed to load chat." /></div>;
    if (!chatData || chatData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No chat messages found in this match.</div>;
    }

    const filteredChat = chatData.filter(msg => {
        const isWheel = msg.data.type.value === ChatType.ChatWheel;
        if (isWheel && !showChatWheel) return false;
        if (!isWheel && !showRegularChat) return false;
        return true;
    });

    const playSound = (url: string) => {

        const audio = document.createElement('audio');
        audio.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        audio.src = url;
        audio.play().catch(e => console.error("Error playing sound:", e));
    };

    return (
        <div className="space-y-6 w-full lg:w-[90%] mx-auto">

            <div className="flex flex-wrap items-center justify-end gap-3 bg-[#15171c] p-4 rounded-xl border border-[#2e353b] shadow-sm">
                <span className="text-xs font-bold text-[#58606e] uppercase tracking-widest mr-2">Filters:</span>

                <button
                    onClick={() => setShowRegularChat(!showRegularChat)}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all",
                        showRegularChat
                            ? "bg-[#2e353b] border-[#58606e] text-white shadow-inner"
                            : "bg-[#0f1114] border-[#2e353b] text-[#58606e] hover:border-[#4a5568] hover:text-[#808fa6]"
                    )}
                >
                    Text Chat
                </button>

                <button
                    onClick={() => setShowChatWheel(!showChatWheel)}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all",
                        showChatWheel
                            ? "bg-[#e7d291]/10 border-[#e7d291]/50 text-[#e7d291] shadow-inner"
                            : "bg-[#0f1114] border-[#2e353b] text-[#58606e] hover:border-[#e7d291]/30 hover:text-[#e7d291]/70"
                    )}
                >
                    <img
                        src="/assets/images/chat_wheel_icon.png"
                        alt="Wheel"
                        className={clsx("w-4 h-4 transition-opacity", showChatWheel ? "opacity-100" : "opacity-30")}
                    />
                    Chat Wheel
                </button>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">
                <div className="flex flex-col">
                    {filteredChat.length === 0 ? (
                        <div className="py-16 flex flex-col items-center justify-center text-[#58606e]">
                            <span className="text-4xl mb-3 opacity-30">🔕</span>
                            <span className="uppercase tracking-widest text-xs font-bold">No messages match the current filters</span>
                        </div>
                    ) : (
                        filteredChat.map((msg, idx) => {
                            const player = players[msg.playerIndex];
                            if (!player) return null;

                            const isRadiant = isRadiantTeam(player.isRadiant);
                            const isWheel = msg.data.type.value === ChatType.ChatWheel;

                            return (
                                <div
                                    key={idx}
                                    className={clsx(
                                        "flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 md:p-4 hover:bg-[#1a1d24] transition-colors border-b border-[#2e353b]/30 last:border-b-0 relative group",
                                        isRadiant ? "border-l-4 border-l-emerald-500/50" : "border-l-4 border-l-red-500/50"
                                    )}
                                >
                                    <div className="font-mono text-xs md:text-sm text-[#58606e] w-12 shrink-0 group-hover:text-[#808fa6] transition-colors md:text-right pt-0.5">
                                        {formatDuration(msg.data.time)}
                                    </div>

                                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-3">
                                        <div className="flex items-center gap-3 sm:w-56 shrink-0">
                                            <HeroCell heroId={player.heroId} showName={false} />
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <Icon src={isRadiant ? "/assets/images/radiant.png" : "/assets/images/dire.png"} size={5} />

                                                {player.accountId ? (
                                                    <Link
                                                        to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
                                                        className={clsx(
                                                            "font-bold text-sm drop-shadow-sm hover:underline hover:opacity-80 transition-all",
                                                            isRadiant ? "text-emerald-400" : "text-red-400"
                                                        )}
                                                    >
                                                        {player.personaName || 'Unknown'}
                                                    </Link>
                                                ) : (
                                                    <span className={clsx(
                                                        "font-bold text-sm drop-shadow-sm",
                                                        isRadiant ? "text-emerald-400" : "text-red-400"
                                                    )}>
                                                        {player.personaName || 'Unknown'}
                                                    </span>
                                                )}

                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-wrap items-center gap-3 bg-[#0b0e13]/50 border border-[#2e353b]/50 px-4 py-2.5 rounded-lg shadow-inner">

                                            {isWheel && (
                                                <Icon src="/assets/images/chat_wheel_icon.png" size={4}/>
                                            )}

                                            {msg.data.soundUrl && (
                                                <button
                                                    onClick={() => playSound(msg.data.soundUrl!)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2e353b] hover:bg-[#e7d291] text-[#e7d291] hover:text-[#1a1d24] transition-all shrink-0 hover:scale-110 shadow-md"
                                                    title="Play Sound"
                                                >
                                                    <Icon src="/assets/images/sound_icon.svg" size={5} />
                                                </button>
                                            )}

                                            {msg.data.message && (
                                                <span className={clsx(
                                                    "text-md wrap-break-word",
                                                    isWheel ? "text-[#e7d291] font-medium" : "text-white"
                                                )}>
                                                    {msg.data.message}
                                                </span>
                                            )}

                                            {msg.data.imageUrl && (
                                                <img
                                                    src={msg.data.imageUrl}
                                                    alt="Emoticon"
                                                    referrerPolicy="no-referrer"
                                                    className="h-24 drop-shadow-md"
                                                />
                                            )}
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};
