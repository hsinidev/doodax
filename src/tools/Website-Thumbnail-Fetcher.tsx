import React, { useState, useCallback } from 'react';
import { ApiKeyInput, useApiKey } from '../components/ApiKeyInput.tsx';

// --- TypeScript Interfaces ---
interface ThumbnailReport {
    imageUrl: string;
}

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

// --- API Simulation ---
const fetchThumbnail = (url: string, apiKey: string): Promise<ThumbnailReport> => {
    console.log(`Fetching thumbnail for ${url} with API key: ${apiKey ? 'provided' : 'missing'}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!apiKey) {
                return reject(new Error('API Key is required to generate a thumbnail.'));
            }
            if (url.includes('error.com')) {
                return reject(new Error('Failed to render the specified URL (Simulated).'));
            }
            // Use a placeholder image service to simulate a real screenshot URL
            const encodedUrl = encodeURIComponent(url);
            resolve({ imageUrl: `https://picsum.photos/seed/${encodedUrl}/1200/900` });
        }, 1800); // Simulate network and rendering latency
    });
};

// --- Main Component ---
const WebsiteThumbnailFetcher: React.FC = () => {
    const [url, setUrl] = useState<string>('https://www.google.com');
    const [status, setStatus] = useState<FetchStatus>('idle');
    const [result, setResult] = useState<ThumbnailReport | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { apiKey, setApiKey } = useApiKey('USER_SCREENSHOT_API_KEY');

    const handleGenerate = useCallback(async () => {
        if (!apiKey) {
            setError('Please enter your Screenshot API Key below.');
            setStatus('error');
            return;
        }
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
            const data = await fetchThumbnail(url, apiKey);
            setResult(data);
            setStatus('success');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setStatus('error');
        }
    }, [url, apiKey]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Website Thumbnail Fetcher</h2>
            <p className="text-center text-gray-400 mb-8">Enter a URL to generate a website screenshot using a render API.</p>

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
                    onClick={handleGenerate}
                    disabled={status === 'loading' || !apiKey}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Generating...' : 'Generate Thumbnail'}
                </button>
            </div>
            
            <div className="mt-8">
                {status === 'loading' && (
                    <div className="w-full aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400">
                        Generating thumbnail...
                    </div>
                )}
                {status === 'error' && (
                     <div className="w-full aspect-video bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 text-center p-4">
                        <p>{error}</p>
                    </div>
                )}
                 {status === 'success' && result && (
                    <div className="w-full aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center overflow-hidden animate-fade-in">
                        <img src={result.imageUrl} alt={`Thumbnail of ${url}`} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            
            <div className="mt-8 border-t border-gray-700 pt-6">
                <ApiKeyInput
                    storageKey='USER_SCREENSHOT_API_KEY'
                    title="Screenshot API Key"
                    description="Enter your placeholder API key for the screenshot service. This is stored securely in your browser's local storage."
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                />
            </div>
        </div>
    );
};

export default WebsiteThumbnailFetcher;