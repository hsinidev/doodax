import React, { useState } from 'react';

const JsMinifier: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minifyJs = () => {
        let minified = input
            // Remove single-line comments
            .replace(/\/\/.*$/gm, '')
            // Remove multi-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Remove extra whitespace
            .replace(/\s+/g, ' ')
            // Remove spaces around operators
            .replace(/\s*([{}();,:])\s*/g, '$1')
            .trim();

        setOutput(minified);
    };

    const beautifyJs = () => {
        let beautified = input;
        let indent = 0;
        const indentSize = 2;

        beautified = beautified
            .replace(/([{};])/g, '$1\n')
            .replace(/\n\s*\n/g, '\n');

        const lines = beautified.split('\n');
        beautified = lines.map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('}')) {
                indent = Math.max(0, indent - indentSize);
            }
            const indented = ' '.repeat(indent) + trimmed;
            if (trimmed.endsWith('{')) {
                indent += indentSize;
            }
            return indented;
        }).join('\n');

        setOutput(beautified);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    JavaScript Minifier/Beautifier
                </h1>
                <p className="text-gray-400 mb-8">Compress or format your JavaScript code</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Input JavaScript</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Paste your JavaScript code here..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Output</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none"
                            placeholder="Processed JavaScript will appear here..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={minifyJs}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all"
                    >
                        Minify
                    </button>
                    <button
                        onClick={beautifyJs}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all"
                    >
                        Beautify
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
            </div>
        </div>
    );
};

export default JsMinifier;
