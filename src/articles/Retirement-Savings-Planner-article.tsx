import React, { useState } from 'react';

const RetirementSavingsPlannerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
                    <h2>The Magic of Compound Interest: Powering Your Retirement Savings</h2>
                    <p>
                        Planning for retirement can feel like a monumental task, but the most powerful force in finance is on your side: compound interest. Albert Einstein reportedly called it the "eighth wonder of the world," and for good reason. It's the process where your investment returns start earning their own returns, creating exponential growth over time. A retirement savings planner demystifies this process, showing you how consistent savings today can grow into a substantial nest egg for the future.
                    </p>

                    <h3>What is Compound Interest?</h3>
                    <p>
                        Compound interest is the interest you earn on both your original investment (the principal) and the accumulated interest from previous periods. Unlike simple interest, which is calculated only on the principal, compounding allows your savings to grow at an accelerating rate.
                    </p>
                    <p>
                        For example, if you invest $1,000 at a 7% annual return, after the first year, you'll have $1,070. In the second year, you'll earn 7% on the entire $1,070, not just the original $1,000. This might seem small at first, but over decades, the effect is dramatic.
                    </p>

                    <h3>The Key Inputs for Your Retirement Plan</h3>
                    <p>
                        A retirement calculator uses the future value formula, incorporating several key variables to project your savings:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Current Savings:</strong> The amount you've already saved provides a head start for compounding.</li>
                        <li><strong>Monthly Contribution:</strong> Consistent, regular contributions are the engine of your savings plan.</li>
                        <li><strong>Time Horizon:</strong> The number of years until retirement is your most valuable asset. The longer your money has to grow, the more powerful compounding becomes.</li>
                        <li><strong>Expected Annual Return:</strong> This is the average annual return you expect from your investments (e.g., from a diversified portfolio of stocks and bonds). A common historical average for the stock market is around 7-10%, though this is not guaranteed.</li>
                    </ul>
                    <p>
                        By inputting these values, the calculator can project the future value of your investments, giving you a tangible target to aim for and illustrating the powerful impact of starting early and saving consistently.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-rose-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default RetirementSavingsPlannerArticle;