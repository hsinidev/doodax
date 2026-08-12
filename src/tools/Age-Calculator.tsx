
import React, { useState, useMemo } from 'react';

const AgeCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = useState('1990-01-01');

    const age = useMemo(() => {
        const start = new Date(birthDate);
        const end = new Date();
        if (isNaN(start.getTime()) || start > end) return null;

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        return { years, months, days };
    }, [birthDate]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Age Calculator</h2>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Date of Birth</label>
                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} max={today} className="w-full bg-gray-800 p-3 rounded-md text-xl"/>
            </div>
            {age ? (
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-400 uppercase">You Are</p>
                    <p className="text-4xl font-bold text-cyan-400 mt-2">
                        {age.years} <span className="text-2xl font-normal">years</span>, {age.months} <span className="text-2xl font-normal">months</span>, {age.days} <span className="text-2xl font-normal">days</span>
                    </p>
                    <p className="text-gray-300 mt-2">old</p>
                </div>
            ) : (
                 <p className="text-center text-yellow-400">Please select a valid birth date.</p>
            )}
        </div>
    );
};

export default AgeCalculator;
