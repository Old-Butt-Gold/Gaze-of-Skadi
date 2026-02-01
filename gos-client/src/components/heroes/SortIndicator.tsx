import type {SortDirection} from "../../store/teamStore.ts";

export const SortIndicator = ({active, dir}: { active: boolean, dir: SortDirection }) => {
    if (!active) return null;

    return (
        <span
            className="text-[#e7d291] ml-1 text-[10px] w-3 block transition-transform animate-in fade-in zoom-in duration-200">
            {dir === 'asc' ? '▲' : '▼'}
        </span>
    );
};
