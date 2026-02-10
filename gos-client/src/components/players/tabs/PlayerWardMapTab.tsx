import React, { useState, useEffect, useRef } from 'react';
import { usePlayerWardMap } from '../../../hooks/queries/usePlayerWardMap';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import type { PlayerEndpointParameters } from '../../../types/player';
import { Icon } from '../../Icon';
import {HeatmapCanvas} from "../HeatmapCanvas.tsx";

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

export const PlayerWardMapTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data, isLoading, isError } = usePlayerWardMap(accountId, filters);

    const containerRef = useRef<HTMLDivElement>(null);
    const [mapSize, setMapSize] = useState(500);

    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            const isDesktop = width > 768;
            const calculatedSize = isDesktop ? (width - 40) / 2 : width;
            setMapSize(Math.floor(calculatedSize));
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

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

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full" ref={containerRef}>

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

                    <HeatmapCanvas data={data.obs} width={mapSize}/>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-[#15171c] border-l-4 border-[#60a5fa] p-3 rounded-r-lg shadow-md">
                        <div className="flex items-center gap-3">
                            <Icon src="/assets/images/ward_sentry.png" size={12} />
                            <h3 className="text-sm font-bold text-[#60a5fa] uppercase tracking-widest">Sentry</h3>
                        </div>
                        <div className="text-right">
                            <span className="block text-xl font-mono font-bold text-white leading-none">Total: {totalSen}</span>
                        </div>
                    </div>

                    {/* Map */}
                    <HeatmapCanvas data={data.sen} width={mapSize}/>
                </div>

            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-3 bg-[#15171c] px-6 py-2 rounded-full border border-[#2e353b] shadow-lg">
                    <span className="text-[10px] uppercase font-bold text-[#58606e] tracking-widest">Frequency</span>
                    <div className="w-[30vw] h-2 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-red-600" />
                </div>
            </div>
        </div>
    );
};
