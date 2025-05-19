import React, { createContext, useState, useContext, useEffect } from 'react';
import mockData from '../data/MockData';

const WeightContext = createContext(null);

export const WeightProvider = ({ children }) => {
    const [weightEntries, setWeightEntries] = useState(() => {
        const savedEntries = localStorage.getItem('weightEntries');
        return savedEntries ? JSON.parse(savedEntries) : mockData;
    });

    const [targetWeight, setTargetWeight] = useState(() => {
        const savedTarget = localStorage.getItem('targetWeight');
        return savedTarget ? parseFloat(savedTarget) : 68.0;
    });

    useEffect(() => {
        localStorage.setItem('weightEntries', JSON.stringify(weightEntries));
    }, [weightEntries]);

    useEffect(() => {
        localStorage.setItem('targetWeight', targetWeight.toString());
    }, [targetWeight]);

    // Calculate statistics
    const stats = {
        currentWeight: weightEntries[0]?.weight || 0,
        totalEntries: weightEntries.length,
        tracking: weightEntries.reduce((acc, entry, index) => {
            if (index === weightEntries.length - 1) return acc;
            const change = entry.weight - weightEntries[index + 1].weight;
            if (change < 0) acc.lossDays++;
            else if (change > 0) acc.gainDays++;
            else acc.stableDays++;
            return acc;
        }, { lossDays: 0, gainDays: 0, stableDays: 0 }),
    };

    // Progress calculations
    const initialWeight = weightEntries[weightEntries.length - 1]?.weight || 0;
    const progressToTarget = {
        total: initialWeight - targetWeight,
        current: initialWeight - stats.currentWeight,
        percentage: ((initialWeight - stats.currentWeight) / (initialWeight - targetWeight) * 100).toFixed(0)
    };

    const value = {
        weightEntries,
        setWeightEntries,
        targetWeight,
        setTargetWeight,
        stats,
        progressToTarget
    };

    return (
        <WeightContext.Provider value={value}>
            {children}
        </WeightContext.Provider>
    );
};

export const useWeight = () => {
    const context = useContext(WeightContext);
    if (!context) {
        throw new Error('useWeight must be used within a WeightProvider');
    }
    return context;
};
