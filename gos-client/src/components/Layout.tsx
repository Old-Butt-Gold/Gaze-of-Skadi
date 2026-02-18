import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { MAIN_NAVIGATION, APP_ROUTES } from '../config/navigation';
import { UserMenu } from './UserMenu';
import { Icon } from "./Icon.tsx";

export const Layout: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen bg-[#0b0e13] flex flex-col font-sans text-[#e3e3e3]">
            <nav className="bg-[#15171c]/95 backdrop-blur-md border-b border-[#2e353b] sticky top-0 z-50 transition-all">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between xl:justify-center relative">
                    <div className="xl:absolute xl:left-6 top-1/2 xl:-translate-y-1/2 flex-shrink-0 flex items-center gap-3 z-20">
                        <Link to={APP_ROUTES.HOME} className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <Icon src={"/gaze-of-skadi.png"} />
                            </div>
                        </Link>
                    </div>

                    {/* CENTER: Desktop Navigation */}
                    <div className="hidden xl:flex items-center space-x-1">
                        {MAIN_NAVIGATION.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        "relative px-3 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all duration-200 group flex items-center gap-2",
                                        isActive
                                            ? "text-white bg-[#2e353b]/50"
                                            : "text-[#808fa6] hover:text-white hover:bg-[#2e353b]/30"
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e7d291] shadow-[0_0_8px_#e7d291]" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT: User Menu & Mobile Toggle */}
                    <div className="xl:absolute xl:right-6 top-1/2 xl:-translate-y-1/2 flex items-center gap-4 z-20">
                        <UserMenu />

                        <button
                            onClick={toggleMobileMenu}
                            className="xl:hidden p-2 rounded-md text-[#808fa6] hover:text-white hover:bg-[#2e353b] focus:outline-none transition-colors"
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

                {/* --- MOBILE MENU --- */}
                <div className={clsx(
                    "xl:hidden border-t border-[#2e353b] bg-[#15171c] overflow-hidden transition-all duration-300 ease-in-out origin-top absolute w-full z-40 shadow-2xl",
                    isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
                        {MAIN_NAVIGATION.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMobileMenu}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-3 rounded-md text-base font-bold uppercase tracking-wider transition-colors",
                                        isActive
                                            ? "bg-[#e7d291]/10 text-[#e7d291] border-l-4 border-[#e7d291]"
                                            : "text-[#808fa6] hover:bg-[#2e353b] hover:text-white border-l-4 border-transparent"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden relative z-0">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#0f1114] border-t border-[#2e353b] py-8 mt-auto relative">
                <div className="mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/gaze-of-skadi.png" alt="Logo" className="w-6 h-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all" />
                        <span className="text-[#58606e] text-sm">
                            © {new Date().getFullYear()} Gaze of Skadi.
                        </span>
                    </div>
                    <div className="text-[#58606e] text-sm text-center md:text-right">
                        <p>Dota 2 is a registered trademark of Valve Corporation.</p>
                        <p className="mt-1">Powered by Steam Web API & OpenDota Web API.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
