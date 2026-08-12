import React, { useState, useCallback } from 'react';

// --- TypeScript Interfaces ---
interface StatusReport {
    isDown: boolean;
    statusMessage: string;
}

type CheckStatus = 'idle' | 'loading' | 'success' | 'error';

// --- API Simulation ---
const checkWebsiteStatus = (url: string): Promise<StatusReport> => {
    console.log(`Checking status for ${url}...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate a few known "down" or problematic domains
            if (url.includes('down.com') || url.includes('error.net')) {
                resolve({ isDown: true, statusMessage: 'Host Not Found (Simulated)' });
            } else if (url.includes('timeout.org')) {
                 resolve({ isDown: true, statusMessage: 'Request Timed Out (Simulated)' });
            }
            else {
                resolve({ isDown: false, statusMessage: 'Online and Reachable' });
            }
        }, 1500); // Simulate network latency
    });
};

// --- Main Component ---
const WebsiteDownDetector: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [status, setStatus] = useState<CheckStatus>('idle');
    const [result, setResult] = useState<StatusReport | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = useCallback(async () => {
        try {
            new URL(url);
        } catch {
            setError('Please enter a valid, full URL (e.g., https://example.com).');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setError(null);
        setResult(null);

        try {
            const data = await checkWebsiteStatus(url);
            setResult(data);
            setStatus('success');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setResult({ isDown: true, statusMessage: err.message });
            setStatus('error');
        }
    }, [url]);

     const renderResult = () => {
        if (status === 'idle') return <div className="h-40"></div>;
        if (status === 'loading') return <div className="text-center py-10 h-40">Pinging servers...</div>;
        if (status === 'error' && error) return (
            <div className="bg-yellow-500/10 text-yellow-400 p-6 rounded-lg text-center h-40 flex flex-col justify-center">
                 <p className="text-lg font-semibold">Error</p>
                 <p className="font-mono break-all">{error}</p>
            </div>
        );
        
        if (status === 'success' && result) {
            if (result.isDown) {
                return (
                     <div className="bg-red-500/10 text-red-400 p-6 rounded-lg text-center h-40 flex flex-col justify-center animate-fade-in">
                        <p className="text-5xl font-bold">DOWN ❌</p>
                        <p className="text-lg font-semibold mt-2">{result.statusMessage}</p>
                    </div>
                );
            }
            return (
                 <div className="bg-green-500/10 text-green-400 p-6 rounded-lg text-center h-40 flex flex-col justify-center animate-fade-in">
                    <p className="text-5xl font-bold">UP ✅</p>
                    <p className="text-lg font-semibold mt-2">{result.statusMessage}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Website Down Detector</h2>
            <p className="text-center text-gray-400 mb-8">Enter a URL to check if it's reachable from our servers.</p>

            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                    disabled={status === 'loading'}
                />
                <button
                    onClick={handleCheck}
                    disabled={status === 'loading'}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Checking...' : 'Check Status'}
                </button>
            </div>
            
            <div className="mt-8">
                {renderResult()}
            </div>
        </div>
    );
};

export default WebsiteDownDetector;