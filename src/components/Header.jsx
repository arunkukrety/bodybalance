import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header = ({ activePage }) => {
    const { userData } = useUser();

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2 sm:gap-0 animate-fade-in">
            <div className="flex flex-col items-center sm:items-start">
                <Link to="/home" className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">BodyBalance</h1>
                </Link>
                <p className="text-gray-400 text-xs sm:text-base">Good morning, {userData?.name || 'User'}</p>
            </div>
            <nav className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
                <Link
                    to="/home"
                    className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-base ${
                        activePage === "dashboard" ? "bg-green-700 text-white" : "hover:bg-secondary"
                    }`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/data"
                    className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-base ${
                        activePage === "log" ? "bg-green-700 text-white" : "hover:bg-secondary"
                    }`}
                >
                    Log Weight
                </Link>
            </nav>
        </header>
    );
};

export default Header;
