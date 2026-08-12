import React, { useState } from 'react';

const SavingsGoalCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-pink-400">
                    <h2>Planning Your Financial Future: How a Savings Goal Calculator Can Help</h2>
                    <p>
                        Setting financial goals—whether it's for a down payment on a house, a new car, a vacation, or retirement—is the first step toward achieving financial security. However, a goal without a plan is just a wish. A savings goal calculator is a simple but powerful tool that translates your ambition into a concrete, actionable timeline. By breaking down a large goal into manageable monthly contributions, it provides clarity and motivation, helping you stay on track.
                    </p>

                    <h3>The Simple Math of Reaching Your Goal</h3>
                    <p>
                        The calculation at the heart of a savings goal calculator is straightforward. It determines how many months it will take to bridge the gap between your current savings and your final goal, based on how much you can set aside each month.
                    </p>
                    <p>
                        The formula is:
                    </p>
                    <p><code>Remaining Amount = Savings Goal - Initial Savings</code></p>
                    <p><code>Months to Goal = Remaining Amount / Monthly Contribution</code></p>
                    <p>For example, if your goal is $10,000, you have $1,000 saved, and you can contribute $250 per month:</p>
                    <p><code>Remaining Amount = $10,000 - $1,000 = $9,000</code></p>
                    <p><code>Months to Goal = $9,000 / $250 = 36 months</code></p>
                    <p>The calculator would then convert this into 3 years, giving you a clear and achievable timeline.</p>

                    <h3>The Psychological Benefit of a Plan</h3>
                    <p>
                        The real power of this tool is psychological. A large number like $10,000 can feel intimidating and abstract. But seeing that it can be reached in 3 years with a consistent contribution of $250 a month makes it feel concrete and manageable. This clarity can be a powerful motivator to stick to your budget and make consistent progress. You can also work backwards: if you want to reach your goal in 2 years (24 months), the calculator can tell you that you would need to save $375 per month ($9,000 / 24). This allows you to adjust your plan based on your timeline and financial capacity, turning a vague dream into a realistic project.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-pink-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default SavingsGoalCalculatorArticle;