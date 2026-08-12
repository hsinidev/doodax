
import React, { useState, useMemo } from 'react';

const InvestmentReturnCalculator: React.FC = () => {
    const [initialInvestment, setInitialInvestment] = useState<number>(1000);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
    const [years, setYears] = useState<number>(10);
    const [annualRate, setAnnualRate] = useState<number>(7);

    const futureValue = useMemo(() => {
        const monthlyRate = (annualRate / 100) / 12;
        const months = years * 12;

        const fvOfInitial = initialInvestment * Math.pow(1 + monthlyRate, months);
        const fvOfContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        return fvOfInitial + fvOfContributions;
    }, [initialInvestment, monthlyContribution, years, annualRate]);

    const totalContributions = initialInvestment + (monthlyContribution * years * 12);
    const totalInterest = futureValue - totalContributions;

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Investment Return Calculator</h2>
            <div className="space-y-4">
                <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(parseFloat(e.target.value) || 0)} placeholder="Initial Investment ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(parseFloat(e.target.value) || 0)} placeholder="Monthly Contribution ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={years} onChange={e => setYears(parseInt(e.target.value) || 0)} placeholder="Years to Grow" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={annualRate} onChange={e => setAnnualRate(parseFloat(e.target.value) || 0)} placeholder="Expected Annual Return (%)" className="w-full bg-gray-800 p-3 rounded-md"/>
            </div>
             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-400 uppercase">Future Value</p>
                <p className="text-4xl font-bold text-cyan-400 mt-2">${futureValue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                 <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                        <p className="text-gray-400">Total Contributions</p>
                        <p className="font-bold">${totalContributions.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                    </div>
                     <div>
                        <p className="text-gray-400">Total Interest Earned</p>
                        <p className="font-bold text-green-400">${totalInterest.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentReturnCalculator;
