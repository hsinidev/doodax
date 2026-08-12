
import React, { useState, useEffect } from 'react';

const CITIES = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' },
    { name: 'Dubai', tz: 'Asia/Dubai' },
];

const WorldClockDashboard: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const getFormattedTime = (tz: string) => {
        return time.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    };
    
    const getFormattedDate = (tz: string) => {
         return time.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">World Clock Dashboard</h2>
            <div className="space-y-4">
                {CITIES.map(city => (
                    <div key={city.tz} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-xl font-semibold">{city.name}</p>
                            <p className="text-sm text-gray-400">{getFormattedDate(city.tz)}</p>
                        </div>
                        <p className="text-4xl font-mono font-bold text-cyan-400">{getFormattedTime(city.tz)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorldClockDashboard;
