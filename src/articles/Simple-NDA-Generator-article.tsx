import React from 'react';

const SimpleNdaGeneratorArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
            <h2>What is a Non-Disclosure Agreement (NDA) and When Should You Use One?</h2>
            <p>
                A Non-Disclosure Agreement, or NDA, is a legally binding contract between two or more parties that outlines confidential material, knowledge, or information that the parties wish to share with one another for certain purposes, but wish to restrict access to by third parties. It's a formal way of saying, "What we discuss here, stays here." NDAs are a common and critical part of doing business, used to protect sensitive information like trade secrets, business plans, and proprietary technology.
            </p>

            <h3>Key Components of a Simple NDA</h3>
            <p>
                While NDAs can be complex, a simple, one-way agreement typically includes a few core elements:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Identification of Parties:</strong> The agreement must clearly name the "Disclosing Party" (the one sharing the information) and the "Receiving Party" (the one receiving it).</li>
                <li><strong>Definition of Confidential Information:</strong> This section defines what is considered confidential. It can be broad or specific, but it should clearly outline the scope of the protected information.</li>
                <li><strong>Obligations of the Receiving Party:</strong> This is the heart of the NDA. It states that the Receiving Party must keep the information secret and cannot use it for any purpose other than the one specified in the agreement.</li>
                <li><strong>Term:</strong> This defines how long the agreement is in effect. A typical term is 1-5 years.</li>
            </ul>

            <h3>When to Use an NDA</h3>
            <p>
                You should consider using an NDA whenever you are about to share confidential information with another party, such as:
            </p>
            <ul className="list-disc pl-5">
                <li>Discussing a new business idea with a potential partner or investor.</li>
                <li>Hiring a contractor or freelancer who will have access to your company's internal data.</li>
                <li>Showing a prototype of a new product to a potential client.</li>
                <li>Engaging in merger or acquisition talks.</li>
            </ul>
            
            <h3>Important Legal Disclaimer</h3>
            <p>
                The NDA generator on this site provides a very basic, simplified template for informational purposes only. It is **not** a substitute for professional legal advice. The law governing NDAs can be complex and varies by jurisdiction. Before using an NDA for any real business transaction, you should always consult with a qualified attorney to ensure the agreement is valid, enforceable, and tailored to your specific situation.
            </p>
        </article>
    );
};

export default SimpleNdaGeneratorArticle;