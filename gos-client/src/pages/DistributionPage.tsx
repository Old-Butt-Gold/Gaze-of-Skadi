import React from 'react';
import { useDistributions } from '../hooks/queries/useDistributions';
import { DistributionChart } from '../components/charts/DistributionChart';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';

export const DistributionPage: React.FC = () => {
    // added refetch to useDistributions hook result if you want the retry button to work
    const { data, isLoading, isError, error, refetch } = useDistributions();

    if (isLoading) {
        return <LoadingSpinner text="Analyzing Rank Distribution..." />;
    }

    if (isError) {
        return (
            <ErrorDisplay
                message={(error as Error).message}
                onRetry={() => refetch()}
            />
        );
    }

    const totalPlayers = data?.totalCount ?? 0;
    const chartData = data?.rows ?? [];

    return (
        <div className="space-y-6 w-full animate-fade-in p-1">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Rank Distribution
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Analytics based on <span className="font-mono font-bold text-slate-800">{totalPlayers.toLocaleString()}</span> players this season.
                    </p>
                </div>
            </div>

            {/* Chart Container */}
            {chartData.length > 0 ? (
                <div className="w-full h-[70vh]">
                    <DistributionChart data={chartData} />
                </div>
            ) : (
                <div className="flex h-[50vh] items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">No data available for the current season</p>
                </div>
            )}
        </div>
    );
};
