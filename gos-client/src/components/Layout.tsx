import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { MAIN_NAVIGATION, APP_ROUTES } from '../config/navigation';
import { UserMenu } from './UserMenu';
import {Icon} from "./Icon.tsx";

export const Layout: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen bg-[#0b0e13] flex flex-col font-sans text-[#e3e3e3]">
            {/* --- NAVIGATION BAR --- */}
            <nav className="bg-[#15171c]/95 backdrop-blur-md border-b border-[#2e353b] sticky top-0 z-50 transition-all">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center relative">

                    {/* LEFT: Logo (абсолютно слева) */}
                    <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex-shrink-0 flex items-center gap-3">
                        <Link to={APP_ROUTES.HOME} className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                            <div className="relative w-9 h-9 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <Icon src={"/gaze-of-skadi.png"} />
                            </div>
                            <span className="font-serif font-bold text-xl text-white tracking-tight sm:block">
                    Gaze of Skadi
                </span>
                        </Link>
                    </div>

                    {/* CENTER: Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {MAIN_NAVIGATION.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/' && location.pathname.startsWith(item.path));

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        "relative px-4 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all duration-200 group flex items-center gap-2",
                                        isActive
                                            ? "text-white bg-[#2e353b]/50"
                                            : "text-[#808fa6] hover:text-white hover:bg-[#2e353b]/30"
                                    )}
                                >
                                    {item.icon && (
                                        <img
                                            src={item.icon}
                                            className={clsx("w-5 h-5 object-contain transition-all", isActive ? "opacity-100" : "opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100")}
                                            alt=""
                                        />
                                    )}
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e7d291] shadow-[0_0_8px_#e7d291]" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT: User Menu & Mobile Toggle (абсолютно справа) */}
                    <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                        <UserMenu />

                        {/* Mobile Hamburger */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 rounded-md text-[#808fa6] hover:text-white hover:bg-[#2e353b] focus:outline-none transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* --- MOBILE MENU (Collapsible) --- */}
                <div className={clsx(
                    "lg:hidden border-t border-[#2e353b] bg-[#15171c] overflow-hidden transition-all duration-300 ease-in-out origin-top",
                    isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
                        {MAIN_NAVIGATION.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/' && location.pathname.startsWith(item.path));

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMobileMenu}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-3 rounded-md text-base font-bold uppercase tracking-wider",
                                        isActive
                                            ? "bg-[#e7d291]/10 text-[#e7d291] border-l-4 border-[#e7d291]"
                                            : "text-[#808fa6] hover:bg-[#2e353b] hover:text-white"
                                    )}
                                >
                                    {item.icon && <Icon size={8} src={item.icon} />}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden relative z-0">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#0f1114] border-t border-[#2e353b] py-8 mt-auto relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/gaze-of-skadi.png" alt="Logo" className="w-6 h-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all" />
                        <span className="text-[#58606e] text-sm">
                            © {new Date().getFullYear()} Gaze of Skadi.
                        </span>
                    </div>
                    <div className="text-[#58606e] text-xs text-center md:text-right">
                        <p>Dota 2 is a registered trademark of Valve Corporation.</p>
                        <p className="mt-1">Powered by Steam Web API & OpenDota Web API.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
