

import React, { useState, useMemo } from 'react';

const NetWorthTracker: React.FC = () => {
    const [assets, setAssets] = useState({ cash: 20000, investments: 50000, realEstate: 250000, other: 5000 });
    const [liabilities, setLiabilities] = useState({ mortgage: 200000, studentLoans: 15000, creditCard: 5000, other: 2000 });

    const handleAssetChange = (key: keyof typeof assets, value: number) => {
        setAssets(prev => ({ ...prev, [key]: value }));
    };

    const handleLiabilityChange = (key: keyof typeof liabilities, value: number) => {
        setLiabilities(prev => ({ ...prev, [key]: value }));
    };

    const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
        // FIX: Explicitly typed the parameters of the reduce function to ensure correct type inference for the arithmetic operation.
        const totalA = Object.values(assets).reduce<number>((sum, val) => sum + (val as number), 0);
        const totalL = Object.values(liabilities).reduce<number>((sum, val) => sum + (val as number), 0);
        return {
            totalAssets: totalA,
            totalLiabilities: totalL,
            netWorth: totalA - totalL,
        };
    }, [assets, liabilities]);

    const InputRow: React.FC<{ label: string; value: number; onChange: (val: number) => void }> = ({ label, value, onChange }) => (
        <div className="flex justify-between items-center">
            <label className="text-gray-300">{label}</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} className="w-40 bg-gray-800 p-2 pl-6 rounded-md text-right" />
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Net Worth Tracker</h2>
            <p className="text-center text-gray-400 mb-8">(Placeholder UI - Your data is not saved)</p>

            <div className="bg-gray-800/50 p-6 rounded-lg text-center mb-8">
                <p className="text-sm text-gray-400 uppercase">Your Estimated Net Worth</p>
                <p className="text-5xl font-bold text-cyan-400 mt-2">${netWorth.toLocaleString('en-US')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-green-400">Assets</h3>
                    <div className="space-y-3">
                        <InputRow label="Cash & Savings" value={assets.cash} onChange={v => handleAssetChange('cash', v)} />
                        <InputRow label="Investments (Stocks, etc.)" value={assets.investments} onChange={v => handleAssetChange('investments', v)} />
                        <InputRow label="Real Estate (Home Value)" value={assets.realEstate} onChange={v => handleAssetChange('realEstate', v)} />
                        <InputRow label="Other (Vehicles, etc.)" value={assets.other} onChange={v => handleAssetChange('other', v)} />
                    </div>
                    <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between font-bold text-lg">
                        <span>Total Assets</span>
                        <span>${totalAssets.toLocaleString('en-US')}</span>
                    </div>
                </div>

                {/* Liabilities */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-red-400">Liabilities</h3>
                    <div className="space-y-3">
                        <InputRow label="Mortgage" value={liabilities.mortgage} onChange={v => handleLiabilityChange('mortgage', v)} />
                        <InputRow label="Student Loans" value={liabilities.studentLoans} onChange={v => handleLiabilityChange('studentLoans', v)} />
                        <InputRow label="Credit Card Debt" value={liabilities.creditCard} onChange={v => handleLiabilityChange('creditCard', v)} />
                        <InputRow label="Other Loans" value={liabilities.other} onChange={v => handleLiabilityChange('other', v)} />
                    </div>
                    <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between font-bold text-lg">
                        <span>Total Liabilities</span>
                        <span>${totalLiabilities.toLocaleString('en-US')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetWorthTracker;