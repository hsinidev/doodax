
import React, { useState, useMemo } from 'react';

// Mock CPI data (Consumer Price Index), where 2020 is the base year (100)
const MOCK_CPI_DATA: { [year: number]: number } = {
    1980: 38.8, 1990: 58.3, 2000: 72.2, 2010: 90.9,
    2020: 100.0, 2021: 104.7, 2022: 113.1, 2023: 117.2, 2024: 120.9
};
const YEARS = Object.keys(MOCK_CPI_DATA).map(Number);

const InflationCalculator: React.FC = () => {
    const [amount, setAmount] = useState<number>(100);
    const [startYear, setStartYear] = useState<number>(2000);
    const [endYear, setEndYear] = useState<number>(2024);

    const adjustedValue = useMemo(() => {
        const startCpi = MOCK_CPI_DATA[startYear];
        const endCpi = MOCK_CPI_DATA[endYear];
        return amount * (endCpi / startCpi);
    }, [amount, startYear, endYear]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Inflation Calculator</h2>
            <div className="space-y-4">
                 <div>
                    <label>Amount ($)</label>
                    <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Start Year</label>
                        <select value={startYear} onChange={e => setStartYear(parseInt(e.target.value))} className="w-full bg-gray-800 p-3 rounded-md">
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>End Year</label>
                        <select value={endYear} onChange={e => setEndYear(parseInt(e.target.value))} className="w-full bg-gray-800 p-3 rounded-md">
                             {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>
            </div>
             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-400 uppercase">
                    ${amount} in {startYear} has the same purchasing power as...
                </p>
                <p className="text-4xl font-bold text-cyan-400 mt-2">
                    ${adjustedValue.toFixed(2)}
                </p>
                 <p className="text-sm text-gray-400">in {endYear}</p>
            </div>
        </div>
    );
};

export default InflationCalculator;
