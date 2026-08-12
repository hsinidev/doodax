import React, { useState } from 'react';

const SimpleTextSummarizerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
                    <h2>How AI Text Summarization Works and Its Impact on Productivity</h2>
                    <p>
                        In an age of information overload, the ability to quickly grasp the key points of a long document, article, or report is a superpower. AI-powered text summarizers are tools designed to do just that, using advanced Natural Language Processing (NLP) to distill lengthy texts into concise, digestible summaries. These tools are no longer science fiction; they are practical applications of Large Language Models (LLMs) like Google's Gemini, and they are changing the way we consume and process information.
                    </p>

                    <h3>The Technology Behind AI Summarization</h3>
                    <p>
                        Modern summarization tools use a technique called **abstractive summarization**. Unlike older, **extractive** methods that simply identified and copied key sentences from the original text, abstractive summarization goes a step further. The AI model reads and "understands" the context, concepts, and relationships within the entire text. It then generates a brand new summary in its own words, paraphrasing the core ideas in a coherent and natural-sounding way.
                    </p>
                    <p>
                        This is achieved by training massive LLMs on a vast corpus of text from the internet. The model learns grammar, syntax, context, and the art of expressing ideas. When you provide it with a block of text and a prompt (like "summarize this in one paragraph"), it uses its training to predict the most likely sequence of words that would form a high-quality summary of that text.
                    </p>
                    
                    <h3>Key Benefits for Productivity</h3>
                    <ul className="list-disc pl-5">
                        <li><strong>Time-Saving:</strong> The most obvious benefit is the immense amount of time saved. Instead of spending 20 minutes reading an article, you can understand its main arguments in under a minute.</li>
                        <li><strong>Improved Comprehension:</strong> A good summary can help clarify complex topics by filtering out noise and focusing only on the most critical information.</li>
                        <li><strong>Efficient Research:</strong> Students, researchers, and professionals can quickly evaluate the relevance of numerous documents without having to read each one in its entirety.</li>
                        <li><strong>Content Creation:</strong> Summarizers can help content creators generate abstracts, social media blurbs, or video descriptions from their longer-form content.</li>
                    </ul>
                
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-blue-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default SimpleTextSummarizerArticle;