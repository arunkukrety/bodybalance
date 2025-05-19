import React from 'react';
import { useWeight } from '../context/WeightContext';
import { achievements } from '../data/achievements';

export const ActivitySidebar = () => {
    const { stats, progressToTarget } = useWeight();

    return (
        <div className="card-glass p-6 h-full animate-scale-in delay-450 green-tint-gradient">
            <h2 className="text-xl font-semibold mb-6 text-white">Monthly Activity</h2>
            <div className="space-y-6">
                <div>
                    <p className="text-muted-foreground text-sm mb-1">Total Weigh-ins</p>
                    <p className="text-2xl font-bold text-white">{stats.totalEntries}</p>
                </div>

                {/* Weight Tracking Days */}
                <div className="pt-4 border-t border-white/10">
                    <p className="text-muted-foreground text-sm mb-3">Weight Tracking Days</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-success flex items-center gap-1">
                                <span className="inline-block h-3 w-3 bg-success rounded-full"></span>
                                Loss Days
                            </span>
                            <span className="font-medium text-white">{stats.tracking.lossDays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-danger flex items-center gap-1">
                                <span className="inline-block h-3 w-3 bg-danger rounded-full"></span>
                                Gain Days
                            </span>
                            <span className="font-medium text-white">{stats.tracking.gainDays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <span className="inline-block h-3 w-3 bg-muted-foreground rounded-full"></span>
                                Stable Days
                            </span>
                            <span className="font-medium text-white">{stats.tracking.stableDays}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
