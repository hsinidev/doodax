import React, { useState } from 'react';

const TipCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
                    <h2>The Simple Math Behind Tip Calculation and Splitting the Bill</h2>
                    <p>
                        Calculating a tip is a common social and financial task, but it can sometimes cause a moment of hesitation or confusion, especially when the bill needs to be split among several people. A tip calculator simplifies this process, ensuring you can quickly and accurately determine the correct amount to add for service and how to divide the total cost fairly. Understanding the simple math behind it can make the process even more transparent.
                    </p>

                    <h3>How to Calculate the Tip</h3>
                    <p>
                        A tip is calculated as a percentage of the total bill amount (before tax). While tipping customs vary, standard rates in many countries are between 15% and 25%.
                    </p>
                    <p>
                        The formula is:
                    </p>
                    <p><code>Tip Amount = Bill Amount * (Tip Percentage / 100)</code></p>
                    <p>For example, on a $50 bill with a desired 20% tip:</p>
                    <p><code>Tip Amount = $50 * (20 / 100) = $50 * 0.20 = $10</code></p>
                    <p>The total amount you would pay is the bill plus the tip: <code>$50 + $10 = $60</code>.</p>

                    <h3>How to Split the Bill</h3>
                    <p>
                        When dining with a group, the next step is to split the total bill. A calculator makes this effortless by dividing the total amount by the number of people.
                    </p>
                    <p>
                        The formula is:
                    </p>
                    <p><code>Amount Per Person = Total Amount / Number of People</code></p>
                    <p>Using the example above, if 4 people are splitting the $60 total bill:</p>
                    <p><code>Amount Per Person = $60 / 4 = $15</code></p>
                    <p>Each person would pay $15. A tip calculator removes the need for mental math, especially after a long meal, providing a quick and error-free way to settle the bill.</p>
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

export default TipCalculatorArticle;