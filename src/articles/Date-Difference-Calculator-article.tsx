import React, { useState } from 'react';

const DateDifferenceCalculatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
                    <h2>Calculating the Duration Between Two Dates</h2>
                    <p>
                        A date difference calculator is a tool that measures the amount of time that has passed between two dates. It can provide the result in various units, such as days, weeks, months, or years. This is a common requirement for project planning, event countdowns, calculating ages, or determining deadlines.
                    </p>

                    <h3>The Calculation Method</h3>
                    <p>
                        The most accurate way to calculate the difference is to work with the total number of days. In JavaScript, a <code>Date</code> object can be converted into a timestamp, which is the number of milliseconds that have passed since the Unix Epoch (January 1, 1970).
                    </p>
                    <ol className="list-decimal list-inside">
                        <li>Get the timestamps for the start and end dates.</li>
                        <li>Subtract the start timestamp from the end timestamp to get the difference in milliseconds.</li>
                        <li>Convert this millisecond difference into days by dividing by the number of milliseconds in a day (1000 * 60 * 60 * 24).</li>
                    </ol>
                    <p>
                        Once you have the total number of days, you can easily derive other units. The number of weeks is the total days divided by 7. Calculating the exact number of months and years is more complex due to the varying lengths of months and leap years, but a simplified estimation can be made for display purposes.
                    </p>

                    <h3>Common Use Cases</h3>
                    <ul className="list-disc pl-5">
                        <li><strong>Project Management:</strong> Determine the total duration of a project or the number of days remaining until a deadline.</li>
                        <li><strong>Event Planning:</strong> Create a countdown to a wedding, vacation, or other significant event.</li>
                        <li><strong>Age Calculation:</strong> Find out the precise number of days, weeks, or months someone has been alive.</li>
                        <li><strong>Logistics:</strong> Calculate shipping times or contract durations.</li>
                    </ul>
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

export default DateDifferenceCalculatorArticle;