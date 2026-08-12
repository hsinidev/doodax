
import React, { useState, useMemo } from 'react';

type CalculationMode = 'add' | 'remove';

const VATSalesTaxCalculator: React.FC = () => {
    const [basePrice, setBasePrice] = useState<number>(100);
    const [taxRate, setTaxRate] = useState<number>(20);
    const [mode, setMode] = useState<CalculationMode>('add');

    const { finalPrice, taxAmount } = useMemo(() => {
        const rate = taxRate / 100;
        if (mode === 'add') {
            const tax = basePrice * rate;
            return { finalPrice: basePrice + tax, taxAmount: tax };
        } else { // remove tax
            const originalPrice = basePrice / (1 + rate);
            const tax = basePrice - originalPrice;
            return { finalPrice: originalPrice, taxAmount: tax };
        }
    }, [basePrice, taxRate, mode]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">VAT / Sales Tax Calculator</h2>
            <p className="text-center text-gray-400 mb-8">Calculate tax-inclusive or exclusive prices.</p>

            <div className="flex bg-gray-800 p-1 rounded-lg mb-6">
                <button onClick={() => setMode('add')} className={`w-1/2 p-2 rounded-md transition ${mode === 'add' ? 'bg-cyan-600' : ''}`}>Add Tax</button>
                <button onClick={() => setMode('remove')} className={`w-1/2 p-2 rounded-md transition ${mode === 'remove' ? 'bg-cyan-600' : ''}`}>Remove Tax</button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{mode === 'add' ? 'Pre-Tax Price' : 'Total Price (Tax Included)'}</label>
                    <input type="number" value={basePrice} onChange={e => setBasePrice(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tax Rate (%)</label>
                    <input type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 text-xl"/>
                </div>
            </div>
            
            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                         <p className="text-sm text-gray-400 uppercase">{mode === 'add' ? 'Total Price' : 'Base Price'}</p>
                         <p className="text-3xl font-bold text-cyan-400">{finalPrice.toFixed(2)}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400 uppercase">Tax Amount</p>
                        <p className="text-3xl font-bold text-cyan-400">{taxAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VATSalesTaxCalculator;
