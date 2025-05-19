import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mockData from '../MockData';
import { achievements } from '../data/achievements';
import Header from '../components/Header';
import { AchievementsMenu } from '../components/AchievementsMenu';

// Mock data for the trend graph


const SnapshotCard = () => (
    <div className="card-glass p-6 animate-scale-in delay-75 transition-all duration-300 hover:shadow-2xl green-tint-gradient">
        <h2 className="text-xl font-semibold mb-4">Today's Snapshot</h2>
        <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Current Weight</p>
                <p className="text-4xl font-bold text-success">69.2 kg</p>
                <p className="mt-2 text-sm text-success">↓ 0.8 kg this week</p>
            </div>
            <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Target Weight</p>
                <p className="text-4xl font-bold">68 kg</p>
                <p className="mt-2 text-sm text-muted-foreground">1.2 kg to go</p>
            </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
                <span className="text-muted-foreground text-sm">BMI</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold">22.6</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-success/20 text-success">Normal</span>
                </div>
            </div>
            <div className=" h-24 w-24 rounded-full flex items-center justify-center animate-glow">
                <div className="h-20 w-20 rounded-full flex items-center justify-center bg-green-700/20">
                    <span className="text-sm font-medium ">On Track!</span>
                </div>
            </div>
        </div>
    </div>
);

const TrendGraph = () => {
    return (
        <div className="card-glass p-6 animate-scale-in delay-150 green-tint-gradient">
            <h2 className="text-xl font-semibold mb-4">Weight Trend (Last 30 Days)</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(tickItem) => new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}/>
                        <YAxis tick={{ fill: '#888', fontSize: 12 }} domain={[dataMin => (Math.floor(dataMin / 1) * 1) -1, dataMax => (Math.floor(dataMax / 1) * 1) +1]}/>  {/* Dynamic Y-axis domain */}
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
  const completedCount = achievements.filter(a => a.completed).length;

  return (
    <div className="card-glass p-6 animate-scale-in delay-300 green-tint-gradient">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Milestones</h2>
        <span className="text-muted-foreground text-sm">
          {completedCount}/{achievements.length} achieved
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Overall Goal Progress</span>
          <span>70%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{width: '70%'}} />
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="text-white font-medium">Achievements</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`achievements-dropdown ${isOpen ? 'open' : ''} mt-2 pr-2`}>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-item flex items-center gap-3 p-3 rounded-lg ${
                  achievement.completed ? 'bg-success/10 border border-success/20' : 'bg-white/5'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  achievement.completed ? 'bg-success/20' : 'bg-white/10'
                }`}>
                  <span className="text-lg">{achievement.icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    achievement.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                {achievement.completed && (
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
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

const ActivitySidebar = () => (
  <div className="card-glass p-6 h-full animate-scale-in delay-450 green-tint-gradient">
    <h2 className="text-xl font-semibold mb-6 text-white">Monthly Activity</h2>
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm mb-1">Total Weigh-ins</p>
        <p className="text-2xl font-bold text-white">31</p>
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-1">Longest Streak</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-white">11</p>
          <p className="text-muted-foreground">days</p>
        </div>
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
            <span className="font-medium text-white">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-danger flex items-center gap-1">
              <span className="inline-block h-3 w-3 bg-danger rounded-full"></span>
              Gain Days
            </span>
            <span className="font-medium text-white">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="inline-block h-3 w-3 bg-muted-foreground rounded-full"></span>
              Stable Days
            </span>
            <span className="font-medium text-white">1</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-muted-foreground text-sm mb-3">Achievements</p>
        <div className="flex flex-wrap gap-2">
          {achievements
            .filter(a => a.completed)
            .slice(0, 3)
            .map(achievement => (
              <div 
                key={achievement.id}
                className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center" 
                title={achievement.title}
              >
                <span className="text-lg">{achievement.icon}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121316] text-white p-6 ">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header activePage={"dashboard"} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SnapshotCard />
            <TrendGraph />
            <Milestones />
          </div>
          <div className="lg:col-span-1">
            <ActivitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
