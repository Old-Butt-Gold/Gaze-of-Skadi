import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import {APP_ROUTES} from "../config/navigation.ts";

export const SearchPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0b0e13] text-[#e3e3e3] pb-10 p-5">
            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-[#0b0e13]/95 backdrop-blur border-b border-[#2e353b] pb-4">
                <div className="mx-auto px-4">
                    <div className="flex gap-8 overflow-x-auto scrollbar-none">
                        <SearchTab to={APP_ROUTES.COMBOS} label="Hero Combos" />
                        <SearchTab to={APP_ROUTES.FINDPLAYERS} label="Find Players" />
                        <SearchTab to={APP_ROUTES.PUBMATCHES} label="Find Public Matches" />
                        <SearchTab to={APP_ROUTES.PROMATCHES} label="Find Pro Matches" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="mx-auto px-4 py-8">
                <Outlet />
            </div>
        </div>
    );
};

const SearchTab = ({ to, label }: { to: string, label: string }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => clsx(
                "relative py-4 text-sm font-bold uppercase tracking-widest transition-colors hover:text-white whitespace-nowrap",
                isActive ? "text-[#e7d291]" : "text-[#58606e]"
            )}
        >
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e7d291] shadow-[0_0_10px_rgba(231,210,145,0.5)] animate-in fade-in zoom-in duration-300" />
                    )}
                </>
            )}
        </NavLink>
    );
};
