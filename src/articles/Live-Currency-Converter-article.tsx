import React, { useState } from 'react';

const LiveCurrencyConverterArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
                    <h2>How Live Currency Converters Work: Understanding Exchange Rates and APIs</h2>
                    <p>
                        A currency converter is a simple yet powerful tool that allows you to determine the value of one currency in relation to another. For international travelers, online shoppers, and businesses, these tools are essential for understanding costs and managing finances. A "live" converter goes a step further by using up-to-the-minute data, which is crucial in the volatile world of foreign exchange (forex) markets. This is made possible through specialized financial data APIs.
                    </p>

                    <h3>What is an Exchange Rate?</h3>
                    <p>
                        An exchange rate is the rate at which one currency will be exchanged for another. These rates are in a constant state of flux, influenced by a multitude of economic and geopolitical factors, including interest rates, inflation, political stability, and trade balances. The forex market is a global, decentralized market where these currencies are traded, and it's this trading activity that determines the "live" rates.
                    </p>

                    <h3>The Role of Exchange Rate APIs</h3>
                    <p>
                        To provide accurate conversions, a live currency converter tool can't store a static list of rates. It needs to fetch data from a reliable source in real-time. This is where an Exchange Rate API comes in.
                    </p>
                    <p>
                        An Exchange Rate API is a service that provides developers with programmatic access to current and historical foreign exchange rate data. When you use a converter tool, it makes a request to an API endpoint behind the scenes. The API then returns a JSON response containing the latest rates for various currency pairs (e.g., EUR/USD, USD/JPY). The tool's application logic then uses this data to perform the calculation.
                    </p>
                    <p>
                        These APIs get their data from a variety of financial data providers and central banks, and they typically update their rates at regular intervals, from every few minutes to once a day. For most consumer-facing tools, a rate that is updated daily is sufficient, but for high-frequency trading applications, real-time data is critical.
                    </p>
                
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
                className="text-emerald-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default LiveCurrencyConverterArticle;