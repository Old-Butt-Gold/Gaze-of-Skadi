import React, { useState, useMemo } from 'react';
import {
    format,
    eachDayOfInterval,
    endOfYear,
    startOfYear,
    getDay,
    parseISO,
    startOfWeek,
    endOfWeek,
    getUnixTime
} from 'date-fns';
import clsx from 'clsx';
import { HeroImage } from '../heroes/HeroImage';
import { formatDuration, formatRelativeTime, formatDateLong } from '../../utils/formatUtils';
import { isTeamWon } from '../../utils/matchUtils';
import type { ActivityMatchDto } from '../../types/playerActivity';
import PartySizeIcon from './PartySizeIcon';

interface Props {
    matchesByDay: Record<string, ActivityMatchDto[]>;
}

// Revised Dota-themed color scale and size logic
const GET_ACTIVITY_STYLE = (count: number, isSelected: boolean) => {
    // Selection style: Gold ring with glow
    if (isSelected) return { size: 'w-3 h-3', color: 'bg-[#e7d291] ring-2 ring-white shadow-[0_0_8px_#e7d291] z-20 scale-125' };

    // Empty day: Dark grey/black dot
    if (count === 0) return { size: 'w-1.5 h-1.5', color: 'bg-[#3b3f46]' };

    // Activity levels: Dark Green -> Bright Green -> Gold
    if (count <= 2) return { size: 'w-2 h-2', color: 'bg-[#1b4d3e]' }; // Very low
    if (count <= 4) return { size: 'w-2 h-2', color: 'bg-[#266851]' };
    if (count <= 6) return { size: 'w-2.5 h-2.5', color: 'bg-[#2d8563]' };
    if (count <= 8) return { size: 'w-2.5 h-2.5', color: 'bg-[#3fae7e]' };
    if (count <= 10) return { size: 'w-3 h-3', color: 'bg-[#53d698]' }; // Mid
    if (count <= 14) return { size: 'w-3 h-3', color: 'bg-[#6effb3]' };
    if (count <= 18) return { size: 'w-3.5 h-3.5', color: 'bg-[#a3ffcf]' };

    // Godlike streaks
    return { size: 'w-full h-full', color: 'bg-[#e7d291] shadow-[0_0_4px_#e7d291]' };
};

