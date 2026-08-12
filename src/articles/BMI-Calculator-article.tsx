import React from 'react';

const BmiCalculatorArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
            <h2>Understanding Body Mass Index (BMI) and How It's Calculated</h2>
            <p>
                Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is used to provide a general measure of body fatness and is widely used as a screening tool to identify potential weight problems in adults. While it's not a perfect diagnostic tool, it provides a useful starting point for assessing a person's weight status.
            </p>

            <h3>The BMI Formula</h3>
            <p>
                The calculation for BMI is the same for both men and women. It can be calculated using either metric or imperial units.
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Metric Units:</strong> <code>BMI = weight (kg) / [height (m)]^2</code></li>
                <li><strong>Imperial Units:</strong> <code>BMI = 703 * weight (lbs) / [height (in)]^2</code></li>
            </ul>
            <p>
                A BMI calculator automates this math, allowing you to quickly get your result without manual conversion or calculation.
            </p>

            <h3>Interpreting the Results</h3>
            <p>
                For adults, the resulting BMI number is interpreted using a set of standard weight status categories. These categories are the same for people of all ages and for both sexes.
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Below 18.5:</strong> Underweight</li>
                <li><strong>18.5 – 24.9:</strong> Normal weight</li>
                <li><strong>25.0 – 29.9:</strong> Overweight</li>
                <li><strong>30.0 and Above:</strong> Obesity</li>
            </ul>

            <h3>Limitations of BMI</h3>
            <p>
                It's important to remember that BMI is a screening tool, not a definitive measure of health. It has some limitations. For example, it does not distinguish between fat and muscle mass. A very muscular athlete may have a high BMI that classifies them as "overweight" even though they have a very low body fat percentage. It also doesn't account for factors like age, sex, or body frame. However, for the general population, it remains a useful and easy-to-calculate indicator of potential health risks associated with weight.
            </p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default BmiCalculatorArticle;