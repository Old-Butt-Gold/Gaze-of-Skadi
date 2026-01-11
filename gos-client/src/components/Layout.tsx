import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { MAIN_NAVIGATION, APP_ROUTES } from '../config/navigation';

export const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex justify-content: flex-end flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo & Brand */}
                        <Link to={APP_ROUTES.HOME} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <img
                                src="/gaze-of-skadi.png"
                                alt="Gaze of Skadi Logo"
                                className="h-10 w-10 object-contain rounded-full bg-slate-100 p-1"
                            />
                            <span className="font-bold text-xl text-slate-800 tracking-tight">
                                Gaze of Skadi
                            </span>
                        </Link>
                        {/* Navigation Links (Generated from Config) */}
                        <div className="hidden md:block">
                            <div className="flex gap-2">
                                {MAIN_NAVIGATION.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={clsx(
                                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-slate-900 text-white shadow-md"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            )}
                                        >
                                            {/* Если у пункта меню есть иконка, отображаем её */}
                                            {item.icon && (
                                                <img
                                                    src={item.icon}
                                                    alt=""
                                                    className={clsx(
                                                        "w-5 h-5 object-contain",
                                                        isActive ? "opacity-100" : "opacity-70 grayscale hover:grayscale-0 transition-all"
                                                    )}
                                                />
                                            )}
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-[90%] mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
                © {new Date().getFullYear()} Gaze of Skadi. Dota 2 Analytics.
            </footer>
        </div>
    );
};
