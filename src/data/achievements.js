export const achievements = (weightEntries, progressToTarget) => {
    const initialWeight = weightEntries[weightEntries.length - 1]?.weight || 0;
    const currentWeight = weightEntries[0]?.weight || 0;
    const totalLoss = initialWeight - currentWeight;

    return [
        {
            id: 1,
            icon: '📝',
            title: 'Logged your first weight',
            description: 'Started your journey with your first weight log',
            completed: weightEntries.length > 0
        },
        {
            id: 2,
            icon: '🎉',
            title: 'Lost 1 kg!',
            description: 'Achieved your first kilogram loss milestone',
            completed: totalLoss >= 1
        },
        {
            id: 3,
            icon: '🏁',
            title: 'Halfway to your goal!',
            description: 'You are 50% of the way to your target weight',
            completed: parseFloat(progressToTarget.percentage) >= 50
        },
        {
            id: 4,
            icon: '🔥',
            title: 'Consistency Champion: 10 days in a row',
            description: 'Logged your weight for 10 consecutive days',
            completed: weightEntries.length >= 10
        },
        {
            id: 5,
            icon: '💪',
            title: 'Lost 2 kg!',
            description: 'Achieved your second kilogram loss milestone',
            completed: totalLoss >= 2
        },
        {
            id: 6,
            icon: '⚡',
            title: 'Speed Demon',
            description: 'Lost 0.5kg in a single week',
            completed: weightEntries.some((entry, index) => {
                if (index < weightEntries.length - 7) return false;
                return entry.weight - currentWeight >= 0.5;
            })
        },
        {
            id: 7,
            icon: '📊',
            title: 'Data Lover',
            description: 'Logged weight 30 days in total',
            completed: weightEntries.length >= 30
        },
        {
            id: 8,
            icon: '🌟',
            title: 'Perfect Month',
            description: 'Logged weight every day for a month',
            completed: weightEntries.length >= 30 && weightEntries.every((entry, index) => {
                if (index === 0) return true;
                const prevDate = new Date(weightEntries[index - 1].date);
                const currDate = new Date(entry.date);
                return (currDate - prevDate) === 86400000; // 1 day in ms
            })
        },
        {
            id: 9,
            icon: '🎯',
            title: 'Right on Target',
            description: 'Maintained target weight for a week',
            completed: weightEntries.some((entry, index) => {
                if (index < weightEntries.length - 7) return false;
                return weightEntries.slice(index, index + 7).every(e => e.weight === progressToTarget.targetWeight);
            })
        },
        {
            id: 10,
            icon: '🏆',
            title: 'Goal Achieved!',
            description: 'Reached your target weight',
            completed: currentWeight === progressToTarget.targetWeight
        }
    ];
};
