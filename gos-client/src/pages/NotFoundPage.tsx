import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../config/navigation';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center overflow-hidden bg-slate-900">

            {/* 1. Background Atmosphere (Fog of War) */}
            <div className="absolute inset-0 z-0">
                {/* Dark noise texture or fog image */}
                <div className="absolute inset-0 bg-[url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/grey_painterly.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

                {/* Radial Gradient to focus center */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-950"></div>

            </div>

            {/* 2. Main Content Card (Glassmorphism + Dota HUD style) */}
            <div className="relative z-10 max-w-2xl w-full mx-4 p-8 md:p-12 text-center bg-black/40 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-2xl shadow-black/50 ring-1 ring-white/5">

                {/* Decorative Top Border (Like Dota Tooltip) */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

                {/* Icon: Broken Ward / Lost Vision */}
                <div className="flex justify-center mb-6">
                    <div className="relative group">
                        {/* Glowing Ring */}
                        <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-all duration-500"></div>

                        {/* SVG Icon */}
                        <div className="relative p-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-full border border-slate-600 shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
                                <path fillRule="evenodd" d="M1.32316 11.447C1.58332 10.9789 5.82943 3.5 12 3.5C18.1706 3.5 22.4167 10.9789 22.6768 11.447L22.9837 12L22.6768 12.553C22.4167 13.0211 18.1706 20.5 12 20.5C5.82943 20.5 1.58332 13.0211 1.32316 12.553L1.0163 12L1.32316 11.447ZM3.12521 12C3.65582 12.9069 6.94225 18.5 12 18.5C17.0578 18.5 20.3442 12.9069 20.8748 12C20.3442 11.0931 17.0578 5.5 12 5.5C6.94225 5.5 3.65582 11.0931 3.12521 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" clipRule="evenodd" />
                                {/* Cross line to symbolize blind */}
                                <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-80" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Glitch Text 404 */}
                <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-600 mb-2 tracking-tighter drop-shadow-lg relative inline-block">
                    404
                    <span className="absolute inset-0 text-red-500/10 blur-[2px] translate-x-1 animate-pulse" aria-hidden="true">404</span>
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold text-red-100 mb-4 uppercase tracking-widest font-serif drop-shadow-md">
                    Vision Lost
                </h2>

                <div className="space-y-4 mb-10">
                    <p className="text-slate-400 text-lg leading-relaxed">
                        You have wandered into the <span className="text-slate-200 font-semibold">Fog of War</span>.
                    </p>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Even a <span className="text-blue-400">Gem of True Sight</span> cannot reveal the path you are looking for. It may have been denied or relocated to another lane.
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to={APP_ROUTES.HOME}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-600 hover:border-blue-500/50 text-slate-200 uppercase font-bold tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-1"
                    >
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300"></div>

                        <img
                            src="/assets/images/not_found_icon.webp" // Используем существующую иконку или placeholder
                            className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-300"
                            alt=""
                        />
                        <span>Return to Fountain</span>

                        {/* Corner Accents (Dota HUD style) */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-500 group-hover:border-blue-400 transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-500 group-hover:border-blue-400 transition-colors"></div>
                    </Link>
                </div>
            </div>

            {/* Bottom Fog Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
        </div>
    );
};
