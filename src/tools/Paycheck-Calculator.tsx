
import React, { useState, useMemo } from 'react';

const PaycheckCalculator: React.FC = () => {
    const [grossPay, setGrossPay] = useState<number>(5000);
    const [payFrequency, setPayFrequency] = useState('monthly');
    const [taxRate, setTaxRate] = useState<number>(15);
    const [deductions, setDeductions] = useState<number>(200);

    const netPay = useMemo(() => {
        const taxes = grossPay * (taxRate / 100);
        return grossPay - taxes - deductions;
    }, [grossPay, taxRate, deductions]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Paycheck Calculator</h2>
            <div className="space-y-4">
                <input type="number" value={grossPay} onChange={e => setGrossPay(parseFloat(e.target.value) || 0)} placeholder="Gross Pay per Period ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <select value={payFrequency} onChange={e => setPayFrequency(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md">
                    <option value="monthly">Monthly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="weekly">Weekly</option>
                </select>
                <input type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} placeholder="Effective Tax Rate (%)" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input type="number" value={deductions} onChange={e => setDeductions(parseFloat(e.target.value) || 0)} placeholder="Deductions per Period ($)" className="w-full bg-gray-800 p-3 rounded-md"/>
            </div>
            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-400 uppercase">Estimated Net (Take-Home) Pay</p>
                <p className="text-4xl font-bold text-cyan-400 mt-2">${netPay > 0 ? netPay.toFixed(2) : '0.00'}</p>
            </div>
        </div>
    );
};

export default PaycheckCalculator;
