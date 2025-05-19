import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mockData from '../data/MockData';
import { achievements } from '../data/achievements';
import Header from '../components/Header';
import { AchievementsMenu } from '../components/AchievementsMenu';
import { useWeight } from '../context/WeightContext';
import { ActivitySidebar } from '../components/ActivitySidebar';
import { useUser } from '../context/UserContext';

const SnapshotCard = () => {
    const { userData, calculateBMI, getBMICategory } = useUser();
    const { weightEntries } = useWeight();
    
    const currentWeight = userData?.weight;
    const weekAgoEntry = weightEntries[6];
    const weeklyChange = weekAgoEntry 
        ? (currentWeight - weekAgoEntry.weight).toFixed(1)
        : 0;

    const targetWeight = parseFloat(userData?.targetWeight);
    const toTarget = (currentWeight - targetWeight).toFixed(1);
    
    const bmi = calculateBMI(currentWeight, parseFloat(userData?.height));
    const bmiCategory = getBMICategory(bmi);

    return (
        <div className="card-glass p-4 sm:p-6 animate-scale-in delay-75 transition-all duration-300 hover:shadow-2xl green-tint-gradient rounded-2xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Today's Snapshot</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1">Current Weight</p>
                    <p className="text-3xl sm:text-4xl font-bold text-success">{currentWeight} kg</p>
                    <p className="mt-2 text-xs sm:text-sm text-success">
                        {weeklyChange < 0 ? '↓' : '↑'} {Math.abs(weeklyChange)} kg this week
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1">Target Weight</p>
                    <p className="text-3xl sm:text-4xl font-bold">{userData.targetWeight} kg</p>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{Math.abs(toTarget)} kg to go</p>
                </div>
            </div>
            <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="text-muted-foreground text-xs sm:text-sm">BMI</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-semibold">{bmi}</span>
                        <span className={`text-xs sm:text-sm px-2 py-0.5 rounded-full bg-${bmiCategory.color}/20 text-${bmiCategory.color}`}>
                            {bmiCategory.label}
                        </span>
                    </div>
                </div>
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full flex items-center justify-center animate-glow">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center bg-green-700/20">
                        <span className="text-xs sm:text-sm font-medium">On Track!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrendGraph = () => {
    const [timeRange, setTimeRange] = useState(30);
    const filteredData = mockData.slice(0, timeRange).reverse();

    const rangeButtons = [
        { days: 7, label: '7 Days' },
        { days: 15, label: '15 Days' },
        { days: 30, label: '30 Days' },
    ];

    return (
        <div className="card-glass p-4 sm:p-6 animate-scale-in delay-150 green-tint-gradient rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold">Weight Trend</h2>
                <div className="flex gap-2">
                    {rangeButtons.map(({ days, label }) => (
                        <button
                            key={days}
                            onClick={() => setTimeRange(days)}
                            className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                                timeRange === days 
                                    ? 'bg-primary text-white' 
                                    : 'bg-white/5 hover:bg-white/10'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                            dataKey="date" 
                            tick={{ fill: '#888', fontSize: 12 }} 
                            tickFormatter={(tickItem) => new Date(tickItem).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        />
                        <YAxis tick={{ fill: '#888', fontSize: 12 }} domain={[dataMin => (Math.floor(dataMin / 1) * 1) -1, dataMax => (Math.floor(dataMax / 1) * 1) +1]}/> 
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const Milestones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { weightEntries, progressToTarget } = useWeight();
  const achievementsList = achievements(weightEntries, progressToTarget);
  const completedCount = achievementsList.filter(a => a.completed).length;

  return (
    <div className="card-glass p-4 sm:p-6 animate-scale-in delay-300 green-tint-gradient rounded-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Milestones</h2>
        <span className="text-muted-foreground text-xs sm:text-sm">
          {completedCount}/{achievementsList.length} achieved
        </span>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-xs sm:text-sm mb-1">
          <span>Overall Goal Progress</span>
          <span>50%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{width: '50%'}} />
        </div>
      </div>

      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="text-white font-medium text-sm sm:text-base">Achievements</span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`achievements-dropdown ${isOpen ? 'open' : ''} mt-2 pr-1 sm:pr-2`}>
          <div className="space-y-2">
            {achievementsList.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-item flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${
                  achievement.completed ? 'bg-success/10 border border-success/20' : 'bg-white/5'
                }`}
              >
                <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center ${
                  achievement.completed ? 'bg-success/20' : 'bg-white/10'
                }`}>
                  <span className="text-base sm:text-lg">{achievement.icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-xs sm:text-base ${
                    achievement.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                {achievement.completed && (
                  <span className="text-[10px] sm:text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121316] text-white p-2 sm:p-6">
      <div className="container mx-auto px-1 xs:px-2 sm:px-4 py-4 sm:py-6 max-w-full sm:max-w-7xl">
        <Header activePage={"dashboard"} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <SnapshotCard />
            <TrendGraph />
            <Milestones />
          </div>
          <div className="lg:col-span-1 mt-4 lg:mt-0">
            <div className="sticky top-4">
              <ActivitySidebar />
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 640px) {
            .card-glass {
              border-radius: 1rem;
              box-shadow: 0 2px 12px 0 rgba(16,185,129,0.08);
            }
            .animate-scale-in {
              animation: none;
            }
          }
        `}
      </style>
    </div>
  );
}
