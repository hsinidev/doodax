
import React from 'react';

const USPublicHolidayCalendarArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-pink-400">
            <h2>Navigating the U.S. Federal Holiday Calendar</h2>
            <p>
                The United States observes a set of federal holidays each year, which are established by law. On these days, non-essential federal government offices are closed, and every federal employee is paid for the day off. While private-sector employers are not required to observe these holidays, many do. A calendar of these dates is essential for planning work schedules, vacations, and business operations.
            </p>

            <h3>Fixed vs. Floating Holidays</h3>
            <p>
                U.S. federal holidays can be divided into two categories:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Fixed-Date Holidays:</strong> These holidays always fall on the same calendar date each year, such as New Year's Day (January 1), Juneteenth (June 19), Independence Day (July 4), Veterans Day (November 11), and Christmas Day (December 25). If they fall on a weekend, they are typically observed on the nearest weekday.</li>
                <li><strong>Floating Holidays:</strong> Most federal holidays are "floating," meaning they are observed on a particular day of the week in a given month. For example, Martin Luther King, Jr. Day is always on the third Monday of January, and Thanksgiving is always on the fourth Thursday of November.</li>
            </ul>

            <h3>Calculating Floating Holidays</h3>
            <p>
                A tool that displays holidays for the current year uses date-based logic to calculate the correct date for these floating holidays. For example, to find Labor Day (the first Monday in September), the algorithm would start at September 1st of the current year, check what day of the week it is, and then advance day by day until it finds the first Monday. This programmatic approach ensures the calendar is always accurate for any given year.
            </p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default USPublicHolidayCalendarArticle;
