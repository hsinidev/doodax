import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

// A simple function to fetch an image from a URL and convert it to a base64 string.
// NOTE: This will be blocked by CORS for most external websites. This is a limitation of client-side fetching.
// A real-world application would use a server-side proxy to fetch the image. For this tool, we assume a CORS-friendly source.
const urlToGenerativePart = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve({
            inlineData: {
                data: (reader.result as string).split(',')[1],
                mimeType: blob.type,
            }
        });
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


const ImageCaptionGenerator: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>('https://picsum.photos/seed/doodax-caption/800/600');
    const [captions, setCaptions] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!imageUrl.trim()) {
            setError('Please enter an image URL.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setCaptions('');

        try {
            const imagePart = await urlToGenerativePart(imageUrl);
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart] },
                config: {
                    systemInstruction: 'You are a vision-enabled AI specialized in generating high-quality, descriptive captions and alternative text (alt text) for images. Analyze the provided image and generate two distinct outputs: 1) A concise, SEO-friendly alt text (max 10 words). 2) A creative, engaging social media caption (max 20 words). Output must be in Markdown list format.',
                }
            });
            
            setCaptions(response.text);

        } catch (err: any) {
            console.error(err);
            setError(`Failed to generate captions. The URL might be inaccessible due to CORS policy. Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [imageUrl]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">AI Image Caption Generator</h2>
            <p className="text-center text-gray-400 mb-8">Enter an image URL to generate alt text and a social media caption.</p>
            
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Analyzing...' : 'Generate Captions'}
                </button>
            </div>

            <div className="mt-6">
                {imageUrl && <img src={imageUrl} alt="Preview" className="w-full max-h-80 object-contain rounded-md bg-gray-800/50" />}
            </div>

            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md mt-6">{error}</p>}
            
            {(isLoading || captions) && (
                 <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Generated Captions</label>
                    <div className="w-full min-h-24 bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md">
                        {isLoading ? <p>Generating...</p> : <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: captions.replace(/\n/g, '<br />') }} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCaptionGenerator;