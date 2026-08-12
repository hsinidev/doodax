
import React, { useState, useCallback } from 'react';
import { ApiKeyInput, useApiKey } from '../components/ApiKeyInput.tsx';

interface Photo {
    id: number;
    photographer: string;
    src: {
        medium: string;
        large: string;
    };
}

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

const fetchStockPhotos = (query: string, apiKey: string): Promise<{ photos: Photo[] }> => {
    console.log(`Searching for "${query}" with API key...`);
    // This is a simulation. A real implementation would use the Pexels or Unsplash API.
    // We use a placeholder service to generate images based on the query.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!apiKey) {
                return reject(new Error('API Key is required.'));
            }
            const photos = Array.from({ length: 12 }, (_, i) => ({
                id: i,
                photographer: 'Placeholder Artist',
                src: {
                    medium: `https://picsum.photos/seed/${encodeURIComponent(query)}-${i}/400/300`,
                    large: `https://picsum.photos/seed/${encodeURIComponent(query)}-${i}/1920/1080`,
                },
            }));
            resolve({ photos });
        }, 1000);
    });
};

const StockPhotoFinder: React.FC = () => {
    const [query, setQuery] = useState('nature');
    const [status, setStatus] = useState<FetchStatus>('idle');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { apiKey, setApiKey } = useApiKey('USER_STOCKPHOTO_API_KEY');

    const handleSearch = useCallback(async () => {
        if (!apiKey) {
            setError('Please enter your Stock Photo API Key below.');
            setStatus('error');
            return;
        }
        if (!query.trim()) {
            setError('Please enter a search term.');
            setStatus('error');
            return;
        }
        
        setStatus('loading');
        setError(null);

        try {
            const result = await fetchStockPhotos(query, apiKey);
            setPhotos(result.photos);
            setStatus('success');
        } catch (err: any) {
            setError(err.message);
            setPhotos([]);
            setStatus('error');
        }
    }, [query, apiKey]);

    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Stock Photo Finder</h2>
            <p className="text-center text-gray-400 mb-8">Search for free-to-use stock photos (using a placeholder API).</p>

            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., mountains, technology, coffee"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                    disabled={status === 'loading'}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    disabled={status === 'loading' || !apiKey}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Searching...' : 'Search'}
                </button>
            </div>
            
            <div className="mt-8">
                {status === 'loading' && <p className="text-center">Loading images...</p>}
                {status === 'error' && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}
                {status === 'success' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
                        {photos.map(photo => (
                            <a key={photo.id} href={photo.src.large} target="_blank" rel="noopener noreferrer" className="group block aspect-w-4 aspect-h-3 bg-gray-800 rounded-lg overflow-hidden">
                                <img src={photo.src.medium} alt={`Photo by ${photo.photographer}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
                <ApiKeyInput
                    storageKey='USER_STOCKPHOTO_API_KEY'
                    title="Stock Photo API Key"
                    description="Enter your API key from Pexels, Unsplash, or another stock photo service. This is stored securely in your browser's local storage."
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                />
            </div>
        </div>
    );
};

export default StockPhotoFinder;
