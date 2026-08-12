import React, { useState } from 'react';

const PaycheckCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>From Gross to Net: Understanding Your Paycheck</h2>
                    <p>
                        Understanding your paycheck is a key component of personal finance. The number you see on your employment offer is your "gross pay," but the amount that actually hits your bank account is your "net pay." The difference between these two numbers is the result of taxes and other deductions. A paycheck calculator provides a simple way to estimate your take-home pay, helping you create an accurate budget.
                    </p>

                    <h3>Gross Pay vs. Net Pay</h3>
                    <p>
                        <strong>Gross Pay</strong> is the total amount of money you earn before any deductions are taken out. If your salary is $60,000 per year and you are paid monthly, your gross pay per period is $5,000.
                    </p>
                    <p>
                        <strong>Net Pay</strong>, or take-home pay, is the amount of money you receive after all deductions have been subtracted from your gross pay. This is the actual amount you have available for your expenses.
                    </p>

                    <h3>Common Deductions</h3>
                    <p>
                        Several items are typically deducted from your gross pay:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Taxes:</strong> This is usually the largest deduction. It includes federal, state, and local income taxes, as well as FICA taxes (Social Security and Medicare). The exact amount depends on your income, filing status, and location. A simple calculator often uses a single "effective tax rate" to estimate this.</li>
                        <li><strong>Retirement Contributions:</strong> Pre-tax contributions to a 401(k) or similar retirement plan.</li>
                        <li><strong>Health Insurance Premiums:</strong> The portion of your health, dental, or vision insurance costs that you pay.</li>
                        <li><strong>Other Deductions:</strong> This can include things like life insurance, disability insurance, or union dues.</li>
                    </ul>
                    <p>By subtracting all these deductions from your gross pay, you arrive at your net pay. A calculator simplifies this process, giving you a clear estimate of what to expect on payday.</p>
                
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
                className="text-amber-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default PaycheckCalculatorArticle;