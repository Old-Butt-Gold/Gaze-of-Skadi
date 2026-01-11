import React from 'react';

interface Props {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export const ErrorDisplay: React.FC<Props> = ({
                                                  title = "Something went wrong",
                                                  message,
                                                  onRetry
                                              }) => {
    return (
        <div className="flex items-center justify-center w-full h-[50vh]">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden">
                <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-red-900">{title}</h3>
                </div>

                <div className="p-6">
                    <p className="text-slate-600 mb-6">{message}</p>

                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
