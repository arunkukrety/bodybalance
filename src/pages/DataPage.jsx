import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="flex justify-between items-center mb-6 animate-fade-in">
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">BodySync</h1>
            <p className="text-gray-400">Good morning, Alex</p>
        </div>
        <div className="flex gap-4">
            <Link to="/home" className="px-4 py-2 rounded-lg transition-colors hover:bg-secondary text-white">Dashboard</Link>
            <Link to="/data" className="px-4 py-2 rounded-lg transition-colors bg-green-700 text-white">Log Weight</Link>
        </div>
    </header>
);

const WeightLogTable = ({ entries }) => (
    <div className="card-glass p-6 animate-scale-in delay-75 green-tint-gradient">
        <h2 className="text-xl font-semibold mb-6 text-white">Weight Log</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Weight (kg)</th>
                        <th className="px-4 py-3 font-medium">Change</th>
                        <th className="px-4 py-3 font-medium">Note</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {entries.map((entry, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 text-white">{entry.date}</td>
                            <td className="px-4 py-3 text-white">{entry.weight}</td>
                            <td className={`px-4 py-3 ${
                                entry.change > 0 ? 'text-danger' : 
                                entry.change < 0 ? 'text-success' : 
                                'text-muted-foreground'
                            }`}>
                                {entry.change > 0 ? `+${entry.change}` : entry.change}
                            </td>
                            <td className="px-4 py-3 text-gray-400">{entry.note || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ExportSection = () => (
    <div className="card-glass p-6 animate-scale-in delay-150 green-tint-gradient">
        <h2 className="text-xl font-semibold mb-6 text-white">Export Your Data</h2>
        <div className="flex gap-4">
            <button className="px-4 py-2 bg-success/20 text-success rounded-lg hover:bg-success/30 transition-colors">
                Export as CSV
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Export as JSON
            </button>
        </div>
    </div>
);

export default function DataPage() {
    const weightEntries = [
        { date: 'May 15', weight: 69.2, change: -0.3, note: 'Felt light today' },
        { date: 'May 9', weight: 69.5, change: -0.1 },
        { date: 'May 4', weight: 69.6, change: -0.5 },
        { date: 'Apr 29', weight: 70.1, change: 0.6, note: 'Weekend binge 😅' },
        { date: 'Apr 24', weight: 69.5, change: 0.3 },
        { date: 'Apr 19', weight: 69.2, change: 0.0, note: 'Baseline entry' },
    ];

    return (
        <div className="min-h-screen bg-[#121316] text-white p-6">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <Header />
                <div className="space-y-6">
                    <WeightLogTable entries={weightEntries} />
                    <ExportSection />
                </div>
            </div>
        </div>
    );
}
