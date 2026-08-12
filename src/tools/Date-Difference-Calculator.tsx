
import React, { useState, useMemo } from 'react';

const DateDifferenceCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const difference = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // This is a simplified calculation for display.
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth() + (12 * years);
        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;
        
        return { totalDays, months, weeks, days, years };

    }, [startDate, endDate]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Date Difference Calculator</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>Start Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md"/>
                </div>
                 <div>
                    <label>End Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md"/>
                </div>
            </div>
            {difference && (
                <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-400 uppercase">Difference</p>
                    <p className="text-3xl font-bold text-cyan-400 mt-2">{difference.totalDays.toLocaleString()} days</p>
                    <p className="text-gray-300 mt-2">
                        (or {difference.months} months, or {difference.weeks} weeks and {difference.days} days)
                    </p>
                </div>
            )}
        </div>
    );
};

export default DateDifferenceCalculator;
