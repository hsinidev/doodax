import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

type Sentiment = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

interface SentimentResult {
    sentiment: Sentiment;
    justification: string;
}

const SimpleSentimentAnalyzer: React.FC = () => {
    const [text, setText] = useState<string>('I am so excited about the new project, it looks amazing!');
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text,
                config: {
                    systemInstruction: 'You are a sentiment analysis engine. Analyze the user-provided text and classify its overall sentiment as one of the following: POSITIVE, NEGATIVE, or NEUTRAL. Output only the classification word in all caps, followed by a brief, one-sentence justification separated by a colon.',
                }
            });

            const [sentiment, ...justificationParts] = response.text.split(':');
            const justification = justificationParts.join(':').trim();
            
            const sentimentUpper = sentiment.toUpperCase().trim();

            if (sentimentUpper === 'POSITIVE' || sentimentUpper === 'NEGATIVE' || sentimentUpper === 'NEUTRAL') {
                setResult({ sentiment: sentimentUpper as Sentiment, justification });
            } else {
                throw new Error("AI returned an unexpected format.");
            }
        } catch (err: any) {
            console.error(err);
            setError(`Analysis failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [text]);

    const getResultUI = () => {
        if (isLoading) return <p className="text-center">Analyzing sentiment...</p>;
        if (!result) return null;

        let colors = '';
        let emoji = '';
        switch(result.sentiment) {
            case 'POSITIVE': colors = 'bg-green-500/10 text-green-400'; emoji = '😊'; break;
            case 'NEGATIVE': colors = 'bg-red-500/10 text-red-400'; emoji = '😞'; break;
            case 'NEUTRAL': colors = 'bg-gray-500/10 text-gray-300'; emoji = '😐'; break;
        }

        return (
            <div className={`p-6 rounded-lg text-center animate-fade-in ${colors}`}>
                <p className="text-5xl font-bold">{result.sentiment} {emoji}</p>
                <p className="text-md mt-2">{result.justification}</p>
            </div>
        )
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Simple Sentiment Analyzer</h2>
            <p className="text-center text-gray-400 mb-8">Determine if a block of text is positive, negative, or neutral.</p>

            <div className="space-y-4">
                 <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" placeholder="Enter text here..."/>
                 <div className="text-center">
                    <button onClick={handleAnalyze} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
                    </button>
                </div>
            </div>
            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md mt-4">{error}</p>}
            <div className="mt-6 min-h-24">{getResultUI()}</div>
        </div>
    );
};

export default SimpleSentimentAnalyzer;