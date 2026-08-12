import React, { useState, useCallback } from 'react';

type IndentType = '2' | '4' | 'tab';
type OutputStatus = 'idle' | 'success' | 'error';

// --- Main Component ---
const JSONFormatterValidator: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [outputJson, setOutputJson] = useState<string>('');
    const [status, setStatus] = useState<OutputStatus>('idle');
    const [indent, setIndent] = useState<IndentType>('2');

    const getIndentChar = useCallback(() => {
        if (indent === 'tab') return '\t';
        return parseInt(indent, 10);
    }, [indent]);

    const handleFormat = useCallback(() => {
        if (!inputJson.trim()) {
            setStatus('error');
            setOutputJson('Error: Input is empty.');
            return;
        }
        try {
            const parsed = JSON.parse(inputJson);
            const formatted = JSON.stringify(parsed, null, getIndentChar());
            setOutputJson(formatted);
            setStatus('success');
        } catch (e: any) {
            setOutputJson(`Invalid JSON: ${e.message}`);
            setStatus('error');
        }
    }, [inputJson, getIndentChar]);

    const handleMinify = useCallback(() => {
        if (!inputJson.trim()) {
            setStatus('error');
            setOutputJson('Error: Input is empty.');
            return;
        }
        try {
            const parsed = JSON.parse(inputJson);
            const minified = JSON.stringify(parsed);
            setOutputJson(minified);
            setStatus('success');
        } catch (e: any) {
            setOutputJson(`Invalid JSON: ${e.message}`);
            setStatus('error');
        }
    }, [inputJson]);

    const getOutputClass = () => {
        switch (status) {
            case 'success':
                return 'border-green-500/50';
            case 'error':
                return 'border-red-500/50 text-red-400';
            default:
                return 'border-gray-700';
        }
    };
    
    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">JSON Formatter & Validator</h2>
            <p className="text-center text-gray-400 mb-8">Paste your JSON below to format, validate, or minify it.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Area */}
                <div>
                    <label htmlFor="json-input" className="block text-sm font-medium text-gray-300 mb-2">Input JSON</label>
                    <textarea
                        id="json-input"
                        value={inputJson}
                        onChange={(e) => setInputJson(e.target.value)}
                        placeholder='{ "key": "paste your json here" }'
                        className="w-full h-96 bg-gray-800 text-gray-200 font-mono text-sm p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-none"
                    />
                </div>
                {/* Output Area */}
                <div>
                     <label htmlFor="json-output" className="block text-sm font-medium text-gray-300 mb-2">Output</label>
                    <pre className={`w-full h-96 bg-gray-800 text-gray-200 font-mono text-sm p-4 border-2 rounded-md overflow-auto whitespace-pre-wrap break-all ${getOutputClass()}`}>
                        <code>{outputJson}</code>
                    </pre>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="indent-select" className="text-gray-300">Indentation:</label>
                    <select
                        id="indent-select"
                        value={indent}
                        onChange={(e) => setIndent(e.target.value as IndentType)}
                        className="bg-gray-700 text-white border-gray-600 rounded-md py-2 px-3 focus:border-cyan-500 focus:ring-0"
                    >
                        <option value="2">2 Spaces</option>
                        <option value="4">4 Spaces</option>
                        <option value="tab">Tabs</option>
                    </select>
                </div>
                 <button
                    onClick={handleFormat}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                >
                    Format & Validate
                </button>
                 <button
                    onClick={handleMinify}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                >
                    Minify
                </button>
            </div>
        </div>
    );
};

export default JSONFormatterValidator;