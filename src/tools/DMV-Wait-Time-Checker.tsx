import React, { useState, useCallback } from 'react';

const LOCATIONS = ['Central City DMV', 'North Valley DMV', 'Eastside Service Center'];
const SERVICES = ['Driver\'s License/ID', 'Vehicle Registration', 'Real ID'];

const DmvWaitTimeChecker: React.FC = () => {
    const [location, setLocation] = useState(LOCATIONS[0]);
    const [service, setService] = useState(SERVICES[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [waitTime, setWaitTime] = useState<number | null>(null);

    const handleCheck = useCallback(() => {
        setIsLoading(true);
        setWaitTime(null);
        setTimeout(() => {
            // Simulate wait time based on location and service
            const baseTime = (location.length + service.length) * 2;
            const randomTime = Math.floor(Math.random() * 30);
            setWaitTime(baseTime + randomTime);
            setIsLoading(false);
        }, 1200);
    }, [location, service]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">DMV Wait Time Checker</h2>
            <p className="text-center text-gray-400 mb-8">(Placeholder UI with simulated data)</p>

            <div className="space-y-4">
                <select value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md">
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <select value={service} onChange={e => setService(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md">
                    {SERVICES.map(srv => <option key={srv} value={srv}>{srv}</option>)}
                </select>
            </div>
            
             <div className="text-center mt-6">
                <button onClick={handleCheck} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg disabled:bg-gray-600">
                    {isLoading ? 'Checking...' : 'Check Wait Time'}
                </button>
            </div>

            <div className="mt-6">
                {isLoading && <p className="text-center">Fetching current wait times...</p>}
                {waitTime !== null && (
                    <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                        <p className="text-sm text-gray-400 uppercase">Estimated Wait Time</p>
                        <p className="text-5xl font-bold text-cyan-400 mt-2">{waitTime} minutes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DmvWaitTimeChecker;
