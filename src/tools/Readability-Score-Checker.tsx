import React, { useState, useMemo } from 'react';

// --- Core Logic ---
const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
};

const calculateFleschKincaid = (text: string) => {
    if (!text.trim()) return { gradeLevel: 0, score: 0, sentences: 0, words: 0 };
    
    const sentences = text.match(/[\w|)][.?!]+(\s|$)/g) || [];
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const numSentences = sentences.length > 0 ? sentences.length : 1; // Avoid division by zero
    const numWords = words.length;
    const numSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
    
    if (numWords === 0) return { gradeLevel: 0, score: 0, sentences: 0, words: 0 };

    const score = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
    const gradeLevel = 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59;
    
    return {
        gradeLevel: parseFloat(gradeLevel.toFixed(1)),
        score: parseFloat(score.toFixed(1)),
        sentences: sentences.length, // report actual sentence count
        words: numWords
    };
};

// --- Main Component ---
const ReadabilityScoreChecker: React.FC = () => {
    const [text, setText] = useState<string>('The quick brown fox jumps over the lazy dog. This is a simple sentence for testing purposes. Complex sentences with many syllables are harder to read.');
    const results = useMemo(() => calculateFleschKincaid(text), [text]);

    const getInterpretation = (grade: number) => {
        if (grade <= 0) return '';
        if (grade <= 5) return 'Very easy to read. Easily understood by an average 11-year-old student.';
        if (grade <= 8) return 'Easy to read. Conversational English for consumers.';
        if (grade <= 10) return 'Fairly difficult to read.';
        if (grade <= 12) return 'Difficult to read.';
        return 'Very difficult to read. Best understood by university graduates.';
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Readability Score Checker</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
                className="w-full h-64 bg-gray-800 p-4 rounded-md resize-y mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                     <p className="text-sm text-gray-400 uppercase">Flesch-Kincaid Grade Level</p>
                     <p className="text-5xl font-bold text-cyan-400 my-2">{results.gradeLevel}</p>
                     <p className="text-gray-300 h-10">{getInterpretation(results.gradeLevel)}</p>
                </div>
                 <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                     <p className="text-sm text-gray-400 uppercase">Statistics</p>
                     <div className="flex justify-around mt-4">
                         <div>
                             <p className="text-3xl font-bold">{results.sentences}</p>
                             <p className="text-xs text-gray-400">Sentences</p>
                         </div>
                          <div>
                             <p className="text-3xl font-bold">{results.words}</p>
                             <p className="text-xs text-gray-400">Words</p>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ReadabilityScoreChecker;
