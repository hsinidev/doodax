import React, { useState, useCallback, useEffect } from 'react';

// --- Main Component ---
const UUIDGenerator: React.FC = () => {
    const [currentUuid, setCurrentUuid] = useState<string>('');
    const [batchUuids, setBatchUuids] = useState<string[]>([]);
    const [copyStatus, setCopyStatus] = useState<{ id: string | null, message: string }>({ id: null, message: '' });

    // Generate a single UUID on initial component mount
    useEffect(() => {
        generateSingle();
    }, []);

    const generateSingle = useCallback(() => {
        setCurrentUuid(crypto.randomUUID());
    }, []);

    const generateBatch = useCallback(() => {
        const newUuids = Array.from({ length: 5 }, () => crypto.randomUUID());
        setBatchUuids(newUuids);
    }, []);

    const handleCopy = useCallback((text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus({ id, message: 'Copied!' });
            setTimeout(() => setCopyStatus({ id: null, message: '' }), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopyStatus({ id, message: 'Failed!' });
            setTimeout(() => setCopyStatus({ id: null, message: '' }), 2000);
        });
    }, []);

    const renderUuidRow = (uuid: string, id: string) => (
        <div key={id} className="flex items-center gap-4 bg-gray-800 p-3 rounded-md">
            <code className="text-cyan-400 font-mono text-sm sm:text-base flex-grow break-all">{uuid}</code>
            <div className="relative">
                <button
                    onClick={() => handleCopy(uuid, id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Copy
                </button>
                {copyStatus.id === id && (
                    <span className="absolute -top-7 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md animate-fade-in">
                        {copyStatus.message}
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">UUID/GUID Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate unique Version 4 UUIDs using the browser's native Crypto API.</p>

            {/* Single UUID Generator */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-center">Generate a Single UUID</h3>
                <div className="mb-4">
                    {renderUuidRow(currentUuid, 'single-uuid')}
                </div>
                <div className="text-center">
                    <button
                        onClick={generateSingle}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                    >
                        Generate New UUID
                    </button>
                </div>
            </div>

            {/* Batch UUID Generator */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Generate a Batch of UUIDs</h3>
                <div className="text-center mb-6">
                    <button
                        onClick={generateBatch}
                        className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                    >
                        Generate 5 UUIDs
                    </button>
                </div>
                {batchUuids.length > 0 && (
                    <div className="space-y-3">
                        {batchUuids.map((uuid, index) => renderUuidRow(uuid, `batch-uuid-${index}`))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UUIDGenerator;
