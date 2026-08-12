import React, { useState } from 'react';

const VATSalesTaxCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>Understanding VAT and Sales Tax Calculations: Inclusive vs. Exclusive</h2>
                    <p>
                        Value-Added Tax (VAT) and Sales Tax are both types of consumption taxes that are added to the price of goods and services. While they function differently in an economic sense, for a consumer or small business owner, the calculation is often similar. A tax calculator is an essential tool for quickly determining the final price of a product or for figuring out how much tax is included in a total price. The key is to understand whether you are adding tax to a base price or backing it out of a final price.
                    </p>

                    <h3>Adding Tax (Exclusive Pricing)</h3>
                    <p>
                        This is the most common scenario in places like the United States, where prices are typically displayed pre-tax. You have a base price, and you need to calculate the final cost after tax is added.
                    </p>
                    <p>
                        The formula is simple:
                    </p>
                    <p><code>Tax Amount = Base Price * (Tax Rate / 100)</code></p>
                    <p><code>Total Price = Base Price + Tax Amount</code></p>
                    <p>For example, if an item costs $100 and the sales tax is 8%, the tax amount is $8, and the total price is $108.</p>

                    <h3>Removing Tax (Inclusive Pricing)</h3>
                    <p>
                        This scenario is common in Europe and other regions where VAT is used. Prices are often displayed with the tax already included, and a business may need to determine the original price and the tax amount for accounting purposes. This calculation is a bit trickier than simply subtracting the tax percentage.
                    </p>
                    <p>
                        The formula is:
                    </p>
                    <p><code>Base Price = Total Price / (1 + (Tax Rate / 100))</code></p>
                    <p><code>Tax Amount = Total Price - Base Price</code></p>
                    <p>For example, if an item costs €120 with a 20% VAT included, you can't just subtract 20% from €120. Instead, you calculate the base price: €120 / (1 + 0.20) = €120 / 1.2 = €100. The tax amount is €120 - €100 = €20. A tax calculator automates this reverse calculation, preventing common errors.</p>
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

export default VATSalesTaxCalculatorArticle;