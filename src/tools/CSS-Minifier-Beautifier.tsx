import React, { useState, useCallback } from 'react';

type ProcessStatus = 'idle' | 'success' | 'error';

// --- Core Logic ---

const minifyCss = (css: string): string => {
    let minified = css;
    // Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove newlines, tabs, and extra spaces
    minified = minified.replace(/(\r\n|\n|\r|\t)/gm, '');
    minified = minified.replace(/\s+/g, ' ');
    // Remove spaces around selectors and braces
    minified = minified.replace(/\s*([,>+~{}:;])\s*/g, '$1');
    // Remove trailing semicolons in blocks
    minified = minified.replace(/;}/g, '}');
    
    return minified.trim();
};

const beautifyCss = (css: string): string => {
    let beautified = '';
    let indentLevel = 0;
    const indentChar = '  '; // 2 spaces

    // First, minify to get a consistent starting point
    const minified = minifyCss(css);

    for (let i = 0; i < minified.length; i++) {
        const char = minified[i];

        if (char === '{') {
            beautified += ' {\n';
            indentLevel++;
            beautified += indentChar.repeat(indentLevel);
        } else if (char === '}') {
            beautified = beautified.trimEnd();
            beautified += '\n';
            indentLevel--;
            beautified += indentChar.repeat(indentLevel) + '}\n';
            beautified += indentChar.repeat(indentLevel);
        } else if (char === ';') {
            beautified += ';\n';
            beautified += indentChar.repeat(indentLevel);
        } else {
            beautified += char;
        }
    }

    // Final cleanup for consistent newlines
    return beautified.replace(/\n\s*\n/g, '\n').trim();
};


const validateCss = (css: string): string | null => {
    const openBraces = (css.match(/{/g) || []).length;
    const closeBraces = (css.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
        return `Validation Error: Mismatched curly braces. Found ${openBraces} opening but ${closeBraces} closing.`;
    }
    return null;
};

// --- Main Component ---

const CSSMinifierBeautifier: React.FC = () => {
    const [inputCss, setInputCss] = useState<string>('');
    const [outputCss, setOutputCss] = useState<string>('');
    const [status, setStatus] = useState<ProcessStatus>('idle');
    const [message, setMessage] = useState<string>('');

    const handleAction = (action: 'minify' | 'beautify') => {
        if (!inputCss.trim()) {
            setStatus('error');
            setMessage('Input is empty.');
            setOutputCss('');
            return;
        }

        const validationError = validateCss(inputCss);
        if (validationError) {
            setStatus('error');
            setMessage(validationError);
            setOutputCss('');
            return;
        }

        try {
            const result = action === 'minify' ? minifyCss(inputCss) : beautifyCss(inputCss);
            setOutputCss(result);
            setStatus('success');
            setMessage(`CSS ${action === 'minify' ? 'minified' : 'beautified'} successfully.`);
        } catch (e: any) {
            setStatus('error');
            setMessage(`An unexpected error occurred: ${e.message}`);
            setOutputCss('');
        }
    };
    
    const getOutputClass = () => {
        switch (status) {
            case 'success': return 'border-green-500/50';
            case 'error': return 'border-red-500/50';
            default: return 'border-gray-700';
        }
    };
    
    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">CSS Minifier & Beautifier</h2>
            <p className="text-center text-gray-400 mb-8">Compress or format CSS code instantly using pure JavaScript.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <textarea
                    value={inputCss}
                    onChange={(e) => setInputCss(e.target.value)}
                    placeholder={`body {\n  color: #333;\n  font-size: 16px;\n}`}
                    className="w-full h-80 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-y"
                />
                <textarea
                    readOnly
                    value={outputCss}
                    placeholder="Output will appear here..."
                    className={`w-full h-80 bg-gray-800 text-gray-200 font-mono p-4 border-2 rounded-md transition resize-y ${getOutputClass()}`}
                />
            </div>

            {message && (
                 <div className={`p-3 rounded-md text-center font-semibold mb-6 ${status === 'success' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                    {message}
                 </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4">
                <button onClick={() => handleAction('minify')} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all">Minify CSS</button>
                <button onClick={() => handleAction('beautify')} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all">Beautify CSS</button>
            </div>
        </div>
    );
};

export default CSSMinifierBeautifier;
