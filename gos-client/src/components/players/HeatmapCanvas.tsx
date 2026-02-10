import React, { useEffect, useRef } from 'react';
import {parseWardData, renderHeatmap} from "../../utils/heatmapUtils.ts";

interface Props {
    data: Record<string, Record<string, number>>;
    width: number;
}

export const HeatmapCanvas: React.FC<Props> = ({ data, width }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // 1. Парсим данные (координаты)
        const points = parseWardData(data, width, width);

        // 2. Настраиваем радиус точки в зависимости от размера карты
        // Для 500px -> radius ~15, blur ~25 дает мягкий результат как на скрине
        const radius = Math.max(8, width * 0.03);
        const blur = Math.max(15, width * 0.05);

        renderHeatmap(canvasRef.current, points, radius, blur);

    }, [data, width]);

    return (
        <div
            className="relative rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#0f1114]"
            style={{ width, height: width }}
        >
            {/* Background Map */}
            <img
                src="/assets/images/detailed_740.webp"
                alt="Minimap"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Heatmap Layer (Screen blend mode makes it glow) */}
            <canvas
                ref={canvasRef}
                width={width}
                height={width}
                className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-90"
            />

            {/* Subtle Grid Overlay (Optional, adds pro feel) */}
            <div
                className="absolute inset-0 z-20 pointer-events-none border border-white/5"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: `${width / 8}px ${width / 8}px`
                }}
            />
        </div>
    );
};
