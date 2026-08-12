
import React, { useState, useMemo } from 'react';

const UNITS = [
    { name: 'Bytes (B)', multiplier: 1 },
    { name: 'Kilobytes (KB)', multiplier: 1024 },
    { name: 'Megabytes (MB)', multiplier: Math.pow(1024, 2) },
    { name: 'Gigabytes (GB)', multiplier: Math.pow(1024, 3) },
    { name: 'Terabytes (TB)', multiplier: Math.pow(1024, 4) },
];

const FileSizeConverter: React.FC = () => {
    const [amount, setAmount] = useState(1);
    const [fromUnit, setFromUnit] = useState('MB');

    const results = useMemo(() => {
        const fromMultiplier = UNITS.find(u => u.name.includes(fromUnit))?.multiplier || 1;
        const amountInBytes = amount * fromMultiplier;

        return UNITS.map(unit => ({
            name: unit.name,
            value: (amountInBytes / unit.multiplier).toLocaleString(undefined, { maximumFractionDigits: 3 }),
        }));
    }, [amount, fromUnit]);

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">File Size Converter</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md text-xl"/>
                <select value={fromUnit} onChange={e => setFromUnit(e.target.value.split(' ')[0])} className="w-full bg-gray-800 p-3 rounded-md text-xl">
                    {UNITS.map(u => <option key={u.name}>{u.name}</option>)}
                </select>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-center">Conversion Results</h3>
                <ul className="space-y-2">
                    {results.map(res => (
                        <li key={res.name} className="flex justify-between p-2 rounded-md bg-gray-800">
                            <span className="text-gray-300">{res.name}</span>
                            <span className="font-mono text-cyan-400">{res.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FileSizeConverter;
