
import React, { useState, useMemo } from 'react';

const SavingsGoalCalculator: React.FC = () => {
    const [goal, setGoal] = useState<number>(10000);
    const [initialSavings, setInitialSavings] = useState<number>(1000);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(250);

    const { months, years } = useMemo(() => {
        if (monthlyContribution <= 0) {
            return { months: Infinity, years: Infinity };
        }
        const remaining = goal - initialSavings;
        if (remaining <= 0) {
            return { months: 0, years: 0 };
        }
        const totalMonths = Math.ceil(remaining / monthlyContribution);
        const totalYears = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;
        return { months: remainingMonths, years: totalYears };
    }, [goal, initialSavings, monthlyContribution]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Savings Goal Calculator</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Savings Goal ($)</label>
                    <input type="number" value={goal} onChange={e => setGoal(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Initial Savings ($)</label>
                    <input type="number" value={initialSavings} onChange={e => setInitialSavings(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Monthly Contribution ($)</label>
                    <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
            </div>

            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                 <p className="text-sm text-gray-400 uppercase">Time to Reach Your Goal</p>
                 {isFinite(months) ? (
                    <p className="text-4xl font-bold text-cyan-400 mt-2">
                        {years > 0 && `${years} Year${years > 1 ? 's' : ''}`}
                        {years > 0 && months > 0 && ' and '}
                        {months > 0 && `${months} Month${months > 1 ? 's' : ''}`}
                        {years === 0 && months === 0 && 'Goal Reached!'}
                    </p>
                 ) : (
                    <p className="text-2xl font-bold text-yellow-400 mt-2">
                        Monthly contribution must be positive.
                    </p>
                 )}
            </div>
        </div>
    );
};

export default SavingsGoalCalculator;
