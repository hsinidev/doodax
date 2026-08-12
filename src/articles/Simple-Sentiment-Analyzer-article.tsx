import React, { useState } from 'react';

const SimpleSentimentAnalyzerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>What is Sentiment Analysis and How Do AI Models Classify Text?</h2>
                    <p>
                        Sentiment analysis, also known as opinion mining, is a field of Natural Language Processing (NLP) that involves using AI to identify, extract, and quantify the emotional tone or sentiment expressed in a piece of text. In its simplest form, it classifies text as POSITIVE, NEGATIVE, or NEUTRAL. This technology has become a cornerstone of modern data analysis, allowing businesses and researchers to automatically gauge public opinion, monitor brand reputation, and understand customer feedback at a massive scale.
                    </p>

                    <h3>How AI Models Learn Sentiment</h3>
                    <p>
                        The engine behind a sentiment analyzer is a machine learning model, typically a Large Language Model (LLM), that has been trained on a vast dataset of text that has been pre-labeled with its sentiment. For example, a training dataset might contain thousands of movie reviews labeled as "positive" or "negative."
                    </p>
                    <p>
                        During training, the model learns to associate certain words, phrases, and even sentence structures with different sentiments. It learns that words like "amazing," "excellent," and "love" are typically associated with positive sentiment, while words like "terrible," "disappointing," and "hate" are linked to negative sentiment. The model also learns to understand context. For example, the word "sick" could be negative ("I feel sick") or positive ("That was a sick trick!"). A sophisticated model can often differentiate between these uses.
                    </p>
                    
                    <h3>From Classification to Justification</h3>
                    <p>
                        When you input new text, the model analyzes it based on its training and assigns a probability score to each sentiment category. The category with the highest score is chosen as the final classification. Modern LLMs can also provide a justification for their choice by identifying the specific words or phrases that most influenced their decision, adding a layer of transparency to the analysis.
                    </p>

                    <h3>Common Business Applications</h3>
                    <ul className="list-disc pl-5">
                        <li><strong>Brand Monitoring:</strong> Companies can automatically analyze social media mentions, news articles, and reviews to understand public perception of their brand in real-time.</li>
                        <li><strong>Customer Service:</strong> Support tickets can be automatically triaged based on the sentiment of the customer's message, prioritizing angry or frustrated customers.</li>
                        <li><strong>Market Research:</strong> Businesses can analyze customer feedback on products to identify common complaints or features that customers love, guiding future product development.</li>
                        <li><strong>Financial Trading:</strong> Algorithmic traders can analyze news headlines and social media sentiment about a company to help predict stock price movements.</li>
                    </ul>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-amber-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default SimpleSentimentAnalyzerArticle;