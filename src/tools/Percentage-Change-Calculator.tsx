
import React, { useState, useMemo } from 'react';

const PercentageChangeCalculator: React.FC = () => {
    const [initialValue, setInitialValue] = useState<number>(100);
    const [finalValue, setFinalValue] = useState<number>(125);

    const { change, isIncrease } = useMemo(() => {
        if (initialValue === 0) {
            return { change: finalValue > 0 ? Infinity : 0, isIncrease: finalValue > 0 };
        }
        const pctChange = ((finalValue - initialValue) / initialValue) * 100;
        return { change: pctChange, isIncrease: pctChange >= 0 };
    }, [initialValue, finalValue]);

    const getResultUI = () => {
        if (!isFinite(change)) {
            return <p className="text-2xl font-bold text-yellow-400">Cannot divide by zero.</p>;
        }

        const colorClass = isIncrease ? 'text-green-400' : 'text-red-400';
        const symbol = isIncrease ? '▲' : '▼';

        return (
            <p className={`text-5xl font-bold ${colorClass}`}>
                {symbol} {change.toFixed(2)}%
            </p>
        );
    };

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Percentage Change Calculator</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Initial Value</label>
                    <input type="number" value={initialValue} onChange={e => setInitialValue(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Final Value</label>
                    <input type="number" value={finalValue} onChange={e => setFinalValue(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
            </div>
            
            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                 <p className="text-sm text-gray-400 uppercase">Percentage Change</p>
                 <div className="mt-2">{getResultUI()}</div>
            </div>
        </div>
    );
};

export default PercentageChangeCalculator;
