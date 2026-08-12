import React from 'react';

// This article is a placeholder and needs content.
const ReadabilityScoreCheckerArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
            <h2>Understanding Readability Scores (Flesch-Kincaid)</h2>
            <p>
                Have you ever read a piece of text that was so dense and complicated you had to read it three times to understand it? On the other hand, some writing is so clear and simple it flows effortlessly. The difference often comes down to readability. Readability formulas are tools that measure the complexity of a text, and one of the most widely used is the Flesch-Kincaid Grade Level.
            </p>
            <h3>What is the Flesch-Kincaid Grade Level?</h3>
            <p>
                The Flesch-Kincaid Grade Level is a readability test that analyzes a text and outputs a U.S. school grade level. A score of 8.0, for example, means that an eighth grader can understand the text. It's widely used by writers, marketers, and educators to ensure their content is accessible to their target audience.
            </p>
            <h3>How is it Calculated?</h3>
            <p>
                The formula is based on two key factors:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Average Sentence Length:</strong> Longer sentences are generally harder to read.</li>
                <li><strong>Average Syllables per Word:</strong> Words with more syllables are typically more complex.</li>
            </ul>
            <p>The formula combines these two metrics to produce the grade level score. For most web content, a grade level of around 8 is a good target, ensuring it's easily understood by the majority of adults.</p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default ReadabilityScoreCheckerArticle;