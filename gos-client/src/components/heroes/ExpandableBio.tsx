import {useState} from "react";
import clsx from "clsx";

export const ExpandableBio = ({ lore }: { lore: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Get first paragraph or truncate for preview
    const preview = lore.split('\n')[0];

    return (
        <div className="bg-[#15171c] border-y border-[#2e353b] md:border md:rounded-xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 shadow-lg group">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#e7d291] text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#e7d291] rounded-full animate-pulse"/>
                    Biography
                </h3>
            </div>

            <div className={clsx("prose prose-invert max-w-none text-[#a3aab8] leading-relaxed font-serif text-lg transition-all duration-700 ease-in-out relative z-10", isExpanded ? "max-h-[3000px] opacity-100" : "max-h-[140px] overflow-hidden opacity-90")}>
                {isExpanded ? (
                    lore.split('\n').map((p, i) => p.trim() && (
                        <p key={i} className="mb-4 first-letter:text-4xl first-letter:font-bold first-letter:text-[#e7d291] first-letter:mr-2 first-letter:float-left first-letter:font-serif">
                            {p}
                        </p>
                    ))
                ) : (
                    <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#e7d291] first-letter:mr-2 first-letter:float-left first-letter:font-serif">
                        {preview}...
                    </p>
                )}
            </div>

            {/* Gradient Overlay for Collapsed State */}
            {!isExpanded && (
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#15171c] via-[#15171c]/90 to-transparent pointer-events-none z-20" />
            )}

            <div className="mt-4 flex justify-center md:justify-start relative z-30">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#e7d291] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group/btn border border-[#e7d291]/20 px-4 py-2 rounded hover:bg-[#e7d291]/5 hover:border-[#e7d291]/50"
                >
                    {isExpanded ? 'Collapse Bio' : 'Read Full Biography'}
                    <span className={clsx("transition-transform duration-300 text-[10px]", isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5")}>▼</span>
                </button>
            </div>
        </div>
    );
};
