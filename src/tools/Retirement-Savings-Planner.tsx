
import React, { useState, useMemo } from 'react';

const RetirementSavingsPlanner: React.FC = () => {
    const [currentAge, setCurrentAge] = useState<number>(30);
    const [retirementAge, setRetirementAge] = useState<number>(65);
    const [initialSavings, setInitialSavings] = useState<number>(25000);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
    const [annualReturn, setAnnualReturn] = useState<number>(7);

    const futureValue = useMemo(() => {
        const years = retirementAge - currentAge;
        if (years <= 0) return initialSavings;

        const monthlyRate = (annualReturn / 100) / 12;
        const months = years * 12;

        const fvOfInitial = initialSavings * Math.pow(1 + monthlyRate, months);
        const fvOfContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        return fvOfInitial + fvOfContributions;
    }, [currentAge, retirementAge, initialSavings, monthlyContribution, annualReturn]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Retirement Savings Planner</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" value={currentAge} onChange={e => setCurrentAge(parseInt(e.target.value) || 0)} placeholder="Current Age" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                    <input type="number" value={retirementAge} onChange={e => setRetirementAge(parseInt(e.target.value) || 0)} placeholder="Retirement Age" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                </div>
                <input type="number" value={initialSavings} onChange={e => setInitialSavings(parseFloat(e.target.value) || 0)} placeholder="Initial Savings ($)" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(parseFloat(e.target.value) || 0)} placeholder="Monthly Contribution ($)" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                <input type="number" value={annualReturn} onChange={e => setAnnualReturn(parseFloat(e.target.value) || 0)} placeholder="Expected Annual Return (%)" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
            </div>
            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-400 uppercase">Estimated Retirement Savings</p>
                <p className="text-4xl font-bold text-cyan-400 mt-2">${futureValue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                <p className="text-gray-400">at age {retirementAge}</p>
            </div>
        </div>
    );
};

export default RetirementSavingsPlanner;
