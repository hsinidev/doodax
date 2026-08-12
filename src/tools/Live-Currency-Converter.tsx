
import React, { useState, useEffect, useCallback } from 'react';

const CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];
// Simulated rates relative to USD
const MOCK_RATES: { [key: string]: number } = {
    'USD': 1, 'EUR': 0.92, 'JPY': 157.5, 'GBP': 0.79, 'AUD': 1.5,
    'CAD': 1.37, 'CHF': 0.9, 'CNY': 7.25, 'INR': 83.5,
};

const LiveCurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number>(100);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState<number | null>(null);

    const convertCurrency = useCallback(() => {
        const fromRate = MOCK_RATES[fromCurrency];
        const toRate = MOCK_RATES[toCurrency];
        const amountInUsd = amount / fromRate;
        const convertedAmount = amountInUsd * toRate;
        setResult(convertedAmount);
    }, [amount, fromCurrency, toCurrency]);

    useEffect(() => {
        convertCurrency();
    }, [convertCurrency]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Live Currency Converter</h2>
            <p className="text-center text-gray-400 mb-8">Using simulated exchange rates.</p>

            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 items-end">
                    <div className="col-span-2">
                        <label>Amount</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 text-2xl p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                    </div>
                    <div>
                         <label>From</label>
                         <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0">
                            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <p className="text-3xl text-cyan-400 font-bold">=</p>
                </div>

                <div className="grid grid-cols-3 gap-2 items-end">
                     <div className="col-span-2">
                         <label>Converted Amount</label>
                        <input type="text" readOnly value={result?.toFixed(2) || '...'} className="w-full bg-gray-800/50 text-2xl p-3 rounded-md border-2 border-gray-700" />
                    </div>
                    <div>
                         <label>To</label>
                        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0">
                            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveCurrencyConverter;
