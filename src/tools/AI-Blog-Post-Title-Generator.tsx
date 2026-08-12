import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIBlogPostTitleGenerator: React.FC = () => {
    const [topic, setTopic] = useState<string>('AI in Web Development');
    const [keywords, setKeywords] = useState<string>('React, Next.js, performance');
    const [titles, setTitles] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!topic.trim() || !keywords.trim()) {
            setError('Please provide both a topic and keywords.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setTitles('');

        const userInput = `Topic: ${topic}\nKeywords: ${keywords}`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userInput,
                config: {
                    systemInstruction: "You are a professional headline generator. Based on the user's topic and keywords, generate 10 distinct, catchy, and high-conversion blog post titles. Include a mix of listicles, 'how-to' guides, and question-based headlines. Output as a numbered list.",
                }
            });
            
            setTitles(response.text);
        } catch (err: any) {
            console.error(err);
            setError(`Failed to generate titles: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [topic, keywords]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">AI Blog Post Title Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate 10 catchy titles for your next blog post.</p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="topic-input" className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
                    <input id="topic-input" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Digital Marketing Trends" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                </div>
                <div>
                    <label htmlFor="keywords-input" className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
                    <input id="keywords-input" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g., SEO, content, social media" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                </div>
                <div className="text-center pt-2">
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating...' : 'Generate Titles'}
                    </button>
                </div>
            </div>

            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md mt-6">{error}</p>}
            
            {(isLoading || titles) && (
                 <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Generated Titles</label>
                    <div className="w-full min-h-48 bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md">
                        {isLoading ? <p>Generating...</p> : <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: titles.replace(/\n/g, '<br />') }} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIBlogPostTitleGenerator;