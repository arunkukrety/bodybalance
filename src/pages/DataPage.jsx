import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS
import mockData from '../data/MockData';

const ManualEntryForm = ({ onSubmit }) => {
    const [date, setDate] = useState(new Date());
    const [weight, setWeight] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setIsCalendarOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        console.log('Submitting Entry:', { date: formattedDate, weight });
        onSubmit({ date: formattedDate, weight });
        setWeight('');
    };

    return (
        <div className="card-glass p-4 sm:p-6 animate-scale-in green-tint-gradient rounded-2xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Log Your Weight</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="text-muted-foreground text-xs sm:text-sm">Date</label>
                        <div className="calendar-container relative" ref={calendarRef}>
                            <button
                                ref={buttonRef}
                                type="button"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="w-full px-4 py-2 bg-secondary rounded-lg border border-white/10 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 flex justify-between items-center text-xs sm:text-base"
                            >
                                <span>{date.toLocaleDateString('en-US', { 
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                                <svg
                                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isCalendarOpen && (
                                <div className="calendar-dropdown-improved absolute top-full left-0 mt-2 z-50">
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
                        <label htmlFor="weight" className="text-muted-foreground text-xs sm:text-sm">Weight (kg)</label>
                        <div className="relative">
                            <input
                                id="weight"
                                type="text"
                                placeholder="Enter your weight"
                                className="w-full px-4 py-2 bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-base"
                                required
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <span className="absolute right-4 top-2 text-muted-foreground text-xs sm:text-sm">kg</span>
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-green-700 text-white font-medium rounded-lg transition-transform hover:scale-105 active:scale-95 text-xs sm:text-base"
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
        <div className="card-glass p-4 sm:p-6 animate-scale-in delay-150 overflow-x-auto green-tint-gradient rounded-2xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Weight History</h2>
            <div className="w-full min-w-[340px]">
                <table className="w-full text-left text-xs sm:text-base">
                    <thead className="border-b border-white/10">
                        <tr>
                            <th className="pb-2 sm:pb-3 font-medium">Date</th>
                            <th className="pb-2 sm:pb-3 font-medium">Weight (kg)</th>
                            <th className="pb-2 sm:pb-3 font-medium">Change</th>
                            <th className="pb-2 sm:pb-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weightEntries.map((entry, index) => (
                            <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                                <td className="py-2 sm:py-3">{entry.date}</td>
                                <td className="py-2 sm:py-3">{entry.weight}</td>
                                <td className="py-2 sm:py-3">{formatChange(entry.change)}</td>
                                <td className="py-2 sm:py-3">
                                    <div className="flex gap-1 sm:gap-2">
                                        <button onClick={() => onEdit(index)} className="text-xs sm:text-sm px-2 py-1 bg-secondary rounded hover:bg-secondary/80 hover:cursor-pointer">
                                            Edit
                                        </button>
                                        <button onClick={() => onDelete(index)} className="text-xs sm:text-sm px-2 py-1 bg-danger/20 text-danger rounded hover:bg-danger/30 hover:cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default function DataPage() {
    // Update the date formatting in initialEntries with proper sorting
    const initialEntries = mockData
        .map((entry, index, array) => {
            const change = index < array.length - 1 
                ? parseFloat((entry.weight - array[index + 1].weight).toFixed(1))
                : 0;
                
            const dateObj = new Date(entry.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
                
            return {
                date: formattedDate,
                dateObj: dateObj, // Keep the date object for sorting
                weight: entry.weight,
                change: change
            };
        })
        .sort((a, b) => b.dateObj - a.dateObj); // Sort by date in descending order

    console.log('Initial Entries:', initialEntries);
    const [weightEntries, setWeightEntries] = useState(initialEntries);

    const handleEntrySubmit = (newEntry) => {
        console.log('New Entry Received:', newEntry);
        const lastEntry = weightEntries[0];
        console.log('Last Entry:', lastEntry);

        const change = lastEntry 
            ? parseFloat((newEntry.weight - lastEntry.weight).toFixed(1))
            : 0;
        
        console.log('Calculated Change:', change);

        const formattedEntry = {
            ...newEntry,
            dateObj: new Date(newEntry.date), // Add dateObj for sorting
            change: change
        };
        
        console.log('Formatted Entry:', formattedEntry);

        // Insert and sort
        const updatedEntries = [formattedEntry, ...weightEntries]
            .sort((a, b) => b.dateObj - a.dateObj);
        
        console.log('Updated Entries:', updatedEntries);
        setWeightEntries(updatedEntries);
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
        <div className="min-h-screen bg-[#121316] text-white p-2 sm:p-6">
            <div className="container mx-auto px-1 xs:px-2 sm:px-4 py-4 sm:py-6 max-w-full sm:max-w-7xl">
                <Header activePage={"log"} />
                <div className="space-y-4 sm:space-y-6">
                    <ManualEntryForm onSubmit={handleEntrySubmit} />
                    <HistoryTable weightEntries={weightEntries} onDelete={handleDelete} onEdit={handleEdit} />
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
                        .calendar-dropdown-improved {
                            left: 0 !important;
                            right: auto !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}