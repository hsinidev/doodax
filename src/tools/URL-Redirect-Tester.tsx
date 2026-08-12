
import React, { useState, useCallback } from 'react';

// --- TypeScript Interfaces ---
interface RedirectStep {
    url: string;
    status: number;
    redirectedTo: string | null;
}

interface ApiResponse {
    redirectChain: RedirectStep[];
    finalUrl: string;
    error?: string;
}

type TestStatus = 'idle' | 'loading' | 'success' | 'error';

// --- UI Components ---
const StatusBadge: React.FC<{ code: number }> = ({ code }) => {
    let colorClass = 'bg-gray-500/20 text-gray-300';
    if (code >= 200 && code < 300) colorClass = 'bg-green-500/20 text-green-400';
    if (code >= 300 && code < 400) colorClass = 'bg-yellow-500/20 text-yellow-400';
    if (code >= 400) colorClass = 'bg-red-500/20 text-red-400';

    return <span className={`px-3 py-1 text-sm font-bold rounded-full ${colorClass}`}>{code}</span>;
};

// --- Main Component ---
const URLRedirectTester: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [status, setStatus] = useState<TestStatus>('idle');
    const [result, setResult] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTest = useCallback(async () => {
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
            const response = await fetch('/api/check-redirect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data: ApiResponse = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || 'An unknown error occurred on the server.');
            }

            setResult(data);
            setStatus('success');
        } catch (err: any) {
            setError(err.message);
            setStatus('error');
        }
    }, [url]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">URL Redirect Tester</h2>
            <p className="text-center text-gray-400 mb-8">Enter a URL to trace its full redirect path.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-website.com"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                    disabled={status === 'loading'}
                />
                <button
                    onClick={handleTest}
                    disabled={status === 'loading'}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Testing...' : 'Test Redirects'}
                </button>
            </div>
            
            {status === 'loading' && <div className="text-center py-10">Tracing redirects...</div>}
            {status === 'error' && <p className="text-center text-red-400 mt-4 bg-red-500/10 p-3 rounded-md">{error}</p>}

            {status === 'success' && result && (
                <div className="mt-10 animate-fade-in">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-2 text-center">Final Destination</h3>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                            <a href={result.finalUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-mono text-lg break-all hover:underline">
                                {result.finalUrl}
                            </a>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">Redirect Chain</h3>
                        <div className="space-y-4">
                            {result.redirectChain.map((step, index) => (
                                <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400 font-bold">Step {index + 1}</span>
                                        <StatusBadge code={step.status} />
                                    </div>
                                    <p className="text-sm text-gray-400 break-all">{step.url}</p>
                                    {step.redirectedTo && (
                                        <div className="flex items-center mt-2">
                                            <span className="text-xl text-cyan-400 mr-2">↳</span>
                                            <p className="text-sm text-gray-300 break-all">{step.redirectedTo}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default URLRedirectTester;
