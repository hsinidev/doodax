
import React, { useState, useMemo } from 'react';

const DebtPayoffCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState<number>(10000);
    const [interestRate, setInterestRate] = useState<number>(18);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(300);

    const { months, totalInterest, totalPaid } = useMemo(() => {
        if (principal <= 0) return { months: 0, totalInterest: 0, totalPaid: 0 };
        
        const monthlyInterestRate = (interestRate / 100) / 12;

        if (monthlyPayment <= principal * monthlyInterestRate) {
            return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
        }

        let balance = principal;
        let monthsCount = 0;
        let interestPaid = 0;

        while (balance > 0) {
            const interest = balance * monthlyInterestRate;
            interestPaid += interest;
            const principalPaid = monthlyPayment - interest;
            balance -= principalPaid;
            monthsCount++;
            if (monthsCount > 1200) break; // Safety break for ~100 years
        }

        return { months: monthsCount, totalInterest: interestPaid, totalPaid: principal + interestPaid };

    }, [principal, interestRate, monthlyPayment]);

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Debt Payoff Calculator</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Total Debt Amount ($)</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Annual Interest Rate (%)</label>
                    <input type="number" value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Monthly Payment ($)</label>
                    <input type="number" value={monthlyPayment} onChange={e => setMonthlyPayment(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
            </div>
             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center space-y-4">
                 {isFinite(months) ? (
                    <>
                        <div>
                             <p className="text-sm text-gray-400 uppercase">Time to Be Debt-Free</p>
                            <p className="text-3xl font-bold text-cyan-400 mt-1">{`${years} years, ${remainingMonths} months`}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Total Interest Paid</p>
                                <p className="text-2xl font-bold">${totalInterest.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Amount Paid</p>
                                <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-yellow-400">Monthly payment must be greater than monthly interest to pay off debt.</p>
                )}
            </div>
        </div>
    );
};

export default DebtPayoffCalculator;
