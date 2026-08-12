import React, { useState, useCallback } from 'react';

// --- TypeScript Interface for API Response ---
interface DomainStatusResponse {
    isAvailable: boolean;
    status: string;
}

// --- API Simulation Function ---
// Simulates a WHOIS/Domain API call with a delay.
const checkDomainAvailability = (domain: string): Promise<DomainStatusResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const knownTakenDomains = ['google.com', 'facebook.com', 'amazon.com', 'doodax.com'];
            if (knownTakenDomains.includes(domain.toLowerCase())) {
                resolve({ isAvailable: false, status: 'Unavailable (Registered)' });
            } else {
                resolve({ isAvailable: true, status: 'Available for Registration' });
            }
        }, 1000); // 1-second delay to simulate network latency
    });
};

// --- Helper Icon Components ---
const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CrossIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
);

// --- Main Component ---
const DomainAvailabilityChecker: React.FC = () => {
    type CheckStatus = 'idle' | 'loading' | 'available' | 'taken' | 'error';
    
    const [domain, setDomain] = useState<string>('');
    const [status, setStatus] = useState<CheckStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resultMessage, setResultMessage] = useState<string>('');

    const handleCheck = useCallback(async () => {
        // Simple validation: must contain a dot and have a TLD of at least 2 chars.
        const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            setStatus('error');
            setErrorMessage('Please enter a valid domain name (e.g., example.com).');
            return;
        }

        setStatus('loading');
        setErrorMessage(null);
        
        try {
            const result = await checkDomainAvailability(domain);
            setResultMessage(result.status);
            if (result.isAvailable) {
                setStatus('available');
            } else {
                setStatus('taken');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    }, [domain]);

    const renderResult = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center h-48">
                        <LoadingSpinner />
                        <p className="mt-4 text-gray-300">Checking domain...</p>
                    </div>
                );
            case 'available':
                return (
                    <div className="flex flex-col items-center justify-center h-48 text-green-400 bg-green-500/10 rounded-lg">
                        <CheckIcon />
                        <p className="text-2xl font-bold mt-2">"{domain}" is Available!</p>
                        <p className="text-gray-300">{resultMessage}</p>
                    </div>
                );
            case 'taken':
                return (
                    <div className="flex flex-col items-center justify-center h-48 text-red-400 bg-red-500/10 rounded-lg">
                        <CrossIcon />
                        <p className="text-2xl font-bold mt-2">"{domain}" is Taken</p>
                        <p className="text-gray-300">{resultMessage}</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="flex flex-col items-center justify-center h-48 text-yellow-400 bg-yellow-500/10 rounded-lg">
                        <p className="text-lg font-semibold">{errorMessage}</p>
                    </div>
                );
            case 'idle':
            default:
                return <div className="h-48"></div>;
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Domain Availability Checker</h2>
            <p className="text-center text-gray-400 mb-8">Enter a domain name to see if it's available for registration.</p>

            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="your-awesome-idea.com"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                    disabled={status === 'loading'}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                />
                <button
                    onClick={handleCheck}
                    disabled={status === 'loading'}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Checking...' : 'Check'}
                </button>
            </div>
            
            <div className="mt-8 transition-opacity duration-500">
                {renderResult()}
            </div>
        </div>
    );
};

export default DomainAvailabilityChecker;
