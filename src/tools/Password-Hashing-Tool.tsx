import React, { useState, useCallback } from 'react';

// --- Core Hashing Logic ---

/**
 * Hashes a string using the SHA-256 algorithm via the Web Crypto API.
 * @param text The string to hash.
 * @returns A promise that resolves to the 64-character hexadecimal hash string.
 */
const hashText = async (text: string): Promise<string> => {
    // 1. Encode the string into a Uint8Array (which is a view on an ArrayBuffer).
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // 2. Use the Web Crypto API to digest the data.
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);

    // 3. Convert the ArrayBuffer to a hexadecimal string.
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hexHash;
};

// --- Main Component ---
const PasswordHashingTool: React.FC = () => {
    const [inputText, setInputText] = useState<string>('hello world');
    const [hashedOutput, setHashedOutput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [copyStatus, setCopyStatus] = useState<boolean>(false);

    const handleHash = useCallback(async () => {
        if (!inputText) {
            setHashedOutput('');
            return;
        }
        setIsLoading(true);
        try {
            const hash = await hashText(inputText);
            setHashedOutput(hash);
        } catch (error) {
            console.error("Hashing failed:", error);
            setHashedOutput('Error: Could not generate hash.');
        } finally {
            setIsLoading(false);
        }
    }, [inputText]);

    const handleCopy = () => {
        if (!hashedOutput || hashedOutput.startsWith('Error')) return;
        navigator.clipboard.writeText(hashedOutput).then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Password Hashing Tool (SHA-256)</h2>
            <p className="text-center text-gray-400 mb-8">Generate a SHA-256 hash using the secure Web Crypto API.</p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">Input Text / Password</label>
                    <textarea
                        id="text-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to hash..."
                        className="w-full h-32 bg-gray-800 text-gray-200 font-sans text-lg p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-y"
                    />
                </div>

                <div className="text-center">
                    <button
                        onClick={handleHash}
                        disabled={isLoading}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Hashing...' : 'Generate SHA-256 Hash'}
                    </button>
                </div>

                <div>
                    <label htmlFor="hash-output" className="block text-sm font-medium text-gray-300 mb-2">SHA-256 Hash Output</label>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md">
                        <code className="flex-grow font-mono text-gray-300 break-all">{hashedOutput}</code>
                        <button
                            onClick={handleCopy}
                            disabled={!hashedOutput || hashedOutput.startsWith('Error')}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                        >
                            {copyStatus ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordHashingTool;
