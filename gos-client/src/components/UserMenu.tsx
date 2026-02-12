import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {useAuth} from "../hooks/queries/useAuth.ts";
import {Icon} from "./Icon.tsx";
import {APP_ROUTES} from "../config/navigation.ts";

export const UserMenu: React.FC = () => {
    const { isAuthenticated, user, login, logout, isLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isLoading) {
        return <div className="w-10 h-10 rounded bg-[#2e353b] animate-pulse" />;
    }

    // Состояние: Не авторизован
    if (!isAuthenticated) {
        return (
            <button onClick={login}
                    className="flex items-center gap-2 bg-[#2a475e] hover:bg-[#365b77] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            >
                <Icon src="/assets/images/steam_icon.png" fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" size={5} />
                <span>Login</span>
            </button>
        );
    }

    const accountId = user?.steam_id32;

    // Состояние: Авторизован
    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "group flex items-center gap-3 pl-4 pr-1 py-1 rounded-lg transition-all duration-200 outline-none",
                    isOpen ? "bg-[#ffffff]/5" : "hover:bg-[#ffffff]/5"
                )}
            >
                {/* Text Info */}
                <div className="text-right hidden sm:block">
                    <div className={clsx(
                        "text-sm font-bold transition-colors truncate max-w-[120px]",
                        isOpen ? "text-white" : "text-[#e3e3e3] group-hover:text-white"
                    )}>
                        {user?.steam_steamname}
                    </div>
                </div>

                {/* Avatar Wrapper */}
                <div className={clsx(
                    "w-10 h-10 p-[2px] rounded border transition-all duration-300 shadow-sm overflow-hidden relative",
                    isOpen
                        ? "border-[#e7d291] bg-[#e7d291]"
                        : "border-[#2e353b] bg-[#15171c] group-hover:border-[#e7d291] group-hover:bg-[#2e353b]"
                )}>
                    <Icon src={user?.steam_avatar ?? "/assets/images/unknown_player.png"} alt="Profile" />
                </div>

                {/* Chevron */}
                <svg
                    className={clsx(
                        "w-4 h-4 text-[#58606e] transition-transform duration-200 hidden sm:block",
                        isOpen ? "rotate-180 text-[#e7d291]" : "group-hover:text-[#e7d291]"
                    )}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#15171c] border border-[#2e353b] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/50">

                    {/* Header for Mobile only */}
                    <div className="px-4 py-3 border-b border-[#2e353b] sm:hidden bg-[#0f1114]/50">
                        <p className="text-sm font-bold text-white truncate">{user?.steam_steamname}</p>
                    </div>

                    <div className="py-1">
                        {/* 1. Internal Profile Link */}
                        <Link
                            to={`${APP_ROUTES.PLAYERS}/${accountId}`}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#e3e3e3] hover:bg-[#e7d291] hover:text-[#0f1114] transition-all group/item"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-4 h-4 text-[#58606e] group-hover/item:text-[#0f1114] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Stats
                        </Link>

                        {/* 2. External Steam Link */}
                        <a href={user?.steam_profileurl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#a3aab8] hover:bg-[#e7d291] hover:text-[#0f1114] transition-all group/item"
                           onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-4 h-4 text-[#58606e] group-hover/item:text-[#0f1114] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Steam Profile
                        </a>
                    </div>

                    <div className="my-1 border-t border-[#2e353b]"></div>

                    {/* 3. Logout */}
                    <button
                        onClick={() => { setIsOpen(false); logout(); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
                    >
                        <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};
