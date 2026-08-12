
import React, { useState, useMemo } from 'react';

interface AmortizationRow {
    year: number;
    principal: number;
    interest: number;
    endingBalance: number;
}

const MortgageAmortizationCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(300000);
    const [interestRate, setInterestRate] = useState<number>(6.5);
    const [loanTerm, setLoanTerm] = useState<number>(30);

    const { monthlyPayment, schedule } = useMemo(() => {
        const principal = loanAmount;
        const monthlyInterestRate = (interestRate / 100) / 12;
        const numberOfPayments = loanTerm * 12;

        if (principal <= 0 || monthlyInterestRate <= 0 || numberOfPayments <= 0) {
            return { monthlyPayment: 0, schedule: [] };
        }

        const payment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
        let balance = principal;
        const yearlySchedule: AmortizationRow[] = [];
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;

        for (let i = 1; i <= numberOfPayments; i++) {
            const interest = balance * monthlyInterestRate;
            const principalPaid = payment - interest;
            balance -= principalPaid;
            
            yearlyPrincipal += principalPaid;
            yearlyInterest += interest;

            if (i % 12 === 0 || i === numberOfPayments) {
                yearlySchedule.push({
                    year: Math.ceil(i / 12),
                    principal: yearlyPrincipal,
                    interest: yearlyInterest,
                    endingBalance: balance > 0 ? balance : 0,
                });
                yearlyPrincipal = 0;
                yearlyInterest = 0;
            }
        }
        return { monthlyPayment: payment, schedule: yearlySchedule };

    }, [loanAmount, interestRate, loanTerm]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Mortgage Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <input type="number" value={loanAmount} onChange={e => setLoanAmount(parseFloat(e.target.value) || 0)} placeholder="Loan Amount ($)" className="bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value) || 0)} placeholder="Interest Rate (%)" className="bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={loanTerm} onChange={e => setLoanTerm(parseInt(e.target.value) || 0)} placeholder="Loan Term (Years)" className="bg-gray-800 p-3 rounded-md"/>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg text-center mb-8">
                 <p className="text-sm text-gray-400 uppercase">Monthly Payment</p>
                 <p className="text-4xl font-bold text-cyan-400 mt-2">${monthlyPayment > 0 ? monthlyPayment.toFixed(2) : '0.00'}</p>
            </div>

            <h3 className="text-xl font-bold text-center mb-4">Amortization Schedule</h3>
            <div className="max-h-96 overflow-y-auto bg-gray-800/50 rounded-lg">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-gray-800"><tr><th className="p-3">Year</th><th className="p-3">Principal</th><th className="p-3">Interest</th><th className="p-3">Ending Balance</th></tr></thead>
                    <tbody>
                        {schedule.map(row => (
                            <tr key={row.year} className="border-b border-gray-700">
                                <td className="p-3">{row.year}</td>
                                <td className="p-3 text-green-400">${row.principal.toFixed(2)}</td>
                                <td className="p-3 text-red-400">${row.interest.toFixed(2)}</td>
                                <td className="p-3">${row.endingBalance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MortgageAmortizationCalculator;
