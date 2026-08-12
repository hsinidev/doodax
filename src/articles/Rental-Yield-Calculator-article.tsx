import React, { useState } from 'react';

const RentalYieldCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-60 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-teal-400">
                    <h2>How to Calculate Rental Yield: A Key Metric for Real Estate Investors</h2>
                    <p>
                        For real estate investors, rental yield is a fundamental metric used to determine the potential return on a rental property. It expresses the annual rental income as a percentage of the property's total cost. A higher yield generally indicates a more profitable investment. There are two types of yield to consider: gross yield and net yield.
                    </p>

                    <h3>Gross Rental Yield</h3>
                    <p>
                        Gross yield is the simpler of the two calculations. It looks only at the rental income relative to the property's price.
                    </p>
                    <p><code>Gross Yield = (Annual Rental Income / Total Property Cost) * 100</code></p>
                    <p>For example, if you buy a property for $300,000 and rent it for $2,000 per month ($24,000 per year), the gross yield is <code>($24,000 / $300,000) * 100 = 8%</code>.</p>
                    <p>While easy to calculate, gross yield is a blunt instrument because it ignores the significant operating expenses associated with owning a rental property.</p>

                    <h3>Net Rental Yield: The More Accurate Picture</h3>
                    <p>
                        Net yield provides a much more realistic view of your return on investment by factoring in your annual operating costs. These expenses can include property taxes, insurance, maintenance, property management fees, and periods of vacancy.
                    </p>
                    <p><code>Net Yield = ((Annual Rental Income - Annual Expenses) / Total Property Cost) * 100</code></p>
                    <p>
                        Using the same example, if your annual expenses for the $300,000 property are $5,000, your net annual income is $24,000 - $5,000 = $19,000.
                    </p>
                     <p>The net yield would be <code>($19,000 / $300,000) * 100 = 6.33%</code>. This is a more accurate reflection of the property's performance as an investment.</p>
                
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

export default RentalYieldCalculatorArticle;