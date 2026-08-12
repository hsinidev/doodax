import React, { useState } from 'react';

const UrlEncoderDecoder: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const encodeUrl = () => {
        try {
            setOutput(encodeURIComponent(input));
        } catch (error) {
            setOutput('Error encoding URL');
        }
    };

    const decodeUrl = () => {
        try {
            setOutput(decodeURIComponent(input));
        } catch (error) {
            setOutput('Error decoding URL');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    URL Encoder/Decoder
                </h1>
                <p className="text-gray-400 mb-8">Encode or decode URL strings</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Input</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter URL or text to encode/decode..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={encodeUrl}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                        >
                            Encode
                        </button>
                        <button
                            onClick={decodeUrl}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                        >
                            Decode
                        </button>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Copy Output
                        </button>
                        <button
                            onClick={() => { setInput(''); setOutput(''); }}
                            className="px-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-all"
                        >
                            Clear
                        </button>
                    </div>

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

                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="font-semibold mb-2">Examples:</h3>
                    <div className="text-sm text-gray-400 space-y-1">
                        <p><strong>Encode:</strong> "hello world" → "hello%20world"</p>
                        <p><strong>Decode:</strong> "hello%20world" → "hello world"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlEncoderDecoder;
