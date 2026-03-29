import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../config/navigation';

export const HomePage: React.FC = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh-64px)] flex flex-col bg-[#0f1114] overflow-hidden">
            <style>
                {`
                    @keyframes slow-pan {
                        0% { transform: scale(1) translate(0, 0); }
                        50% { transform: scale(1.05) translate(-1%, -2%); }
                        100% { transform: scale(1) translate(0, 0); }
                    }
                    .animate-bg-pan {
                        animation: slow-pan 30s ease-in-out infinite;
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                `}
            </style>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="/main-background.jpg"
                    alt="Dota 2 Background"
                    className="w-full h-full object-cover opacity-70 mix-blend-luminosity animate-bg-pan"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-slate-900/40 to-transparent"></div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-8 sm:pt-20 sm:pb-16 lg:pt-32 lg:pb-24">

                <div className="text-center mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">

                    <h1 className="relative text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl font-serif font-black tracking-widest uppercase mb-4 sm:mb-6">
                        <span className="absolute inset-0 bg-linear-to-r from-[#e7d291] via-[#f3e5ab] to-[#b88a44] bg-clip-text text-transparent opacity-40">
                            Gaze of Skadi
                        </span>
                        <span className="relative text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] via-[#f3e5ab] to-[#b88a44] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                            Gaze of Skadi
                        </span>
                    </h1>

                    <div className="relative py-2 px-2 sm:py-4 sm:px-6 md:px-12 w-full max-w-3xl">
                        <div className="absolute inset-0 from-[#0f1114]/80 via-[#0f1114]/40 to-transparent blur-md"></div>

                        <p className="relative text-sm sm:text-lg md:text-xl text-[#a3aab8] font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                            Unlock the ultimate <span className="text-[#e7d291] font-bold">Dota 2</span> analytics experience.
                            <br className="hidden sm:block"/> Dive deep into <span className="text-[#e3e3e3] font-bold">match details</span>, analytics of the <span className="text-[#e3e3e3] font-bold">players</span>, and master <span className="text-[#e3e3e3] font-bold">hero matchups</span>.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 w-full sm:w-auto">
                        <Link to={APP_ROUTES.SEARCH} className="w-full sm:w-auto px-8 py-3 sm:py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#b88a44] to-[#e7d291] text-[#0b0e13] hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(231,210,145,0.3)]">
                            Search Players
                        </Link>
                        <Link to={APP_ROUTES.HEROES} className="w-full sm:w-auto px-8 py-3 sm:py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest bg-[#15171c]/80 backdrop-blur-sm border border-[#2e353b] text-[#e3e3e3] hover:bg-[#1a1d24] transition-all transform hover:-translate-y-1">
                            Explore Heroes
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-12 sm:pb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

                    <FeatureCard
                        title="Deep Match Analytics"
                        description="Analyze laning phase efficiency, vision maps, and detailed teamfight breakdowns with position tracking."
                        icon={
                            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        }
                    />

                    <FeatureCard
                        title="Hero Matchups"
                        description="Stay ahead of the meta. Explore facets, talent trees, win rates, and optimal item builds for every hero."
                        icon={
                            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        }
                    />

                    <FeatureCard
                        title="Player Tracking"
                        description="Monitor your MMR progress, discover your most successful roles, and compare your stats against peers."
                        icon={
                            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                    />

                </div>
            </div>

        </div>
    );
};

const FeatureCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="relative flex flex-col items-center text-center p-5 sm:p-8 rounded-2xl bg-[#15171c]/40 backdrop-blur-md border border-[#2e353b]/80 hover:border-[#b88a44]/50 transition-all duration-500 shadow-xl group hover:-translate-y-2 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#b88a44]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#0b0e13] border border-[#2e353b] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 group-hover:bg-linear-to-br from-[#b88a44]/20 to-[#0b0e13] group-hover:border-[#e7d291]/50 text-[#808fa6] group-hover:text-[#e7d291]">
            {icon}
        </div>
        <h3 className="relative text-base sm:text-lg font-serif font-bold text-[#e3e3e3] uppercase tracking-widest mb-1.5 sm:mb-3 group-hover:text-[#e7d291] transition-colors duration-300">
            {title}
        </h3>
        <p className="relative text-xs sm:text-sm text-[#808fa6] leading-relaxed">
            {description}
        </p>
    </div>
);
