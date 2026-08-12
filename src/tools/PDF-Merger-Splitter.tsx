
import React, { useState } from 'react';

type Mode = 'merge' | 'split';

const PDFMergerSplitter: React.FC = () => {
    const [mode, setMode] = useState<Mode>('merge');
    
    // Placeholder state
    const [files, setFiles] = useState(['document-a.pdf', 'document-b.pdf']);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleAction = () => {
        setIsLoading(true);
        setMessage('');
        setTimeout(() => {
            setIsLoading(false);
            setMessage(`Action completed successfully! (Simulated)`);
        }, 2000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">PDF Merger / Splitter</h2>
            
            <div className="flex bg-gray-800 p-1 rounded-lg mb-6">
                <button onClick={() => setMode('merge')} className={`w-1/2 p-2 rounded-md transition ${mode === 'merge' ? 'bg-cyan-600' : ''}`}>Merge PDFs</button>
                <button onClick={() => setMode('split')} className={`w-1/2 p-2 rounded-md transition ${mode === 'split' ? 'bg-cyan-600' : ''}`}>Split PDF</button>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-center border-2 border-dashed border-gray-600 p-10 rounded-lg mb-4">
                    <p>Drag & Drop Files Here or</p>
                    <button className="mt-2 bg-gray-700 p-2 rounded-md">Select Files</button>
                    <p className="text-xs text-gray-500 mt-2">(File selection is disabled in this placeholder UI)</p>
                </div>

                {mode === 'merge' && (
                    <div>
                        <h3 className="font-semibold mb-2">Files to Merge:</h3>
                        <ul className="space-y-2">
                            {files.map(file => <li key={file} className="bg-gray-700 p-2 rounded-md flex justify-between items-center"><span>{file}</span><span>☰</span></li>)}
                        </ul>
                    </div>
                )}
                {mode === 'split' && (
                    <div>
                        <h3 className="font-semibold mb-2">Split Options:</h3>
                        <select className="w-full bg-gray-700 p-2 rounded-md">
                            <option>Extract all pages into separate PDFs</option>
                            <option>Select page range (e.g., 2-5)</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="text-center mt-6">
                <button onClick={handleAction} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg disabled:bg-gray-600">
                    {isLoading ? 'Processing...' : (mode === 'merge' ? 'Merge PDFs' : 'Split PDF')}
                </button>
                {message && <p className="text-green-400 mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default PDFMergerSplitter;
