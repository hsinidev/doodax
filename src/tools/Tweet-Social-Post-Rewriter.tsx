import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const TONE_OPTIONS = ['Professional', 'Casual', 'Excited', 'Witty', 'Empathetic'];

const TweetSocialPostRewriter: React.FC = () => {
    const [originalText, setOriginalText] = useState<string>('Our company just released a new software update with several performance improvements.');
    const [targetTone, setTargetTone] = useState<string>('Excited');
    const [rewrittenText, setRewrittenText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleRewrite = useCallback(async () => {
        if (!originalText.trim()) {
            setError('Please enter some text to rewrite.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setRewrittenText('');

        const userInput = `Original Text: ${originalText}\nTarget Tone: ${targetTone}`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userInput,
                config: {
                    systemInstruction: 'You are a tone adjustment specialist. Your task is to rewrite the provided text to match the specified target tone while retaining the core meaning. Do not add any introductory or concluding remarks.',
                }
            });
            
            setRewrittenText(response.text);
        } catch (err: any) {
            console.error(err);
            setError(`Failed to rewrite text: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [originalText, targetTone]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Tweet & Social Post Rewriter</h2>
            <p className="text-center text-gray-400 mb-8">Rewrite your text to match a different tone with AI.</p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="original-text" className="block text-sm font-medium text-gray-300 mb-2">Original Text</label>
                    <textarea id="original-text" value={originalText} onChange={(e) => setOriginalText(e.target.value)} rows={4} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                </div>

                <div>
                    <label htmlFor="target-tone" className="block text-sm font-medium text-gray-300 mb-2">Target Tone</label>
                    <select id="target-tone" value={targetTone} onChange={(e) => setTargetTone(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0">
                        {TONE_OPTIONS.map(tone => <option key={tone} value={tone}>{tone}</option>)}
                    </select>
                </div>

                <div className="text-center pt-2">
                    <button onClick={handleRewrite} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Rewriting...' : 'Rewrite Text'}
                    </button>
                </div>

                {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}
            
                {(isLoading || rewrittenText) && (
                     <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Rewritten Text</label>
                        <div className="w-full min-h-24 bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md">
                            {isLoading ? <p>Generating...</p> : <p>{rewrittenText}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TweetSocialPostRewriter;