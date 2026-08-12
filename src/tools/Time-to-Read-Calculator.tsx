
import React, { useState, useMemo } from 'react';

const WORDS_PER_MINUTE = 225; // Average reading speed

const TimeToReadCalculator: React.FC = () => {
    const [text, setText] = useState('Paste your article or text here to estimate how long it will take to read. The average person reads about 225 words per minute. This calculator uses that standard to provide a quick estimate. Longer texts will naturally take more time, while shorter ones will be quicker. This is a very useful tool for bloggers and content creators who want to give their audience an idea of the time commitment for an article. It can improve user experience by setting clear expectations up front. Go ahead and try it out with a longer block of text!');

    const { wordCount, readTimeMinutes } = useMemo(() => {
        const words = text.trim().split(/\s+/).filter(Boolean);
        const count = words.length;
        if (count === 0) return { wordCount: 0, readTimeMinutes: 0 };
        
        const minutes = count / WORDS_PER_MINUTE;
        return {
            wordCount: count,
            readTimeMinutes: Math.ceil(minutes),
        };
    }, [text]);

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Time to Read Calculator</h2>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                className="w-full bg-gray-800 p-4 rounded-md resize-y mb-6"
                placeholder="Paste your text here..."
            />

            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-400 uppercase">Estimated Read Time</p>
                        <p className="text-4xl font-bold text-cyan-400">~{readTimeMinutes} min</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 uppercase">Word Count</p>
                        <p className="text-4xl font-bold text-cyan-400">{wordCount.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeToReadCalculator;
