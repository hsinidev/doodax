import React, { useState } from 'react';

const BreakEvenPointCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
                    <h2>Finding the Point of Profitability: How to Calculate Your Break-Even Point</h2>
                    <p>
                        For any business, from a small startup to a large corporation, a fundamental question is: "How much do we need to sell to start making a profit?" The answer to this question is the break-even point. Break-even analysis is a crucial financial calculation that determines the number of units or the amount of revenue a company needs to generate to cover its total costs. It's the point where you are neither losing money nor making money.
                    </p>

                    <h3>The Key Components of the Calculation</h3>
                    <p>
                        To find your break-even point, you need three pieces of information:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Fixed Costs:</strong> These are costs that do not change regardless of how many units you produce or sell. Examples include rent, salaries, and insurance.</li>
                        <li><strong>Variable Cost Per Unit:</strong> These are the costs that are directly tied to producing one unit of your product. Examples include raw materials and direct labor.</li>
                        <li><strong>Selling Price Per Unit:</strong> This is the price at which you sell one unit of your product.</li>
                    </ul>

                    <h3>The Break-Even Formula</h3>
                    <p>
                        First, you calculate the **contribution margin** per unit, which is how much profit you make on each unit before accounting for fixed costs.
                    </p>
                    <p><code>Contribution Margin Per Unit = Selling Price Per Unit - Variable Cost Per Unit</code></p>
                    <p>
                        Then, you use this to find the break-even point in units:
                    </p>
                    <p><code>Break-Even Point (in Units) = Total Fixed Costs / Contribution Margin Per Unit</code></p>
                    <p>For example, if your fixed costs are $10,000, your variable cost per unit is $10, and you sell each unit for $30, your contribution margin is $20. Your break-even point is $10,000 / $20 = 500 units. This means you must sell 500 units to cover all your costs. The 501st unit you sell will be your first unit of profit.</p>
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

export default BreakEvenPointCalculatorArticle;