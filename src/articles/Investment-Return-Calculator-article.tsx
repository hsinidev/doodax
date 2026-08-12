import React, { useState } from 'react';

const InvestmentReturnCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-60 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-teal-400">
                    <h2>Calculating the Future Value of Your Investments with Compound Interest</h2>
                    <p>
                        An investment return calculator is a tool that projects the future value of your investments by applying the principle of compound interest. It shows how a combination of your initial investment and consistent contributions can grow over time based on an expected rate of return. This helps you visualize your long-term financial growth and set realistic goals for the future.
                    </p>

                    <h3>The Two Engines of Growth</h3>
                    <p>
                        The calculator's formula actually combines two separate calculations to determine the final amount:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li><strong>Future Value of a Lump Sum:</strong> This calculates the growth of your initial investment. The formula is <code>FV = PV * (1 + r)^n</code>, where PV is the present value, r is the periodic interest rate, and n is the number of periods.</li>
                        <li><strong>Future Value of an Annuity:</strong> This calculates the growth of your series of regular monthly contributions. The formula is more complex: <code>FV = PMT * [((1 + r)^n - 1) / r]</code>, where PMT is the periodic payment amount.</li>
                    </ol>
                    <p>The total future value is the sum of these two results.</p>
                    
                    <h3>An Example Calculation</h3>
                    <p>
                        Imagine you start with $1,000, contribute $100 per month for 10 years, and expect a 7% annual return. The calculator would first determine the monthly interest rate (0.07 / 12) and the total number of months (10 * 12 = 120).
                    </p>
                    <ul className="list-disc pl-5">
                        <li>Your initial $1,000 would grow to approximately $2,010.</li>
                        <li>Your total contributions of $12,000 (120 * $100) would grow to approximately $17,410.</li>
                    </ul>
                    <p>Your total estimated savings would be the sum of these, around $19,420. The most powerful part is seeing the total interest earned—in this case, nearly $6,420—which is money your money earned for you.</p>
                
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
                className="text-teal-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default InvestmentReturnCalculatorArticle;