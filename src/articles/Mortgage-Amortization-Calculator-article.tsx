import React, { useState } from 'react';

const MortgageAmortizationCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>Understanding Your Mortgage: Payments, Principal, and the Amortization Schedule</h2>
                    <p>
                        A mortgage is one of the largest financial commitments most people will ever make. Understanding how your monthly payment is calculated and where your money goes each month is crucial for long-term financial planning. A mortgage calculator and amortization schedule demystify this process, providing a clear breakdown of your loan over its entire lifespan.
                    </p>

                    <h3>How Your Monthly Payment is Calculated</h3>
                    <p>
                        Your fixed monthly mortgage payment is calculated using a formula that takes into account the loan principal, the interest rate, and the loan term. The goal of the formula is to ensure that if you make every payment on time, your loan will be paid off exactly at the end of the term.
                    </p>
                    <p>
                        Each payment is composed of two parts: principal and interest.
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Principal:</strong> The portion of your payment that goes toward paying down your actual loan balance.</li>
                        <li><strong>Interest:</strong> The portion of your payment that is the cost of borrowing the money, paid to the lender.</li>
                    </ul>

                    <h3>The Amortization Schedule: Watching Your Equity Grow</h3>
                    <p>
                        An amortization schedule is a table that shows the breakdown of each payment over the life of the loan. The most striking feature of this schedule is how the balance between principal and interest shifts over time.
                    </p>
                    <p>
                        In the early years of a mortgage, the vast majority of your monthly payment goes toward interest. This is because the outstanding balance is at its highest, so the interest charges are also at their highest. As you continue to make payments, the principal balance slowly decreases. As the balance shrinks, the amount of interest charged each month also shrinks.
                    </p>
                    <p>
                        This means that over time, a larger and larger portion of your fixed monthly payment goes toward paying down the principal. In the final years of your mortgage, almost your entire payment is going toward principal, and very little is going to interest. This process of paying down your loan balance is how you build equity in your home. A calculator that generates this schedule provides a powerful, long-term view of your financial journey.
                    </p>
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

export default MortgageAmortizationCalculatorArticle;