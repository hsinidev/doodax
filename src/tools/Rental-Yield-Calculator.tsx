
import React, { useState, useMemo } from 'react';

const RentalYieldCalculator: React.FC = () => {
    const [propertyPrice, setPropertyPrice] = useState<number>(250000);
    const [monthlyRent, setMonthlyRent] = useState<number>(1800);
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(400);

    const { grossYield, netYield } = useMemo(() => {
        if (propertyPrice <= 0) return { grossYield: 0, netYield: 0 };
        const annualRent = monthlyRent * 12;
        const annualExpenses = monthlyExpenses * 12;

        const gross = (annualRent / propertyPrice) * 100;
        const net = ((annualRent - annualExpenses) / propertyPrice) * 100;
        
        return { grossYield: gross, netYield: net };
    }, [propertyPrice, monthlyRent, monthlyExpenses]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Rental Yield Calculator</h2>
            <div className="space-y-4">
                <input type="number" value={propertyPrice} onChange={e => setPropertyPrice(parseFloat(e.target.value) || 0)} placeholder="Total Property Price ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={monthlyRent} onChange={e => setMonthlyRent(parseFloat(e.target.value) || 0)} placeholder="Monthly Rental Income ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(parseFloat(e.target.value) || 0)} placeholder="Monthly Expenses ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
            </div>
             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-400 uppercase">Gross Rental Yield</p>
                        <p className="text-3xl font-bold">{grossYield.toFixed(2)}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 uppercase">Net Rental Yield</p>
                        <p className="text-3xl font-bold text-cyan-400">{netYield.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalYieldCalculator;
