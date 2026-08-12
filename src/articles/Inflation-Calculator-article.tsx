import React, { useState } from 'react';

const InflationCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
                    <h2>Understanding Purchasing Power: How an Inflation Calculator Works</h2>
                    <p>
                        Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. A dollar today does not buy as much as it did 20 years ago. An inflation calculator is a tool that helps quantify this change, showing you the equivalent value of a certain amount of money between two different years. This is done by using historical data from the Consumer Price Index (CPI).
                    </p>

                    <h3>What is the Consumer Price Index (CPI)?</h3>
                    <p>
                        The CPI is a measure that examines the weighted average of prices of a basket of consumer goods and services, such as transportation, food, and medical care. It is calculated by taking price changes for each item in the predetermined basket of goods and averaging them. The CPI is one of the most widely used statistics for identifying periods of inflation or deflation.
                    </p>
                    <p>
                        Inflation data is often presented as an index number, with a specific year (like 1982 or 2020) set as the baseline with a value of 100.
                    </p>

                    <h3>The Formula for Calculating Inflation's Effect</h3>
                    <p>
                        An inflation calculator uses a simple ratio based on the CPI values for the start and end years to determine the change in purchasing power.
                    </p>
                    <p><code>Adjusted Value = Original Amount * (CPI of End Year / CPI of Start Year)</code></p>
                    <p>
                        For example, if you want to know what $100 in the year 2000 is worth in 2023, and the CPI for 2000 was 72.2 and for 2023 was 117.2, the calculation would be:
                    </p>
                    <p><code>Adjusted Value = $100 * (117.2 / 72.2) = $100 * 1.623 = $162.30</code></p>
                    <p>This means that you would need $162.30 in 2023 to have the same purchasing power that $100 had in 2000.</p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-emerald-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default InflationCalculatorArticle;