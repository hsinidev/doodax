import React, { useState, useCallback } from 'react';

// --- TypeScript Interfaces ---
interface StatusResponse {
    statusCode: number;
    statusText: string;
}

interface ApiResponse extends Partial<StatusResponse> {
    error?: string;
}

type CheckStatus = 'idle' | 'loading' | 'success' | 'error';

// --- Main Component ---
const LinkBrokenChecker: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [status, setStatus] = useState<CheckStatus>('idle');
    const [result, setResult] = useState<StatusResponse | null>(null);
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
            const response = await fetch('/api/check-link-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data: ApiResponse = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || 'An unknown server error occurred.');
            }
            
            if(data.statusCode && data.statusText) {
                setResult({ statusCode: data.statusCode, statusText: data.statusText });
                setStatus('success');
            } else {
                 throw new Error('Invalid response from server.');
            }

        } catch (err: any) {
            setError(err.message);
            setStatus('error');
        }
    }, [url]);
    
    const renderResult = () => {
        if (status === 'idle') return <div className="h-40"></div>;
        if (status === 'loading') return <div className="text-center py-10 h-40">Checking link status...</div>;
        if (status === 'error') return (
            <div className="bg-red-500/10 text-red-400 p-6 rounded-lg text-center h-40 flex flex-col justify-center">
                 <p className="text-lg font-semibold">Error</p>
                 <p className="font-mono break-all">{error}</p>
            </div>
        );
        
        if (status === 'success' && result) {
            let colorClasses = '';
            let emoji = '';
            const code = result.statusCode;

            if (code >= 200 && code < 300) {
                colorClasses = 'bg-green-500/10 text-green-400';
                emoji = '✅';
            } else if (code >= 300 && code < 400) {
                colorClasses = 'bg-blue-500/10 text-blue-400';
            } else if (code >= 400 && code < 500) {
                colorClasses = 'bg-red-500/10 text-red-400';
                emoji = '❌';
            } else if (code >= 500) {
                colorClasses = 'bg-orange-500/10 text-orange-400';
                emoji = '⚠️';
            }

            return (
                <div className={`p-6 rounded-lg text-center h-40 flex flex-col justify-center animate-fade-in ${colorClasses}`}>
                    <p className="text-6xl font-bold">{result.statusCode} {emoji}</p>
                    <p className="text-xl font-semibold mt-2">{result.statusText}</p>
                </div>
            )
        }
        return null;
    };


    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Link Broken Checker</h2>
            <p className="text-center text-gray-400 mb-8">Enter a URL to check its HTTP status code.</p>

            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/some-page"
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

export default LinkBrokenChecker;
