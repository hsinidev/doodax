
import React, { useState, useMemo } from 'react';

const BreakEvenPointCalculator: React.FC = () => {
    const [fixedCosts, setFixedCosts] = useState<number>(5000);
    const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(20);
    const [pricePerUnit, setPricePerUnit] = useState<number>(50);

    const breakEvenUnits = useMemo(() => {
        const contributionMargin = pricePerUnit - variableCostPerUnit;
        if (contributionMargin <= 0) {
            return Infinity;
        }
        return fixedCosts / contributionMargin;
    }, [fixedCosts, variableCostPerUnit, pricePerUnit]);
    
    const breakEvenRevenue = isFinite(breakEvenUnits) ? breakEvenUnits * pricePerUnit : Infinity;

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Break-Even Point Calculator</h2>
            <div className="space-y-4">
                <input type="number" value={fixedCosts} onChange={e => setFixedCosts(parseFloat(e.target.value) || 0)} placeholder="Total Fixed Costs ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={variableCostPerUnit} onChange={e => setVariableCostPerUnit(parseFloat(e.target.value) || 0)} placeholder="Variable Cost Per Unit ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={pricePerUnit} onChange={e => setPricePerUnit(parseFloat(e.target.value) || 0)} placeholder="Selling Price Per Unit ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
            </div>
             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                 {isFinite(breakEvenUnits) ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-400 uppercase">Break-Even Units</p>
                            <p className="text-3xl font-bold text-cyan-400">{Math.ceil(breakEvenUnits)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 uppercase">Break-Even Revenue</p>
                            <p className="text-3xl font-bold text-cyan-400">${breakEvenRevenue.toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-yellow-400">Selling price must be greater than variable cost per unit.</p>
                )}
            </div>
        </div>
    );
};

export default BreakEvenPointCalculator;
