import React from 'react';

const FOIARequestGeneratorArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
            <h2>The Freedom of Information Act (FOIA): Your Right to Access Government Records</h2>
            <p>
                The Freedom of Information Act (FOIA) is a federal law that gives you the right to access information from the federal government. It is often described as "the law that keeps citizens in the know about their government." Enacted in 1967, FOIA establishes a presumption that records in the possession of executive branch agencies of the U.S. federal government are accessible to the people.
            </p>

            <h3>Who Can File a FOIA Request?</h3>
            <p>
                Any person can file a FOIA request, including U.S. citizens, foreign nationals, organizations, associations, and universities. The act is not limited to journalists or researchers.
            </p>
            <p>
                FOIA applies to federal executive branch departments, agencies, and offices. It does not apply to Congress, the federal courts, or state and local governments (though states have their own public records laws).
            </p>

            <h3>How to Write an Effective FOIA Request</h3>
            <p>
                A well-written request is more likely to be processed quickly and yield the records you are seeking. A generator tool can help you structure the letter, which should include several key elements:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Clear Statement:</strong> Begin by stating that your request is being made under the Freedom of Information Act.</li>
                <li><strong>Agency Identification:</strong> Address your request to the specific agency you believe has the records.</li>
                <li><strong>Detailed Description of Records:</strong> This is the most crucial part. You must "reasonably describe" the records you are seeking. Be as specific as possible about the subject matter, date range, and any other details that can help the agency locate the files. A request that is too broad may be rejected.</li>
                <li><strong>Fee Willingness Statement:</strong> Agencies are permitted to charge fees for search, review, and duplication. It's standard practice to state how much you are willing to pay (e.g., up to $25) before being contacted. You can also request a fee waiver if you can demonstrate that the public interest is the primary purpose of your request.</li>
            </ul>
            <p>
                After sending your request, the agency is typically required to respond within 20 business days, though complex requests may take longer.
            </p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default FOIARequestGeneratorArticle;