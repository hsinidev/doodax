import React, { useState, useCallback } from 'react';

const PERMIT_TYPES = ['Food Service', 'Retail', 'Construction', 'Home Office'];

const LocalPermitFinder: React.FC = () => {
    const [city, setCity] = useState('Anytown');
    const [businessType, setBusinessType] = useState('Food Service');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = useCallback(() => {
        setIsLoading(true);
        setResults([]);
        setTimeout(() => {
            setResults([
                `Health Department Permit for ${businessType}`,
                `Business License for City of ${city}`,
                `Signage Permit (Simulated Result)`,
            ]);
            setIsLoading(false);
        }, 1000);
    }, [city, businessType]);

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Local Permit Finder</h2>
            <p className="text-center text-gray-400 mb-8">(Placeholder UI for a simulated search)</p>
            
            <div className="space-y-4">
                <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter City" className="w-full bg-gray-800 p-3 rounded-md"/>
                <select value={businessType} onChange={e => setBusinessType(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md">
                    {PERMIT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            
            <div className="text-center mt-6">
                <button onClick={handleSearch} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg disabled:bg-gray-600">
                    {isLoading ? 'Searching...' : 'Find Permits'}
                </button>
            </div>

            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Potential Permits Required:</h3>
                    <ul className="space-y-2">
                        {results.map((res, i) => (
                            <li key={i} className="bg-gray-800 p-3 rounded-md">{res}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LocalPermitFinder;
