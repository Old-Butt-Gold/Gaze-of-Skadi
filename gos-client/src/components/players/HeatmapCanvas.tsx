import React, { useEffect, useRef } from 'react';
import h337 from '@mars3d/heatmap.js';
import { parseWardData } from '../../utils/heatmapUtils';

interface Props {
    data: Record<string, Record<string, number>>;
    width: number;
}

interface HeatmapInstance {
    setData: (data: { max: number; data: Array<{ x: number; y: number; value: number }> }) => void;
    repaint: () => void;
}

export const HeatmapCanvas: React.FC<Props> = ({ data, width }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heatmapInstance = useRef<HeatmapInstance | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = '';

        heatmapInstance.current = h337.create({
            container: containerRef.current,
            radius: width * 0.05,
            maxOpacity: 0.8,
            minOpacity: 0.05,
            blur: 0.90,
            backgroundColor: 'rgba(0,0,0,0)',
            gradient: {
                '.25': 'rgb(0,0,255)',   // Deep Blue
                '.55': 'rgb(0,255,0)',   // Green
                '.85': 'yellow',         // Yellow
                '1.0': 'rgb(255,0,0)'    // Red
            }
        }) as unknown as HeatmapInstance; // Cast to our interface

        const points = parseWardData(data, width, width);

        const heatmapData = {
            max: 1,
            data: points
        };

        heatmapInstance.current.setData(heatmapData);

    }, [data, width]);

    return (
        <div
            className="relative rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#0f1114]"
            style={{ width, height: width }}
        >
            <img
                src="/assets/images/detailed_740.webp"
                alt="Minimap"
                className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 pointer-events-none"
            />

            <div
                ref={containerRef}
                className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            />
        </div>
    );
};
