import React, { useState, useMemo } from 'react';

// --- Core Stripping Logic ---

/**
 * Strips all HTML/XML tags from a string using a regular expression.
 * It also normalizes whitespace, replacing multiple consecutive whitespace
 * characters with a single space.
 * @param html The input string containing HTML.
 * @returns The plain text string with all tags removed.
 */
const stripHtmlTags = (html: string): string => {
    if (!html) return '';
    // 1. Remove all content between angle brackets (<...>).
    // 2. Replace multiple whitespace characters (including newlines) with a single space.
    // 3. Trim leading/trailing whitespace.
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// --- Main Component ---
const HTMLTextStripper: React.FC = () => {
    const [inputText, setInputText] = useState<string>('<p>Hello, <strong>World!</strong></p>\n<!-- This is a comment -->\n<a href="#">Click me!</a>');

    const cleanText = useMemo(() => {
        return stripHtmlTags(inputText);
    }, [inputText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">HTML/Text Stripper</h2>
            <p className="text-center text-gray-400 mb-8">Paste text or HTML below to instantly get clean, plain text.</p>

            <div className="space-y-6">
                {/* Input Area */}
                <div>
                    <label htmlFor="html-input" className="block text-sm font-medium text-gray-300 mb-2">Input with HTML</label>
                    <textarea
                        id="html-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="<p>Paste your text here...</p>"
                        className="w-full h-48 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-y"
                        aria-label="HTML input area"
                    />
                </div>

                {/* Output Area */}
                <div>
                    <label htmlFor="clean-output" className="block text-sm font-medium text-gray-300 mb-2">Clean Plain Text Output</label>
                    <textarea
                        id="clean-output"
                        readOnly
                        value={cleanText}
                        placeholder="Clean text will appear here..."
                        className="w-full h-48 bg-gray-800/50 text-gray-200 font-sans text-lg p-4 border-2 border-gray-700 rounded-md resize-y"
                        aria-label="Clean text output"
                    />
                </div>
            </div>
            <div className="text-center mt-6">
                 <button 
                    onClick={() => navigator.clipboard.writeText(cleanText)}
                    disabled={!cleanText}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Copy Clean Text
                </button>
            </div>
        </div>
    );
};

export default HTMLTextStripper;
