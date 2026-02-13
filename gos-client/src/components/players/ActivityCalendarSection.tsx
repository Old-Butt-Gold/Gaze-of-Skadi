import React, { useState, useMemo, useCallback } from 'react';
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

const GET_ACTIVITY_STYLE = (count: number, isSelected: boolean) => {
    if (isSelected) return {
        size: 'w-3.5 h-3.5',
        color: 'bg-[#ffd700] ring-2 shadow-[0_0_15px_#ffd700] z-30 scale-125'
    };

    if (count === 0) return { size: 'w-1.5 h-1.5', color: 'bg-[#3b3f46]' };

    if (count <= 3) return { size: 'w-2.5 h-2.5', color: 'bg-[#1a3a2a]' };
    if (count <= 6) return { size: 'w-2.5 h-2.5', color: 'bg-[#2d5a3d]' };
    if (count <= 9) return { size: 'w-3 h-3', color: 'bg-[#3d7a4d]' };
    if (count <= 12) return { size: 'w-3 h-3', color: 'bg-[#4da75d]' };
    if (count <= 15) return { size: 'w-3 h-3', color: 'bg-[#5dc46e]' };
    if (count <= 18) return { size: 'w-3.5 h-3.5', color: 'bg-[#6ed17f]' };
    if (count <= 21) return { size: 'w-3.5 h-3.5', color: 'bg-[#7fe08f]' };
    if (count <= 24) return { size: 'w-3.5 h-3.5', color: 'bg-[#90f09f]' };
    if (count <= 27) return { size: 'w-3.5 h-3.5', color: 'bg-[#a1ffa0]' };
    if (count <= 30) return { size: 'w-3.5 h-3.5', color: 'bg-[#b2ffb1]' };

    return { size: 'w-full h-full', color: 'bg-[#e7d291]' };
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

    const handleSelectDate = useCallback((date: string) => {
        setSelectedDate(prev => prev === date ? null : date);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedDate(null);
    }, []);

    return (
        <div className="flex flex-col gap-10 w-full relative z-0">
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-6 md:p-8 shadow-2xl w-full relative overflow-visible">
                <div className="flex flex-col gap-8 w-full items-center">
                    {years.map(year => (
                        <div key={year} className="flex flex-col gap-6 w-full max-w-[1300px]">
                            <div className="flex items-center gap-4">
                                <h4 className="text-2xl font-bold text-[#e3e3e3] font-mono tracking-widest opacity-90">
                                    {year}
                                </h4>
                                <div className="h-px bg-[#2e353b] flex-grow opacity-50" />
                            </div>

                            <YearHeatmap
                                year={year}
                                matchesByDay={matchesByDay}
                                selectedDate={selectedDate}
                                onSelectDate={handleSelectDate}
                            />

                            {selectedDate && parseISO(selectedDate).getFullYear() === year && (
                                <div className="mt-2 animate-in fade-in slide-in-from-top-4 duration-300 origin-top">
                                    <DailyMatchList
                                        date={selectedDate}
                                        matches={matchesByDay[selectedDate] || []}
                                        onClose={handleClose}
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

const YearHeatmap = React.memo((
{year, matchesByDay, selectedDate, onSelectDate}: {
    year: number;
    matchesByDay: Record<string, ActivityMatchDto[]>;
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
}) => {

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

    const CELL_SIZE = 14;
    const GAP = 5;
    const STEP = CELL_SIZE + GAP;
    const GRID_HEIGHT = 7 * STEP - GAP;

    return (
        <div className="w-full relative overflow-x-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-transparent pb-4 pt-2">
            <div className="flex flex-col min-w-max mx-auto px-4">

                <div className="relative h-6 mb-2 text-[10px] font-bold text-[#808fa6] uppercase tracking-wider">
                    {months.map((m, i) => (
                        <div
                            key={i}
                            className="absolute top-0 transform"
                            style={{ left: `${m.colIndex * STEP + 35}px` }}
                        >
                            {m.label}
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <div
                        className="flex flex-col justify-between text-[10px] font-bold text-[#808fa6] pt-[1px] w-[25px] text-right pr-2 sticky left-0 z-20"
                        style={{ height: `${GRID_HEIGHT}px` }}
                    >
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>

                    <div
                        className="grid grid-rows-7 grid-flow-col"
                        style={{
                            gap: `${GAP}px`,
                            height: `${GRID_HEIGHT}px`
                        }}
                    >
                        {days.map((day) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const dayMatches = matchesByDay[dateStr] || [];
                            const count = dayMatches.length;
                            const isSelected = selectedDate === dateStr;
                            const isCurrentYear = day.getFullYear() === year;

                            const hasMatches = count > 0;
                            const wins = hasMatches ? dayMatches.filter(m => isTeamWon(m.isRadiant, m.radiantWin) === true).length : 0;
                            const losses = hasMatches ? dayMatches.filter(m => isTeamWon(m.isRadiant, m.radiantWin) === false).length : 0;

                            const { size, color } = GET_ACTIVITY_STYLE(count, isSelected);

                            const dayOfWeek = getDay(day);
                            const showTooltipBelow = dayOfWeek === 1 || dayOfWeek === 2;

                            return (
                                <div
                                    key={dateStr}
                                    onClick={() => { if (count > 0) onSelectDate(dateStr); }}
                                    className={clsx(
                                        "relative flex items-center justify-center group z-0 hover:z-30",
                                        !isCurrentYear && "opacity-0 pointer-events-none",
                                        count > 0 ? "cursor-pointer" : "cursor-default"
                                    )}
                                    style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                                >
                                    <div
                                        className={clsx(
                                            "rounded-full transition-all duration-300 ease-out",
                                            size,
                                            color,
                                            count > 0 && "group-hover:scale-110 group-hover:brightness-110"
                                        )}
                                    />

                                    {isCurrentYear && count > 0 && (
                                        <div
                                            className={clsx(
                                                "absolute left-1/2 -translate-x-1/2 w-max bg-[#15171c] border border-[#2e353b] rounded-md px-3 py-2 text-xs shadow-[0_5px_20px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50",
                                                showTooltipBelow ? "top-full mt-2" : "bottom-full mb-2"
                                            )}
                                        >
                                            <div className="text-[#e3e3e3] font-bold mb-1 border-b border-[#2e353b] pb-1">
                                                {formatDateLong(getUnixTime(day))}
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <span className="text-emerald-400 font-mono font-bold">{wins} W</span>
                                                <span className="text-[#58606e]">-</span>
                                                <span className="text-red-400 font-mono font-bold">{losses} L</span>
                                            </div>
                                            <div
                                                className={clsx(
                                                    "w-2 h-2 bg-[#15171c] border-r border-[#2e353b] absolute left-1/2 -translate-x-1/2 rotate-45",
                                                    showTooltipBelow ? "-top-1 border-t border-b-0" : "-bottom-1 border-b border-t-0"
                                                )}
                                            />
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
});

const DailyMatchList = React.memo((
{date, matches, onClose}
: {
    date: string;
    matches: ActivityMatchDto[];
    onClose: () => void;
}) => {

    const sortedMatches = useMemo(() =>
            [...matches].sort((a, b) => b.startTime - a.startTime),
        [matches]);

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-5 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] relative w-full">

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
                    className="text-[#58606e] hover:text-white transition-colors p-2 rounded-full hover:bg-[#2e353b] leading-none text-lg"
                >
                    &times;
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#2e353b]/50 relative z-10">
                <table className="w-full text-left border-collapse bg-[#15171c]">
                    <thead>
                    <tr className="text-[#58606e] text-[10px] uppercase font-bold tracking-widest bg-[#15171c] border-b border-[#2e353b]">
                        <th className="py-3 pl-4">Hero</th>
                        <th className="py-3 text-center">Result</th>
                        <th className="py-3 text-right">Duration</th>
                        <th className="py-3 text-right pr-4">Time</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2e353b]/30">
                    {sortedMatches.map(match => {
                        const isWin = isTeamWon(match.isRadiant, match.radiantWin);
                        return (
                            <tr key={match.matchId} className="hover:bg-[#1e222b] transition-colors group text-sm">
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
                                <td className="py-2.5 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <PartySizeIcon partySize={match.partySize} />
                                        <span className={clsx(
                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border text-center shadow-sm",
                                            isWin === true ? "text-emerald-400 border-emerald-500/20 bg-emerald-900/20" :
                                                isWin === false ? "text-red-400 border-red-500/20 bg-red-900/20" :
                                                    "text-[#808fa6] border-[#58606e] bg-[#2e353b]/50"
                                        )}>
                                                {isWin === true ? 'Won' : isWin === false ? 'Lost' : '-'}
                                            </span>
                                    </div>
                                </td>
                                <td className="py-2.5 text-right font-mono text-[#e3e3e3]">
                                    {formatDuration(match.duration)}
                                </td>
                                <td className="py-2.5 text-right text-[#808fa6] text-xs pr-4 font-mono">
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
});
