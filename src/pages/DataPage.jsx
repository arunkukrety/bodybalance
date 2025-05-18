import React from 'react';

// Header component
const Header = ({ userName }) => (
  <header className="flex items-center justify-between p-6 bg-white shadow-md">
    <h1 className="text-2xl font-bold">BodySync</h1>
    <span className="text-lg">Welcome back, {userName}</span>
  </header>
);

// Sidebar component
const Sidebar = () => (
  <nav className="w-56 bg-gray-50 p-6 space-y-4">
    <button className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100">Dashboard</button>
    <button className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100">Log Weight</button>
    <button className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100 font-medium text-green-600">Data</button>
  </nav>
);

// Weight log table component
const WeightLogTable = ({ entries }) => (
  <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
    <h2 className="text-lg font-medium mb-4">Weight Log</h2>
    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="border-b text-xs text-gray-500 uppercase">
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Weight (kg)</th>
          <th className="px-4 py-2">Change</th>
          <th className="px-4 py-2">Note</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{entry.date}</td>
            <td className="px-4 py-2">{entry.weight}</td>
            <td className={`px-4 py-2 ${entry.change > 0 ? 'text-red-500' : entry.change < 0 ? 'text-green-500' : 'text-gray-500'}`}>
              {entry.change > 0 ? `+${entry.change}` : entry.change}
            </td>
            <td className="px-4 py-2">{entry.note || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Export CSV or JSON buttons
const ExportSection = () => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-medium mb-4">Export Your Data</h2>
    <div className="flex space-x-4">
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Export as CSV</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Export as JSON</button>
    </div>
  </div>
);

// Main DataPage
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
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Alex" />
        <main className="p-6 space-y-6">
          <WeightLogTable entries={weightEntries} />
          <ExportSection />
        </main>
      </div>
    </div>
  );
}
