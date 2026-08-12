import React from 'react';

const AgeCalculatorArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-pink-400">
            <h2>The Logic Behind Calculating a Precise Age</h2>
            <p>
                Calculating someone's age seems simple at first glance—just subtract the birth year from the current year. However, to get a precise age in years, months, and days, the logic becomes more nuanced. An age calculator handles these complexities to provide an accurate result, accounting for month lengths and the position of the current day relative to the birth day.
            </p>

            <h3>The Calculation Steps</h3>
            <p>
                A robust age calculation algorithm typically follows these steps:
            </p>
            <ol className="list-decimal list-inside">
                <li><strong>Calculate the initial difference:</strong> Start by subtracting the birth year, month, and day from the current year, month, and day.</li>
                <li><strong>Borrow from months if days are negative:</strong> If the current day of the month is less than the birth day (e.g., today is the 15th, birthday is the 20th), the day difference will be negative. To correct this, you "borrow" one month, decreasing the month count by one and adding the number of days in the previous month to the day count.</li>
                <li><strong>Borrow from years if months are negative:</strong> Similarly, if the resulting month count is negative, you borrow one year, decreasing the year count by one and adding 12 to the month count.</li>
            </ol>
            <p>
                This process of "borrowing" ensures that the final result accurately reflects the time that has passed. For example, if you were born on March 30th and today is April 2nd, the calculator correctly identifies that only a few days have passed, not a full month.
            </p>
        </article>
    );
};

export default AgeCalculatorArticle;