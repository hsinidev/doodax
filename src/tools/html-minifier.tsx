import React, { useState } from 'react';

const HtmlMinifier: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minifyHtml = () => {
        let minified = input
            // Remove comments
            .replace(/<!--[\s\S]*?-->/g, '')
            // Remove whitespace between tags
            .replace(/>\s+</g, '><')
            // Remove leading/trailing whitespace
            .trim()
            // Remove extra spaces
            .replace(/\s{2,}/g, ' ');

        setOutput(minified);
    };

    const beautifyHtml = () => {
        let beautified = input;
        let indent = 0;
        const indentSize = 2;

        beautified = beautified.replace(/></g, '>\n<');
        const lines = beautified.split('\n');

        beautified = lines.map(line => {
            const trimmed = line.trim();
            if (trimmed.match(/^<\//) || trimmed.match(/^<\w+[^>]*\/>/)) {
                indent = Math.max(0, indent - indentSize);
            }
            const indented = ' '.repeat(indent) + trimmed;
            if (trimmed.match(/^<\w+[^>]*[^/]>/) && !trimmed.match(/^<(br|hr|img|input|meta|link)/)) {
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
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    HTML Minifier/Beautifier
                </h1>
                <p className="text-gray-400 mb-8">Compress or format your HTML code</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Input HTML</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Paste your HTML code here..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Output</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none"
                            placeholder="Processed HTML will appear here..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={minifyHtml}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                    >
                        Minify
                    </button>
                    <button
                        onClick={beautifyHtml}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
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

export default HtmlMinifier;
