
import React, { useState, useEffect } from 'react';

const TIMEZONES = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Paris', tz: 'Europe/Paris' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' },
    { name: 'Los Angeles', tz: 'America/Los_Angeles' },
];

const TimeZoneConverter: React.FC = () => {
    const [localTime, setLocalTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setLocalTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date, timeZone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        }).format(date);
    };
    
    const formatDate = (date: Date, timeZone: string) => {
         return new Intl.DateTimeFormat('en-US', {
            timeZone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Time Zone Converter</h2>
            <div className="bg-gray-800/50 p-6 rounded-lg mb-6 text-center">
                <p className="text-sm text-gray-400 uppercase">Your Local Time</p>
                <p className="text-4xl font-bold text-cyan-400">{formatTime(localTime, Intl.DateTimeFormat().resolvedOptions().timeZone)}</p>
                <p className="text-gray-300">{formatDate(localTime, Intl.DateTimeFormat().resolvedOptions().timeZone)}</p>
            </div>
            <div className="space-y-4">
                {TIMEZONES.map(({ name, tz }) => (
                     <div key={tz} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-xl font-semibold">{name}</p>
                            <p className="text-sm text-gray-400">{formatDate(localTime, tz)}</p>
                        </div>
                        <p className="text-2xl font-mono">{formatTime(localTime, tz)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeZoneConverter;
