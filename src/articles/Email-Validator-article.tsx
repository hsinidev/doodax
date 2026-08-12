import React, { useState } from 'react';

const EmailValidatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>The Role of Regular Expressions in Email Validation and Why Format Checkers are Not Deliverability Testers</h2>
                    <p>
                        Email validation is a fundamental requirement for almost any web form, from user registration to contact inquiries. It ensures that the data collected is in a usable format, reducing errors and improving data quality. The first line of defense in this process is client-side validation, which provides instant feedback to the user. The workhorse behind this instant check is almost always a Regular Expression (Regex). However, it's critically important to understand what this type of validation can and cannot do. A Regex can confirm that an email address *looks* correct, but it can't tell you if it actually *exists*.
                    </p>

                    <h3>Breaking Down an Email Address</h3>
                    <p>
                        To validate an email, a Regex pattern is designed to check its structure, which consists of two main parts separated by an <code>@</code> symbol:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>The Local Part:</strong> This is the part before the <code>@</code> symbol (e.g., <code>username</code>). It can contain a combination of letters, numbers, and certain special characters like dots, hyphens, and plus signs.</li>
                        <li><strong>The Domain Part:</strong> This is the part after the <code>@</code> symbol (e.g., <code>example.com</code>). It must contain at least one dot, and the final part, the Top-Level Domain (TLD), must be at least two characters long (e.g., <code>.com</code>, <code>.net</code>, <code>.io</code>).</li>
                    </ul>
                    <p>A robust Regex for email validation will enforce these rules, checking for the presence of the <code>@</code> symbol, ensuring the local and domain parts are not empty, and verifying that the TLD has a valid length. This catches common typos like missing the <code>@</code> symbol, using spaces, or forgetting the <code>.com</code> suffix.</p>

                    <h3>The Limits of Client-Side Validation</h3>
                    <p>
                        While a Regex-based format checker is an essential tool for good user experience, its limitations must be understood. A client-side email validator performs a **syntactical check**, not a **verification check**. This means:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li><strong>It cannot check if a domain exists.</strong> An email like <code>user@nonexistent-domain-123.com</code> will pass a Regex check because its format is correct, even though the domain isn't real.</li>
                        <li><strong>It cannot check if a mailbox exists.</strong> Similarly, <code>fake-user-123@gmail.com</code> is a perfectly formatted email address, but the validator has no way of knowing if that specific mailbox has been created at Google.</li>
                        <li><strong>It cannot confirm deliverability.</strong> An email address might exist but be unable to receive mail due to a full inbox, a misconfigured server, or other issues.</li>
                    </ol>
                    
                    <h3>Format Checkers vs. Deliverability Testers</h3>
                    <p>
                        A tool like this one is a **format checker**. It's designed to be a quick, client-side utility that helps users avoid simple mistakes when filling out a form. It's a UX tool. A **deliverability tester**, on the other hand, is a much more complex, server-side service. To verify an email, such a service would perform a series of checks, including a DNS lookup to see if the domain has valid MX (Mail Exchanger) records and sometimes even attempting a connection to the mail server to see if it acknowledges the local part (the username). These services are used for cleaning mailing lists and are far beyond the scope of a simple client-side validator. Recognizing this distinction is key to building secure and effective systems.
                    </p>
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

export default EmailValidatorArticle;