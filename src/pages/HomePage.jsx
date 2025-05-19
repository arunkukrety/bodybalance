import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mockData from '../MockData';


// Mock data for the trend graph


const Header = () => (
    <header className="flex justify-between items-center mb-6 animate-fade-in">
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">BodySync</h1>
            <p className="text-gray-400">Good morning, Alex</p>
        </div>
        <div className="flex gap-4">
            <Link to="/home" className="px-4 py-2 rounded-lg transition-colors bg-green-700 text-white">Dashboard</Link>
            <Link to="/data" className="px-4 py-2 rounded-lg transition-colors hover:bg-secondary">Log Weight</Link>
        </div>
    </header>
);

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


const Milestones = () => (
  <div className="card-glass p-6 animate-scale-in delay-300 green-tint-gradient">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-white">Milestones</h2>
      <span className="text-muted-foreground text-sm">3/5 achieved</span>
    </div>
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span>Overall Goal Progress</span>
        <span>70%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{width: '70%'}} />
      </div>
    </div>
    <div className="space-y-4">
      {/* Add milestone items here */}
    </div>
  </div>
);

const ActivitySidebar = () => (
  <div className="card-glass p-6 h-full animate-scale-in delay-450 green-tint-gradient">
    <h2 className="text-xl font-semibold mb-6 text-white">Monthly Activity</h2>
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm mb-1">Total Weigh-ins</p>
        <p className="text-2xl font-bold text-white">31</p>
      </div>
      {/* Add other activity sections */}
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121316] text-white p-6 ">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
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
