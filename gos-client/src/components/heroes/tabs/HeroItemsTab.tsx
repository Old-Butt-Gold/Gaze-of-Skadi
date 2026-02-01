import React, {useMemo} from 'react';
import {useHeroItemPopularity} from '../../../hooks/queries/useHeroItemPopularity';
import {LoadingSpinner} from '../../ui/LoadingSpinner';
import {ErrorDisplay} from '../../ui/ErrorDisplay';
import type {HeroInfo} from '../../../types/heroes';
import {ItemByIdCell} from "../../items/ItemByIdCell.tsx";

interface Props {
    hero: HeroInfo;
}

// Helper component for game stages
const ItemSection = ({ title, itemsMap }: {
    title: string,
    itemsMap: Record<string, number>,
}) => {
    const sortedItems = useMemo(() => {
        if (!itemsMap) return [];
        return Object.entries(itemsMap)
            .sort(([, countA], [, countB]) => countB - countA);
    }, [itemsMap]);

    if (sortedItems.length === 0) return null;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-3 shadow-lg group h-full">
            <h4 className="text-[#e7d291] text-xs font-bold uppercase tracking-widest mb-3 border-b border-[#2e353b] pb-2 flex items-center justify-between">
                {title}
                <span className="text-[#58606e] text-[10px] font-mono opacity-50">{sortedItems.length} Items</span>
            </h4>

            <div className="flex flex-wrap gap-x-2 gap-y-3">
                {sortedItems.map(([id]) => (
                    <ItemByIdCell itemId={id} showName={false}/>
                ))}
            </div>
        </div>
    );
};

export const HeroItemsTab: React.FC<Props> = ({ hero }) => {
    const { data: popularity, isLoading: isPopLoading, isError, refetch } = useHeroItemPopularity(hero.id);

    if (isPopLoading) return <LoadingSpinner text="Consulting the Shopkeeper..." />;
    if (isError || !popularity) return <ErrorDisplay message="Item data unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 bg-linear-to-r from-[#e7d291]/5 to-transparent py-3 w-full md:w-auto rounded-r-lg">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Item Popularity
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Data collected from recent professional matches.
                    </p>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* 1. Starting Items */}
                <div className="xl:col-span-1">
                    <ItemSection
                        title="Starting Items"
                        itemsMap={popularity.startGameItems}
                    />
                </div>

                {/* 2. Early Game */}
                <div className="xl:col-span-1">
                    <ItemSection
                        title="Early Game"
                        itemsMap={popularity.earlyGameItems}
                    />
                </div>

                {/* 3. Mid Game */}
                <div className="xl:col-span-1">
                    <ItemSection
                        title="Mid Game"
                        itemsMap={popularity.midGameItems}
                    />
                </div>

                {/* 4. Late Game */}
                <div className="xl:col-span-1">
                    <ItemSection
                        title="Late Game"
                        itemsMap={popularity.lateGameItems}
                    />
                </div>

            </div>

            {/* Fallback if all lists empty */}
            {(!Object.keys(popularity.startGameItems).length &&
                !Object.keys(popularity.earlyGameItems).length &&
                !Object.keys(popularity.midGameItems).length &&
                !Object.keys(popularity.lateGameItems).length) && (
                <div className="py-20 text-center">
                    <span className="text-4xl opacity-20 mb-2 block">🎒</span>
                    <p className="text-[#58606e] uppercase tracking-widest text-sm">No item data recorded</p>
                </div>
            )}
        </div>
    );
};
