import React, { useState } from 'react';

const PercentageChangeCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
                    <h2>How to Calculate Percentage Change: A Simple Formula for Tracking Growth and Decline</h2>
                    <p>
                        Percentage change is a simple but powerful mathematical concept that helps us understand the degree of change over time. Whether you're tracking the growth of an investment, analyzing business metrics, or just comparing prices, calculating the percentage increase or decrease provides a clear, standardized measure of change. A percentage change calculator automates this process, but the formula is easy to understand.
                    </p>

                    <h3>The Formula for Percentage Change</h3>
                    <p>
                        The formula to calculate the percentage change from an initial (or old) value to a final (or new) value is:
                    </p>
                    <p><code>Percentage Change = ((Final Value - Initial Value) / Initial Value) * 100</code></p>
                    
                    <h3>Example: Calculating an Increase</h3>
                    <p>
                        Let's say a stock you own increased in value from $150 to $180.
                    </p>
                    <ol className="list-decimal list-inside">
                        <li>Subtract the initial value from the final value: <code>$180 - $150 = $30</code>.</li>
                        <li>Divide that result by the initial value: <code>$30 / $150 = 0.2</code>.</li>
                        <li>Multiply by 100 to get the percentage: <code>0.2 * 100 = 20%</code>.</li>
                    </ol>
                    <p>The stock's value increased by 20%.</p>

                    <h3>Example: Calculating a Decrease</h3>
                    <p>
                        Now, imagine a product's price was discounted from $50 to $40.
                    </p>
                     <ol className="list-decimal list-inside">
                        <li>Subtract the initial value from the final value: <code>$40 - $50 = -$10</code>.</li>
                        <li>Divide that result by the initial value: <code>-$10 / $50 = -0.2</code>.</li>
                        <li>Multiply by 100: <code>-0.2 * 100 = -20%</code>.</li>
                    </ol>
                    <p>The price decreased by 20%. The negative sign indicates a decline. A calculator makes this distinction clear, often using colors and symbols to show whether the change was positive or negative.</p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-cyan-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default PercentageChangeCalculatorArticle;