import React, { useState, useMemo } from 'react';

type UnitSystem = 'metric' | 'imperial';

const BMICalculator: React.FC = () => {
    const [unit, setUnit] = useState<UnitSystem>('metric');
    const [height, setHeight] = useState<number>(180); // cm or inches
    const [weight, setWeight] = useState<number>(75); // kg or lbs

    const { bmi, category } = useMemo(() => {
        let heightMeters: number;
        let weightKg: number;

        if (unit === 'metric') {
            heightMeters = height / 100;
            weightKg = weight;
        } else { // Imperial
            heightMeters = height * 0.0254;
            weightKg = weight * 0.453592;
        }
        
        if (heightMeters <= 0 || weightKg <= 0) {
            return { bmi: 0, category: 'N/A' };
        }

        const bmiValue = weightKg / (heightMeters * heightMeters);
        
        let cat: string;
        if (bmiValue < 18.5) cat = 'Underweight';
        else if (bmiValue < 25) cat = 'Normal weight';
        else if (bmiValue < 30) cat = 'Overweight';
        else cat = 'Obesity';

        return { bmi: parseFloat(bmiValue.toFixed(1)), category: cat };
    }, [unit, height, weight]);

    const getCategoryColor = () => {
        switch(category) {
            case 'Underweight': return 'text-blue-400';
            case 'Normal weight': return 'text-green-400';
            case 'Overweight': return 'text-yellow-400';
            case 'Obesity': return 'text-red-400';
            default: return 'text-white';
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">BMI Calculator</h2>
            
            <div className="flex bg-gray-800 p-1 rounded-lg mb-6">
                <button onClick={() => setUnit('metric')} className={`w-1/2 p-2 rounded-md transition ${unit === 'metric' ? 'bg-cyan-600' : ''}`}>Metric (kg, cm)</button>
                <button onClick={() => setUnit('imperial')} className={`w-1/2 p-2 rounded-md transition ${unit === 'imperial' ? 'bg-cyan-600' : ''}`}>Imperial (lbs, in)</button>
            </div>

            <div className="space-y-4">
                <div>
                    <label>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                    <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md"/>
                </div>
                <div>
                    <label>Height ({unit === 'metric' ? 'cm' : 'in'})</label>
                    <input type="number" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} className="w-full bg-gray-800 p-3 rounded-md"/>
                </div>
            </div>

             <div className="mt-8 bg-gray-800/50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-400 uppercase">Your BMI</p>
                <p className={`text-6xl font-bold my-2 ${getCategoryColor()}`}>{bmi > 0 ? bmi : '-'}</p>
                <p className={`text-xl font-semibold ${getCategoryColor()}`}>{category}</p>
            </div>
        </div>
    );
};

export default BMICalculator;
