import React from 'react';
import { usePlayerWardMap } from '../../../hooks/queries/usePlayerWardMap';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { Icon } from '../../Icon';
import {HeatmapCanvas} from "../HeatmapCanvas.tsx";
import {useOutletContext} from "react-router-dom";
import type {PlayerOutletContext} from "../../../pages/PlayerDetailsPage.tsx";

export const PlayerWardMapTab: React.FC = () => {
    const { accountId, filters } = useOutletContext<PlayerOutletContext>();
    const { data, isLoading, isError } = usePlayerWardMap(accountId, filters);

    if (isLoading) return <LoadingSpinner text="Analyzing Vision..." />;
    if (isError || !data) return <div className="text-center text-[#808fa6] py-20">Ward data unavailable.</div>;

    const totalObs = Object.values(data.obs).reduce((acc, y) => acc + Object.values(y).reduce((sum, v) => sum + v, 0), 0);
    const totalSen = Object.values(data.sen).reduce((acc, y) => acc + Object.values(y).reduce((sum, v) => sum + v, 0), 0);

    if (totalObs === 0 && totalSen === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-[#58606e]">
                <span className="text-6xl mb-4 opacity-20">👁️</span>
                <p className="uppercase tracking-widest text-sm font-bold opacity-50">No Wards Placed</p>
            </div>
        );
    }

    // TODO Make HeatmapCanvas adaptible to parent container
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-[#15171c] border-l-4 border-[#e7d291] p-3 rounded-r-lg shadow-md">
                        <div className="flex items-center gap-3">
                            <Icon src="/assets/images/ward_observer.png" size={12} />
                            <h3 className="text-sm font-bold text-[#e7d291] uppercase tracking-widest">Observer</h3>
                        </div>
                        <div className="text-right">
                            <span className="block text-xl font-mono font-bold text-white leading-none">Total: {totalObs}</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <HeatmapCanvas data={data.obs} width={500} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-[#15171c] border-l-4 border-[#60a5fa] p-3 rounded-r-lg shadow-md">
                        <div className="flex items-center gap-3">
                            <Icon src="/assets/images/ward_sentry.png" size={12} />
                            <h3 className="text-sm font-bold text-[#60a5fa] uppercase tracking-widest">Sentry</h3>
                        </div>
                        <div className="text-right">
                            <span className="block text-xl font-mono font-bold text-white leading-none">Total: {totalSen}</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <HeatmapCanvas data={data.sen} width={500} />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-3 bg-[#15171c] px-6 py-2 rounded-full border border-[#2e353b] shadow-lg">
                    <span className="text-[10px] uppercase font-bold text-[#58606e] tracking-widest">Frequency</span>
                    <div className="w-[30vw] h-2 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-red-600" />
                </div>
            </div>
        </div>
    );
};
