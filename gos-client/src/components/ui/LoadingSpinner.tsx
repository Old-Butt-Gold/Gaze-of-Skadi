import React from 'react';

interface Props {
    text?: string;
    fullHeight?: boolean;
}

export const LoadingSpinner: React.FC<Props> = ({
                                                    text = "Loading data...",
                                                    fullHeight = true
                                                }) => {
    return (
        <div className={`flex flex-col items-center justify-center w-full ${fullHeight ? 'h-[60vh]' : 'h-full'}`}>
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 opacity-50"></div>
                {/* Spinning Inner Ring */}
                <div className="absolute w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            {text && (
                <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
};
