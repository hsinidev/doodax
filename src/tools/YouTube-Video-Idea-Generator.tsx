import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const YouTubeVideoIdeaGenerator: React.FC = () => {
    const [niche, setNiche] = useState<string>('Tech Reviews');
    const [keywords, setKeywords] = useState<string>('smartphones, cameras, budget');
    const [ideas, setIdeas] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!niche.trim() || !keywords.trim()) {
            setError('Please provide both a niche and keywords.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setIdeas('');

        const userInput = `Niche: ${niche}\nKeywords: ${keywords}`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userInput,
                config: {
                    systemInstruction: "You are a YouTube strategist. Generate 5 unique and engaging video ideas based on the user's keywords and niche. Each idea must include a working title and a 1-2 sentence concept description. Format the output using Markdown with bold titles.",
                }
            });
            
            setIdeas(response.text);
        } catch (err: any) {
            console.error(err);
            setError(`Failed to generate ideas: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [niche, keywords]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">YouTube Video Idea Generator</h2>
            <p className="text-center text-gray-400 mb-8">Get 5 creative video ideas from our AI strategist.</p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="niche-input" className="block text-sm font-medium text-gray-300 mb-2">Your Niche</label>
                    <input id="niche-input" type="text" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g., Cooking, Gaming, Fitness" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                </div>
                <div>
                    <label htmlFor="keywords-input" className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
                    <input id="keywords-input" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g., beginner recipes, FPS games, home workouts" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                </div>
                <div className="text-center pt-2">
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating...' : 'Generate Ideas'}
                    </button>
                </div>
            </div>

            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md mt-6">{error}</p>}
            
            {(isLoading || ideas) && (
                 <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Generated Video Ideas</label>
                    <div className="w-full min-h-48 bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md">
                        {isLoading ? <p>Generating...</p> : <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: ideas.replace(/\n/g, '<br />') }} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default YouTubeVideoIdeaGenerator;