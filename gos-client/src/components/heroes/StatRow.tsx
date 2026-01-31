import {Icon} from "../Icon.tsx";

export const StatRow = ({ icon, label, value, subValue }: { icon: string, label: string, value: string | number, subValue?: string }) => (
    <div className="flex items-center justify-between text-sm group py-1 border-b border-[#2e353b]/30 last:border-0">
        <div className="flex items-center gap-3 text-[#808fa6] group-hover:text-[#e3e3e3] transition-colors">
            <div className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                <Icon src={icon} size={4} />
            </div>
            <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        </div>
        <div className="text-right">
            <span className="font-mono font-bold text-[#e3e3e3]">{value}</span>
            {subValue && <span className="text-[10px] text-[#58606e] ml-1">{subValue}</span>}
        </div>
    </div>
);
