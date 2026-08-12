import React, { useState } from 'react';

const MetaTagGenerator: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleProcess = () => {
        // Tool-specific logic will be added here
        setOutput('Processing: ' + input);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                    Meta Tag Generator
                </h1>
                <p className="text-gray-400 mb-8">Create SEO meta tags for your website</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Input</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your input..."
                        />
                    </div>

                    <button
                        onClick={handleProcess}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition-all"
                    >
                        Process
                    </button>

                    <div>
                        <label className="block text-sm font-medium mb-2">Output</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none"
                            placeholder="Result will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetaTagGenerator;