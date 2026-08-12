import React, { useState, useCallback } from 'react';

type LocationStatus = 'idle' | 'loading' | 'success' | 'error';

const SimpleNotaryFinder: React.FC = () => {
    const [status, setStatus] = useState<LocationStatus>('idle');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const findLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setStatus('success');
            },
            (err) => {
                setError(`Failed to get location: ${err.message}`);
                setStatus('error');
            }
        );
    }, []);

    const mapUrl = coords
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng-0.01}%2C${coords.lat-0.01}%2C${coords.lng+0.01}%2C${coords.lat+0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`
        : '';

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Simple Notary Finder</h2>
            <p className="text-center text-gray-400 mb-8">Find placeholder notary locations near you.</p>

            <div className="text-center mb-6">
                <button onClick={findLocation} disabled={status === 'loading'} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg disabled:bg-gray-600">
                    {status === 'loading' ? 'Finding You...' : 'Find Notaries Near Me'}
                </button>
            </div>
            
            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}
            
            {status === 'success' && coords && (
                <div className="animate-fade-in">
                    <iframe
                        width="100%"
                        height="450"
                        className="rounded-lg border-2 border-gray-700"
                        src={mapUrl}
                    ></iframe>
                     <p className="text-sm text-center text-gray-400 mt-2">Map shows your location. Real notaries would be displayed via a directory API.</p>
                </div>
            )}
        </div>
    );
};

export default SimpleNotaryFinder;
