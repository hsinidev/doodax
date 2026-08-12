import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const SimpleTextSummarizer: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = useCallback(async () => {
        if (!inputText.trim()) {
            setError('Please enter some text to summarize.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSummary('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: inputText,
                config: {
                    systemInstruction: 'You are an expert summarization tool. Your goal is to take a block of user-provided text and return a concise, one-paragraph summary of the key points. The summary must be objective and must not exceed 4 sentences.',
                }
            });

            setSummary(response.text);
        } catch (err: any) {
            console.error(err);
            setError(`Failed to generate summary: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [inputText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Simple Text Summarizer</h2>
            <p className="text-center text-gray-400 mb-8">Paste your text below to get a concise summary from our AI.</p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">Text to Summarize</label>
                    <textarea
                        id="text-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste a long article or text here..."
                        className="w-full h-48 bg-gray-800 text-gray-200 p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 resize-y"
                    />
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSummarize}
                        disabled={isLoading}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Summarizing...' : 'Generate Summary'}
                    </button>
                </div>

                {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}

                {(isLoading || summary) && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Summary</label>
                        <div className="w-full min-h-24 bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md">
                            {isLoading ? <p>Generating summary...</p> : <p>{summary}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimpleTextSummarizer;