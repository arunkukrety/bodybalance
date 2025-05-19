import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS
import mockData from '../MockData';

const ManualEntryForm = ({ onSubmit }) => {
    const [date, setDate] = useState(new Date());
    const [weight, setWeight] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
    const calendarRef = useRef(null);
    const buttonRef = useRef(null);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isCalendarOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCalendarPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }, [isCalendarOpen]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setIsCalendarOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ date: date.toLocaleDateString(), weight }); // Format date
        setWeight('');
    };

    return (
        <div className="card-glass p-6 animate-scale-in">
            <h2 className="text-xl font-semibold mb-6">Log Your Weight</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Date</label>
                        <div className="calendar-container" ref={calendarRef}>
                            <button
                                ref={buttonRef}
                                type="button"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="w-full px-4 py-2 bg-secondary rounded-lg border border-white/10 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 flex justify-between items-center"
                            >
                                <span>{date.toLocaleDateString('en-US', { 
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isCalendarOpen && (
                                <div 
                                    className="calendar-dropdown"
                                    style={{
                                        top: `${calendarPosition.top}px`,
                                        left: `${calendarPosition.left}px`
                                    }}
                                >
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={date}
                                        maxDate={new Date()}
                                        className="shadow-xl"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="weight" className="text-muted-foreground text-sm">Weight (kg)</label>
                        <div className="relative">
                            <input
                                id="weight"
                                type="number"
                                placeholder="Enter your weight"
                                step="0.1"
                                min="30"
                                max="300"
                                className="w-full px-4 py-2 bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <span className="absolute right-4 top-2 text-muted-foreground">kg</span>
                        </div>
                    </div>
                </div>
                <div className="pt-2"> {/* Added pt-2 for spacing */}
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        Save Entry
                    </button>
                </div>
            </form>
        </div>
    );
};

const HistoryTable = ({ weightEntries, onEdit, onDelete }) => {
    const formatChange = (change) => {
        if (change > 0) {
            return <span className="text-warning">+{change} kg</span>; // Use text-warning for positive change
        } else if (change < 0) {
            return <span className="text-success">{change} kg</span>;
        } else {
            return <span className="text-muted-foreground">0.0 kg</span>;
        }
    };

    return (
        <div className="card-glass p-6 animate-scale-in delay-150 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-6">Weight History</h2>
            <table className="w-full text-left">
                <thead className="border-b border-white/10"> {/* Added border to table header */}
                    <tr>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Weight (kg)</th>
                        <th className="pb-3 font-medium">Change</th>
                        <th className="pb-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {weightEntries.map((entry, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-3">{entry.date}</td>
                            <td className="py-3">{entry.weight}</td>
                            <td className="py-3">{formatChange(entry.change)}</td>
                            <td className="py-3">
                                <div className="flex gap-2">
                                    <button onClick={() => onEdit(index)} className="text-sm px-2 py-1 bg-secondary rounded hover:bg-secondary/80">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(index)} className="text-sm px-2 py-1 bg-danger/20 text-danger rounded hover:bg-danger/30"> {/* Corrected Delete button color */}
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default function DataPage() {
    // Convert mockData to the format we need
    const initialEntries = mockData.map((entry, index, array) => {
        const change = index < array.length - 1 
            ? parseFloat((entry.weight - array[index + 1].weight).toFixed(1))
            : 0;
            
        return {
            date: new Date(entry.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            weight: entry.weight,
            change: change
        };
    });

    const [weightEntries, setWeightEntries] = useState(initialEntries);

    const handleEntrySubmit = (newEntry) => {
        // Calculate change based on the difference with the last entry
        const lastEntry = weightEntries[0];
        const change = lastEntry 
            ? parseFloat((newEntry.weight - lastEntry.weight).toFixed(1))
            : 0;

        const formattedEntry = {
            ...newEntry,
            change: change
        };

        setWeightEntries([formattedEntry, ...weightEntries]);
    };

    const handleEdit = (index) => {
        // Implementation for editing (not included in the image reference but essential)
        const updatedEntries = [...weightEntries];
        // Open a modal or form to edit the entry
        // After editing, update the state with the changed entry:
        // setWeightEntries(updatedEntries)
    };

    const handleDelete = (index) => {
        const updatedEntries = [...weightEntries];
        updatedEntries.splice(index, 1);

        setWeightEntries(updatedEntries);
    };

    return (
        <div className="min-h-screen bg-[#121316] text-white p-6">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <Header activePage={"log"} />
                <div className="space-y-6">
                    <ManualEntryForm onSubmit={handleEntrySubmit} />
                    <HistoryTable weightEntries={weightEntries} onDelete={handleDelete} onEdit={handleEdit} />
                </div>
            </div>
        </div>
    );
}