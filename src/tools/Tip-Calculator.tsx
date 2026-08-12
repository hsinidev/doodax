
import React, { useState, useMemo } from 'react';

const TIP_PERCENTAGES = [15, 18, 20, 25];

const TipCalculator: React.FC = () => {
    const [bill, setBill] = useState<number>(100);
    const [tipPercent, setTipPercent] = useState<number>(20);
    const [people, setPeople] = useState<number>(1);

    const { tipAmount, totalAmount, perPersonAmount } = useMemo(() => {
        if (bill <= 0) return { tipAmount: 0, totalAmount: 0, perPersonAmount: 0 };

        const tip = bill * (tipPercent / 100);
        const total = bill + tip;
        const perPerson = people > 0 ? total / people : total;

        return {
            tipAmount: tip,
            totalAmount: total,
            perPersonAmount: perPerson,
        };
    }, [bill, tipPercent, people]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Tip Calculator</h2>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bill Amount</label>
                    <input type="number" value={bill} onChange={e => setBill(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-2xl"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Tip %</label>
                    <div className="grid grid-cols-4 gap-2">
                        {TIP_PERCENTAGES.map(p => (
                            <button key={p} onClick={() => setTipPercent(p)} className={`p-3 rounded-md transition ${tipPercent === p ? 'bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                {p}%
                            </button>
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Number of People</label>
                    <input type="number" value={people} onChange={e => setPeople(parseInt(e.target.value) || 1)} min="1" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-2xl"/>
                </div>
            </div>

            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg space-y-4">
                 <div className="flex justify-between items-center">
                    <p className="text-gray-300">Tip Amount</p>
                    <p className="text-2xl font-bold text-cyan-400">${tipAmount.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-gray-300">Total Amount</p>
                    <p className="text-2xl font-bold text-cyan-400">${totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                    <p className="text-gray-300">Amount Per Person</p>
                    <p className="text-3xl font-bold text-cyan-400">${perPersonAmount.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default TipCalculator;
