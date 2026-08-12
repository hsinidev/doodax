import React, { useState, useMemo } from 'react';

// --- Core Counting Logic ---

const countCharacters = (text: string): number => {
    return text.length;
};

const countWords = (text: string): number => {
    // Trim whitespace from the start and end of the string
    const trimmedText = text.trim();
    // If the string is empty after trimming, there are no words
    if (!trimmedText) {
        return 0;
    }
    // Split the string by one or more whitespace characters
    // The regex \s+ matches any whitespace character (spaces, tabs, newlines)
    return trimmedText.split(/\s+/).length;
};

const countLines = (text: string): number => {
    // If the text is empty, there are no lines
    if (!text) {
        return 0;
    }
    // The number of lines is the number of newline characters + 1
    // An empty string results in [''], length 1, so we handle the empty case explicitly.
    return text.split('\n').length;
};


// --- UI Components ---

const MetricDisplay: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex-1 bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-4xl font-bold text-cyan-400">{value.toLocaleString()}</p>
        <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
);

// --- Main Component ---

const CharacterWordLineCounter: React.FC = () => {
    const [text, setText] = useState<string>('');

    const counts = useMemo(() => {
        return {
            characters: countCharacters(text),
            words: countWords(text),
            lines: countLines(text),
        };
    }, [text]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Character, Word & Line Counter</h2>
            <p className="text-center text-gray-400 mb-8">Get real-time statistics for your text as you type.</p>

            <div className="mb-6">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here..."
                    className="w-full h-64 bg-gray-800 text-gray-200 font-sans text-lg p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-y"
                    aria-label="Text input area"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <MetricDisplay value={counts.characters} label="Characters" />
                <MetricDisplay value={counts.words} label="Words" />
                <MetricDisplay value={counts.lines} label="Lines" />
            </div>
        </div>
    );
};

export default CharacterWordLineCounter;