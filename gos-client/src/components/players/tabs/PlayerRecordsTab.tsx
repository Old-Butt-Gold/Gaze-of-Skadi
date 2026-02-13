import React, { useState } from 'react';
import clsx from 'clsx';
import { usePlayerRecords } from '../../../hooks/queries/usePlayerRecords';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { PlayerField, type PlayerEndpointParameters } from '../../../types/player';
import {
    FIELD_LABELS,
    getGameModeName,
    getLobbyTypeName
} from '../../../utils/enumUtils';
import { formatDuration, formatRelativeTime } from '../../../utils/formatUtils';
import PartySizeIcon from '../PartySizeIcon';
import type { PlayerRecordDto } from "../../../types/playerRecord";
import { HeroImage } from "../../heroes/HeroImage";
import { RankIcon } from "../../distributions/RankIcon";
import {isRadiantTeam, isTeamWon} from "../../../utils/matchUtils.ts";

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

const RECORD_CATEGORIES = Object.entries(FIELD_LABELS).map(([value, label]) => ({
    value: Number(value) as PlayerField,
    label
}));

export const PlayerRecordsTab: React.FC<Props> = ({ accountId, filters }) => {
    const [selectedField, setSelectedField] = useState<PlayerField>(PlayerField.Kills);
    const { data: records, isLoading } = usePlayerRecords(accountId, selectedField, filters);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-[#15171c] border border-[#2e353b] p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🏆</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest leading-none">
                            Records
                        </h3>
                        <p className="text-xs text-[#808fa6] mt-1">
                            Personal bests across all matches
                        </p>
                    </div>
                </div>

                <div className="relative group w-full sm:w-64">
                    <select
                        value={selectedField}
                        onChange={(e) => setSelectedField(Number(e.target.value) as PlayerField)}
                        className="w-full appearance-none bg-[#0f1114] border border-[#2e353b] text-white text-sm rounded px-4 py-2.5 pr-8 focus:outline-none focus:border-[#e7d291] transition-colors cursor-pointer font-bold uppercase tracking-wide"
                    >
                        {RECORD_CATEGORIES.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#808fa6]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                </div>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-2xl">
                {isLoading ? (
                    <LoadingSpinner text="Fetching Records..." />
                ) : !records || records.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#58606e]">
                        <span className="text-4xl mb-4 opacity-50">📜</span>
                        <p className="uppercase tracking-widest text-xs font-bold">No records found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-[#1a1d24] text-[#808fa6] text-[10px] uppercase font-bold tracking-widest border-b border-[#2e353b]">
                                <th className="px-4 py-3 whitespace-nowrap">Hero</th>
                                <th className="px-4 py-3 text-center">Average Rank</th>
                                <th className="px-4 py-3 text-center">Result</th>
                                <th className="px-4 py-3 text-center">Mode</th>
                                <th className="px-4 py-3 text-right">Date / Side</th>
                                <th className="px-4 py-3 text-right ">
                                    {FIELD_LABELS[selectedField]}
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2e353b]/50">
                            {records.map((record) => (
                                <RecordRow
                                    key={record.matchId}
                                    record={record}
                                    field={selectedField}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const RecordRow: React.FC<{
    record: PlayerRecordDto;
    field: PlayerField;
}> = ({ record, field }) => {

    const isWin = isTeamWon(record.isRadiant, record.radiantWin);
    const isRadiant = isRadiantTeam(record.isRadiant);

    const formatValue = (val: number) => {
        if (field === PlayerField.Duration) return formatDuration(val);
        return val.toLocaleString();
    };

    let resultText = 'Unknown';
    let resultClass = 'text-[#808fa6] border-[#58606e] bg-[#2e353b]/50';

    if (isWin === true) {
        resultText = 'Won';
        resultClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    } else if (isWin === false) {
        resultText = 'Lost';
        resultClass = 'text-red-400 border-red-500/30 bg-red-500/10';
    }

    return (
        <tr className="hover:bg-[#1e222b] transition-colors group text-sm">

            <td className="px-4 py-3 w-px whitespace-nowrap">
                <HeroImage
                    matchId={record.matchId}
                    heroId={record.heroId}
                    heroVariant={record.heroVariant}
                    leaverStatus={record.leaverStatus.value}
                    isParsed={record.isParsedMatch.value}
                />
            </td>

            <td className="px-4 py-3">
                <div className="flex justify-center items-center">
                    <RankIcon rank={record.averageRank?.value} />
                </div>
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-4 flex justify-center">
                        <PartySizeIcon partySize={record.partySize} />
                    </div>

                    <span className={clsx(
                        "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border text-center",
                        resultClass
                    )}>
                        {resultText}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3">
                <div className="flex flex-col items-center">
                    <span className="text-white text-xs font-medium text-center">{getGameModeName(record.gameMode.value)}</span>
                    <span className="text-[#58606e] text-xs text-center">{getLobbyTypeName(record.lobbyType.value)}</span>
                </div>
            </td>

            <td className="px-4 py-3 text-right">
                <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[#a3aab8] text-xs font-medium">{formatRelativeTime(record.startTime)}</span>
                    <span className={clsx("text-xs font-bold uppercase tracking-wide", isRadiant ? "text-emerald-300" : "text-red-300")}>
                        {isRadiant ? 'Radiant' : 'Dire'}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3 text-right font-mono">
                <span className="text-lg font-bold text-[#e7d291] group-hover:text-white transition-colors">
                    {formatValue(record.recordField)}
                </span>
            </td>
        </tr>
    );
};
