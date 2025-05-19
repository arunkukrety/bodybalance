import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('userData');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);

    const calculateBMI = (weight, height) => {
        const heightInM = height / 100;
        const bmi = weight / (heightInM * heightInM);
        return bmi.toFixed(1);
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
        if (bmi < 25) return { label: 'Normal', color: 'success' };
        if (bmi < 30) return { label: 'Overweight', color: 'warning' };
        return { label: 'Obese', color: 'danger' };
    };

    return (
        <UserContext.Provider value={{ userData, setUserData, calculateBMI, getBMICategory }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
