import React from 'react';

export const UnparsedMatchWarning: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#2e353b] rounded-2xl bg-[#15171c]/50 mt-6 w-full lg:w-[90%] mx-auto">
        <span className="text-6xl mb-4 opacity-50 grayscale">🔒</span>
        <h2 className="text-2xl font-bold text-white mb-2">Parse Required</h2>
        <p className="text-[#808fa6] max-w-md text-center leading-relaxed px-4">
            This data is only available for parsed matches.
        </p>
    </div>
);
