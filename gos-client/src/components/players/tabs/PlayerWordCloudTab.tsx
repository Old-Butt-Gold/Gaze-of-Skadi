import React, { useState, useMemo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';
import { usePlayerWordCloud } from '../../../hooks/queries/usePlayerWordCloud';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import type { PlayerEndpointParameters } from '../../../types/player';

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

type ViewMode = 'write' | 'read';

interface CloudWord extends cloud.Word {
    text: string;
    value: number;
    size?: number;
    x?: number;
    y?: number;
    rotate?: number;
    color?: string;
}

const WORD_COLORS = [
    '#ffffff', // White (High contrast)
    '#e7d291', // Gold (Rare)
    '#5bcefa', // Blue
    '#ff4c4c', // Red
    '#a356ff', // Purple
    '#4ade80', // Green
    '#facc15', // Yellow
    '#fb923c', // Orange
    '#94a3b8', // Slate
    '#60a5fa', // Lighter Blue
    '#c084fc', // Lighter Purple
];

export const PlayerWordCloudTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data, isLoading, isError } = usePlayerWordCloud(accountId, filters);
    const [viewMode, setViewMode] = useState<ViewMode>('write');
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const wordsInput = useMemo(() => {
        if (!data) return [];
        const sourceDict = viewMode === 'write' ? data.writeWordCount : data.readWordCounts;

        return Object.entries(sourceDict)
            .filter(([text]) => text.length > 1)
            .map(([text, value]) => ({ text, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 2000);
    }, [data, viewMode]);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) {
                    window.requestAnimationFrame(() => {
                        setDimensions({ width, height });
                    });
                }
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!wordsInput.length || !svgRef.current || dimensions.width === 0) return;

        const { width, height } = dimensions;

        const svg = select(svgRef.current);
        svg.selectAll("*").remove();

        const maxVal = wordsInput[0]?.value || 1;
        const minVal = wordsInput[wordsInput.length - 1]?.value || 1;
        const colorScale = scaleOrdinal(WORD_COLORS);

        const getFontSize = (val: number) => {
            const norm = (val - minVal) / (maxVal - minVal);
            return 10 + Math.pow(norm, 0.7) * 60;
        };

        const cloudData: CloudWord[] = wordsInput.map(d => ({
            text: d.text,
            value: d.value,
            size: getFontSize(d.value),
            color: colorScale(d.text)
        }));

        const layout = cloud<CloudWord>()
            .size([width, height])
            .words(cloudData)
            .padding(2)
            .rotate(() => {
                return (~~(Math.random() * 6) === 0) ? 90 : 0;
            })
            .font("Radiance, serif")
            .fontSize(d => d.size as number)
            .spiral('archimedean')
            .on("end", draw);

        layout.start();

        function draw(computedWords: CloudWord[]) {
            const g = svg
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            const text = g.selectAll("text")
                .data(computedWords)
                .enter()
                .append("text")
                .style("font-size", d => `${d.size}px`)
                .style("font-family", "Radiance, serif")
                .style("font-weight", d => (d.size && d.size > 30) ? "bold" : "normal")
                .style("fill", d => d.color as string)
                .attr("text-anchor", "middle")
                .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
                .text(d => d.text)
                .style("cursor", "default")
                .style("opacity", 0)
                .style("text-shadow", "0px 0px 4px rgba(0,0,0,0.8)");

            text.transition()
                .duration(500)
                .style("opacity", 1);

            text.append("title")
                .text(d => `${d.text}: ${d.value} times`);
        }

    }, [wordsInput, viewMode, dimensions]);

    if (isLoading) return <LoadingSpinner text="Parsing Match Chat..." />;

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-[#808fa6] border-2 border-dashed border-[#2e353b] rounded-xl">
                <span className="text-4xl mb-4 opacity-50">💬</span>
                <p>Failed to load word cloud data.</p>
            </div>
        );
    }

    const isEmpty = wordsInput.length === 0;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-[#15171c] border border-[#2e353b] p-4 rounded-xl shadow-lg shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2e353b]/50 rounded-lg flex items-center justify-center border border-[#2e353b]">
                        <span className="text-xl">💬</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest leading-none">
                            Chat Word Cloud
                        </h3>
                        <p className="text-xs text-[#808fa6] mt-1">
                            Frequency analysis based on chat history
                        </p>
                    </div>
                </div>

                <div className="flex bg-[#0f1114] p-1 rounded-lg border border-[#2e353b]">
                    <button
                        onClick={() => setViewMode('write')}
                        className={clsx(
                            "px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all",
                            viewMode === 'write'
                                ? "bg-[#2e353b] text-[#e7d291] shadow-lg border border-[#e7d291]/20"
                                : "text-[#808fa6] hover:text-white hover:bg-white/5"
                        )}
                    >
                        Said
                    </button>
                    <button
                        onClick={() => setViewMode('read')}
                        className={clsx(
                            "px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all",
                            viewMode === 'read'
                                ? "bg-[#2e353b] text-[#e7d291] shadow-lg border border-[#e7d291]/20"
                                : "text-[#808fa6] hover:text-white hover:bg-white/5"
                        )}
                    >
                        Read
                    </button>
                </div>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-2xl overflow-hidden relative flex-grow min-h-[75vh] flex flex-col">

                <div className="absolute inset-0 bg-[#0a0b10]" />
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/assets/images/dashboard_bg_2.jpg')] bg-cover bg-center mix-blend-overlay" />

                {isEmpty ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-[#58606e] relative z-10">
                        <span className="text-6xl mb-4 opacity-10 grayscale">🔇</span>
                        <p className="uppercase tracking-widest text-sm font-bold opacity-50">Silence...</p>
                        <p className="text-xs mt-2 opacity-40">No words found for this player/filter.</p>
                    </div>
                ) : (
                    <div ref={containerRef} className="flex-grow w-full h-full relative z-10 overflow-hidden">
                        <svg ref={svgRef} className="w-full h-full block select-none"/>
                    </div>
                )}

                {!isEmpty && wordsInput.length > 0 && (
                    <div className="bg-[#0f1114] border-t border-[#2e353b] px-6 py-3 flex justify-between items-center text-[10px] uppercase tracking-wider text-[#58606e] relative z-20 shrink-0">
                        <div className="flex items-center gap-2">
                            <span>Most used:</span>
                            <span className="text-[#e7d291] font-bold text-xs">{wordsInput[0].text}</span>
                            <span className="bg-[#2e353b] text-white px-1.5 rounded text-[9px]">{wordsInput[0].value}</span>
                        </div>
                        <div>
                            Unique Words: <span className="text-white">{wordsInput.length}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
