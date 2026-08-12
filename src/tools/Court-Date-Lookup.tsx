import React, { useState, useCallback } from 'react';

const CourtDateLookup: React.FC = () => {
    const [searchType, setSearchType] = useState('name');
    const [searchTerm, setSearchTerm] = useState('John Doe');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSearch = useCallback(() => {
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult({
                caseNumber: 'CV-2024-12345',
                parties: 'John Doe vs. Acme Corp.',
                date: '2024-12-15',
                time: '09:00 AM',
                courtroom: '12A',
                status: 'Scheduled (Simulated)'
            });
            setIsLoading(false);
        }, 1000);
    }, [searchTerm]);

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Court Date Lookup</h2>
            <p className="text-center text-gray-400 mb-8">(Placeholder UI with simulated data)</p>

            <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
                <button onClick={() => setSearchType('name')} className={`w-1/2 p-2 rounded-md transition ${searchType === 'name' ? 'bg-cyan-600' : ''}`}>By Name</button>
                <button onClick={() => setSearchType('case')} className={`w-1/2 p-2 rounded-md transition ${searchType === 'case' ? 'bg-cyan-600' : ''}`}>By Case Number</button>
            </div>
            
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={searchType === 'name' ? 'Enter Full Name' : 'Enter Case Number'}
                className="w-full bg-gray-800 p-3 rounded-md"
            />
            
            <div className="text-center mt-6">
                <button onClick={handleSearch} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg disabled:bg-gray-600">
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
            
             {result && (
                <div className="mt-6 bg-gray-800/50 p-4 rounded-lg animate-fade-in">
                    <h3 className="text-lg font-semibold mb-2">Case Information:</h3>
                    <p><strong>Case #:</strong> {result.caseNumber}</p>
                    <p><strong>Parties:</strong> {result.parties}</p>
                    <p><strong>Date:</strong> {result.date}</p>
                    <p><strong>Time:</strong> {result.time}</p>
                    <p><strong>Courtroom:</strong> {result.courtroom}</p>
                    <p><strong>Status:</strong> <span className="text-green-400">{result.status}</span></p>
                </div>
            )}
        </div>
    );
};

export default CourtDateLookup;
