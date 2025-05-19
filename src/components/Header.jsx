import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header = ({ activePage }) => {
    const { userData } = useUser();

    return (
        <header className="flex justify-between items-center mb-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">BodySync</h1>
                <p className="text-gray-400">Good morning, {userData?.name || 'User'}</p>
            </div>
            <div className="flex gap-4">
                <Link
                    to="/home"
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        activePage === "dashboard" ? "bg-green-700 text-white" : "hover:bg-secondary"
                    }`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/data"
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        activePage === "log" ? "bg-green-700 text-white" : "hover:bg-secondary"
                    }`}
                >
                    Log Weight
                </Link>
            </div>
        </header>
    );
};

export default Header;
