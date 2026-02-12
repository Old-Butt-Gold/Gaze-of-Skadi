import React from 'react';
import { useDistributions } from '../hooks/queries/useDistributions';
import { DistributionChart } from '../components/charts/DistributionChart';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';

export const DistributionPage: React.FC = () => {
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
        <div className="space-y-6 w-full animate-fade-in p-3">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-4 border-b border-[#2e353b]">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-[#808fa6] tracking-widest uppercase drop-shadow-md">
                        Rank Distribution
                    </h2>
                    <p className="text-[#808fa6] mt-1 text-sm">
                        Analytics based on <span className="font-mono font-bold text-[#e7d291]">{totalPlayers.toLocaleString()}</span> players this season.
                    </p>
                </div>
            </div>

            {/* Chart Container */}
            {chartData.length > 0 ? (
                <div className="w-full h-[80vh]">
                    <DistributionChart data={chartData} />
                </div>
            ) : (
                <div className="flex h-[80vh] items-center justify-center bg-[#15171c] rounded-xl border-2 border-dashed border-[#2e353b]">
                    <p className="text-[#58606e] font-medium uppercase tracking-widest">No data available for the current season</p>
                </div>
            )}
        </div>
    );
};