export const ActivityCalendarSection: React.FC<Props> = ({ matchesByDay }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const years = useMemo(() => {
        const uniqueYears = new Set<number>();
        Object.keys(matchesByDay).forEach(dateStr => {
            uniqueYears.add(parseISO(dateStr).getFullYear());
        });
        if (uniqueYears.size === 0) uniqueYears.add(new Date().getFullYear());
        return Array.from(uniqueYears).sort((a, b) => b - a);
    }, [matchesByDay]);

    return (
        <div className="flex flex-col gap-12 w-full">
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 md:p-8 shadow-2xl w-full">
                <div className="flex flex-col gap-7 w-full items-center">
                    {years.map(year => (
                        <div key={year} className="flex flex-col gap-4 w-full max-w-[1200px]">
                            {/* Year Header */}
                            <div className="flex items-center gap-3">
                                <h4 className="text-lg font-bold text-[#e3e3e3] font-mono tracking-widest">
                                    {year}
                                </h4>
                                <div className="h-px bg-[#2e353b] flex-grow opacity-50" />
                            </div>

                            <YearHeatmap
                                year={year}
                                matchesByDay={matchesByDay}
                                selectedDate={selectedDate}
                                onSelectDate={(date) => setSelectedDate(prev => prev === date ? null : date)}
                            />

                            {selectedDate && parseISO(selectedDate).getFullYear() === year && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <DailyMatchList
                                        date={selectedDate}
                                        matches={matchesByDay[selectedDate] || []}
                                        onClose={() => setSelectedDate(null)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const YearHeatmap: React.FC<{
    year: number;
    matchesByDay: Record<string, ActivityMatchDto[]>;
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
}> = ({ year, matchesByDay, selectedDate, onSelectDate }) => {

    const { days, months } = useMemo(() => {
        const start = startOfYear(new Date(year, 0, 1));
        const end = endOfYear(new Date(year, 0, 1));

        const gridStart = startOfWeek(start, { weekStartsOn: 1 });
        const gridEnd = endOfWeek(end, { weekStartsOn: 1 });

        const daysList = eachDayOfInterval({ start: gridStart, end: gridEnd });

        const monthLabels: { label: string, colIndex: number }[] = [];
        let currentMonth = -1;

        daysList.forEach((day, index) => {
            if (getDay(day) === 1 && day.getFullYear() === year) {
                const m = day.getMonth();
                if (m !== currentMonth) {
                    monthLabels.push({ label: format(day, 'MMM'), colIndex: Math.floor(index / 7) });
                    currentMonth = m;
                }
            }
        });

        return { days: daysList, months: monthLabels };
    }, [year]);

    // Dimensions: Box size 12px + Gap 4px = 16px per cell
    const CELL_SIZE = 12;
    const GAP = 4;
    const STEP = CELL_SIZE + GAP;

    return (
        <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2 flex justify-center">
            <div className="flex flex-col min-w-max">

                {/* Month Labels */}
                <div className="relative h-6 mb-2 text-[10px] font-bold text-[#58606e] uppercase tracking-wider">
                    {months.map((m, i) => (
                        <div
                            key={i}
                            className="absolute top-0 transform"
                            style={{ left: `${m.colIndex * STEP + 30}px` }}
                        >
                            {m.label}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    {/* Weekday Labels */}
                    <div
                        className="flex flex-col justify-between text-[9px] font-bold text-[#3e434b] pt-[2px] w-[25px] text-right pr-2"
                        style={{ height: `${7 * STEP - GAP}px` }}
                    >
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>

                    {/* The Grid */}
                    <div
                        className="grid grid-rows-7 grid-flow-col"
                        style={{
                            gap: `${GAP}px`,
                            height: `${7 * STEP - GAP}px` // Precise height calc
                        }}
                    >
                        {days.map((day) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const dayMatches = matchesByDay[dateStr] || [];
                            const count = dayMatches.length;
                            const isSelected = selectedDate === dateStr;
                            const isCurrentYear = day.getFullYear() === year;

                            const wins = dayMatches.filter(m => isTeamWon(m.isRadiant, m.radiantWin) === true).length;
                            const losses = dayMatches.filter(m => isTeamWon(m.isRadiant, m.radiantWin) === false).length;

                            const { size, color } = GET_ACTIVITY_STYLE(count, isSelected);

                            return (
                                <div
                                    key={dateStr}
                                    onClick={() => { if (count > 0) onSelectDate(dateStr); }}
                                    className={clsx(
                                        "relative flex items-center justify-center group",
                                        !isCurrentYear && "opacity-0 pointer-events-none",
                                        count > 0 ? "cursor-pointer" : "cursor-default"
                                    )}
                                    style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                                >
                                    {/* The Dot */}
                                    <div
                                        className={clsx(
                                            "rounded-full transition-all duration-300 ease-out",
                                            size,
                                            color,
                                            count > 0 && "group-hover:scale-125" // Slight grow on hover
                                        )}
                                    />

                                    {/* Tooltip */}
                                    {isCurrentYear && count > 0 && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-[#1a1d24] border border-[#2e353b] rounded px-3 py-2 text-xs shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                            <div className="text-white font-bold mb-1">
                                                {formatDateLong(getUnixTime(day))}
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="text-emerald-400 font-mono">{wins} Wins</span>
                                                <span className="text-[#58606e]">-</span>
                                                <span className="text-red-400 font-mono">{losses} Losses</span>
                                            </div>
                                            <div className="w-2 h-2 bg-[#1a1d24] border-b border-r border-[#2e353b] absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45"></div>
                                        </div>

                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DailyMatchList: React.FC<{
    date: string;
    matches: ActivityMatchDto[];
    onClose: () => void;
}> = ({ date, matches, onClose }) => {

    const sortedMatches = useMemo(() =>
            [...matches].sort((a, b) => b.startTime - a.startTime),
        [matches]);

    return (
        <div className="bg-[#0b0c0f] border border-[#2e353b] rounded-xl p-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative mt-4 max-w-5xl mx-auto w-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2e353b] relative z-10">
                <div className="flex items-center gap-4">
                    <span className="text-[#e7d291] font-serif text-xl font-bold tracking-wide drop-shadow-sm">
                        {formatDateLong(getUnixTime(parseISO(date)))}
                    </span>
                    <span className="bg-[#2e353b]/50 text-[#808fa6] text-xs px-2.5 py-1 rounded-full font-mono border border-[#3e454d]/30">
                        {matches.length} Matches
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="text-[#58606e] hover:text-white transition-colors p-1.5 rounded hover:bg-[#2e353b]"
                >
                    ✕
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-[#2e353b]/50">
                <table className="w-full text-left border-collapse bg-[#101215]">
                    <thead>
                    <tr className="text-[#58606e] text-[10px] uppercase font-bold tracking-widest bg-[#15171c] border-b border-[#2e353b]">
                        <th className="py-3 pl-4">Hero</th>
                        <th className="py-3 text-center">Result</th>
                        <th className="py-3 text-right">Duration</th>
                        <th className="py-3 text-right pr-4 bg-[#1a1d24]/50">Time</th> {/* Different col bg example */}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2e353b]/30">
                    {sortedMatches.map(match => {
                        const isWin = isTeamWon(match.isRadiant, match.radiantWin);
                        return (
                            <tr key={match.matchId} className="hover:bg-[#1e222b] transition-colors group text-sm">
                                {/* Hero Col */}
                                <td className="py-2.5 pl-4 w-px whitespace-nowrap">
                                    <HeroImage
                                        matchId={match.matchId}
                                        heroId={match.heroId}
                                        heroVariant={match.heroVariant}
                                        leaverStatus={match.leaverStatus.value}
                                        isParsed={match.isMatchParsed.value}
                                        showName={true}
                                    />
                                </td>

                                {/* Result Col */}
                                <td className="py-2.5 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <PartySizeIcon partySize={match.partySize} />
                                        <span className={clsx(
                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border min-w-[50px] text-center shadow-sm",
                                            isWin === true ? "text-emerald-400 border-emerald-500/20 bg-emerald-900/20" :
                                                isWin === false ? "text-red-400 border-red-500/20 bg-red-900/20" :
                                                    "text-[#808fa6] border-[#58606e] bg-[#2e353b]/50"
                                        )}>
                                                {isWin === true ? 'Won' : isWin === false ? 'Lost' : '-'}
                                            </span>
                                    </div>
                                </td>

                                {/* Duration Col */}
                                <td className="py-2.5 text-right font-mono text-[#e3e3e3]">
                                    {formatDuration(match.duration)}
                                </td>

                                {/* Time Col (Darker BG) */}
                                <td className="py-2.5 text-right text-[#808fa6] text-xs pr-4 bg-[#1a1d24]/30 font-mono">
                                    {formatRelativeTime(match.startTime)}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
