import React, { useState, useMemo } from 'react';

const UNITS = {
    volume: [
        { name: 'Milliliters (ml)', value: 'ml', base: 1 },
        { name: 'Teaspoons (tsp)', value: 'tsp', base: 4.929 },
        { name: 'Tablespoons (tbsp)', value: 'tbsp', base: 14.787 },
        { name: 'Fluid Ounces (fl oz)', value: 'floz', base: 29.574 },
        { name: 'Cups (US)', value: 'cup', base: 236.588 },
        { name: 'Liters (l)', value: 'l', base: 1000 },
    ],
    weight: [
        { name: 'Grams (g)', value: 'g', base: 1 },
        { name: 'Ounces (oz)', value: 'oz', base: 28.35 },
        { name: 'Pounds (lb)', value: 'lb', base: 453.592 },
        { name: 'Kilograms (kg)', value: 'kg', base: 1000 },
    ]
};
type UnitType = 'volume' | 'weight';

const RecipeUnitConverter: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState('cup');
    const [toUnit, setToUnit] = useState('ml');
    const [unitType, setUnitType] = useState<UnitType>('volume');

    const handleUnitTypeChange = (type: UnitType) => {
        setUnitType(type);
        if (type === 'volume') {
            setFromUnit('cup');
            setToUnit('ml');
        } else {
            setFromUnit('lb');
            setToUnit('g');
        }
    };

    const convertedValue = useMemo(() => {
        const from = UNITS[unitType].find(u => u.value === fromUnit);
        const to = UNITS[unitType].find(u => u.value === toUnit);

        if (!from || !to) return 0;
        
        const amountInBase = amount * from.base;
        return amountInBase / to.base;

    }, [amount, fromUnit, toUnit, unitType]);

    const unitList = UNITS[unitType];

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Recipe Unit Converter</h2>
            
            <div className="flex bg-gray-800 p-1 rounded-lg mb-6">
                <button onClick={() => handleUnitTypeChange('volume')} className={`w-1/2 p-2 rounded-md transition ${unitType === 'volume' ? 'bg-cyan-600' : ''}`}>Volume</button>
                <button onClick={() => handleUnitTypeChange('weight')} className={`w-1/2 p-2 rounded-md transition ${unitType === 'weight' ? 'bg-cyan-600' : ''}`}>Weight</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md"/>
                </div>
                 <div>
                    <label>From</label>
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md">
                        {unitList.map(u => <option key={u.value} value={u.value}>{u.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label>To</label>
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md">
                         {unitList.map(u => <option key={u.value} value={u.value}>{u.name}</option>)}
                    </select>
                </div>
            </div>
            
             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-cyan-400">{convertedValue.toFixed(3)}</p>
                <p className="text-gray-300">{UNITS[unitType].find(u => u.value === toUnit)?.name}</p>
            </div>
        </div>
    );
};

export default RecipeUnitConverter;