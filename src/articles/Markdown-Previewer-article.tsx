import React, { useState } from 'react';

const MarkdownPreviewerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-60 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-purple-400">
                    <h2>The Benefits of Markdown for Documentation, Why Previewers are Essential, and the Use of Libraries for Safe HTML Rendering</h2>
                    <p>
                        In the world of software development, technical writing, and content creation, Markdown has emerged as an indispensable tool. It's a lightweight markup language that allows you to format plain text using a simple, intuitive syntax. Its primary advantage is readability; a Markdown file is perfectly legible as plain text without any special rendering. This simplicity has made it the standard for everything from README files on GitHub to blog posts and internal documentation. However, to see the final, styled output, a Markdown previewer is an essential part of the modern developer's workflow.
                    </p>

                    <h3>Why Markdown is the Standard for Documentation</h3>
                    <p>
                        The power of Markdown lies in its focus on content over presentation. Instead of wrestling with complex formatting buttons in a word processor, a writer can focus entirely on the text, using simple characters to denote headings (<code>#</code>), bold text (<code>**...**</code>), lists (<code>* ...</code>), and other common elements. This approach offers several key benefits:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Portability:</strong> Markdown is just text, making it platform-agnostic. It can be opened and edited in any text editor on any operating system.</li>
                        <li><strong>Version Control Friendly:</strong> Because it's plain text, changes can be easily tracked using version control systems like Git. This is a massive advantage over binary formats like <code>.docx</code>.</li>
                        <li><strong>Ease of Learning:</strong> The syntax is so simple that most people can learn the basics in under five minutes.</li>
                        <li><strong>Separation of Concerns:</strong> The raw Markdown file contains the content, while its presentation (the CSS styling) is handled separately. This makes it easy to restyle content without having to edit the source document.</li>
                    </ul>

                    <h3>The Essential Role of a Real-Time Previewer</h3>
                    <p>
                        While Markdown is readable in its raw form, a previewer is crucial for ensuring the final output is correct. A real-time, split-screen previewer provides immediate visual feedback as you type. This is incredibly valuable for catching syntax errors, checking the layout of complex documents, and verifying that links and images are working correctly. For authors, this instant feedback loop eliminates the need to constantly save and re-render the file, dramatically speeding up the writing and editing process. It bridges the gap between the simplicity of plain text and the richness of styled HTML.
                    </p>
                    
                    <h3>Safe HTML Rendering and the Risk of XSS</h3>
                    <p>
                        A Markdown parser's job is to convert Markdown syntax into HTML. This HTML is then rendered by the browser. However, this process carries a significant security risk if not handled carefully. If a parser allows raw HTML to be included in the Markdown, a malicious user could inject a <code>&lt;script&gt;</code> tag, leading to a Cross-Site Scripting (XSS) attack. This could allow an attacker to steal user data or perform unauthorized actions.
                    </p>
                    <p>
                        This is why safely rendering HTML is so important. In React, the <code>dangerouslySetInnerHTML</code> attribute is used to render HTML strings. As its name implies, it should be used with extreme caution. The content passed to it must be sanitized to remove any potentially harmful scripts or attributes. While a custom parser might handle basic cases, production-grade applications should rely on battle-tested libraries like <code>marked</code> combined with a sanitizer like <code>DOMPurify</code>. These libraries are specifically designed to parse Markdown and strip out any malicious code, ensuring that the final HTML is safe to render. This layered approach allows developers to provide a rich preview experience without compromising application security.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-purple-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default MarkdownPreviewerArticle;