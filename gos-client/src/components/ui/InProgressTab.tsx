import React from 'react';

interface Props {
    title: string;
    description: string;
}

export const InProgressTab: React.FC<Props> = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mb-6 rounded-full bg-[#15171c] border border-[#2e353b] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <span className="text-4xl grayscale opacity-50">🚧</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest mb-2">
                {title}
            </h2>
            <p className="text-[#808fa6] max-w-md">
                {description}
            </p>
            <div className="mt-8 px-4 py-2 bg-[#e7d291]/10 border border-[#e7d291]/20 rounded text-[#e7d291] text-xs font-bold uppercase tracking-widest">
                Coming Soon
            </div>
        </div>
    );
};
