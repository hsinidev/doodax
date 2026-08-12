
import React, { useMemo } from 'react';

const USPublicHolidayCalendar: React.FC = () => {
    const holidays = useMemo(() => {
        const year = new Date().getFullYear();
        const getNthDayOfWeek = (n: number, day: number, month: number) => {
            const date = new Date(year, month, 1);
            let count = 0;
            while(count < n) {
                if(date.getDay() === day) count++;
                if(count < n) date.setDate(date.getDate() + 1);
            }
            return date;
        };

        return [
            { name: "New Year's Day", date: new Date(year, 0, 1) },
            { name: 'Martin Luther King, Jr. Day', date: getNthDayOfWeek(3, 1, 0) }, // 3rd Monday in Jan
            { name: "Washington's Birthday", date: getNthDayOfWeek(3, 1, 1) }, // 3rd Monday in Feb
            { name: 'Memorial Day', date: (() => {
                const d = new Date(year, 4, 31);
                while(d.getDay() !== 1) d.setDate(d.getDate() - 1);
                return d;
            })() }, // Last Monday in May
            { name: 'Juneteenth National Independence Day', date: new Date(year, 5, 19) },
            { name: 'Independence Day', date: new Date(year, 6, 4) },
            { name: 'Labor Day', date: getNthDayOfWeek(1, 1, 8) }, // 1st Monday in Sep
            { name: 'Columbus Day', date: getNthDayOfWeek(2, 1, 9) }, // 2nd Monday in Oct
            { name: 'Veterans Day', date: new Date(year, 10, 11) },
            { name: 'Thanksgiving Day', date: getNthDayOfWeek(4, 4, 10) }, // 4th Thursday in Nov
            { name: 'Christmas Day', date: new Date(year, 11, 25) },
        ].sort((a, b) => a.date.getTime() - b.date.getTime());
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">US Public Holidays {new Date().getFullYear()}</h2>
            <div className="space-y-4">
                {holidays.map(holiday => (
                     <div key={holiday.name} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <p className="font-semibold">{holiday.name}</p>
                        <p className="text-cyan-400">{formatDate(holiday.date)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default USPublicHolidayCalendar;
