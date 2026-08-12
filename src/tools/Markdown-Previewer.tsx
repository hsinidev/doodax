import React, { useState, useMemo } from 'react';

// --- Pure JavaScript Markdown Parser ---
// This is a simplified parser for demonstration. It handles common cases.
const parseMarkdown = (markdown: string): string => {
    let html = markdown;

    // Block-level elements
    // Headers (h1-h6)
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Unordered Lists
    html = html.replace(/^\* (.*$)/gim, '<ul>\n<li>$1</li>\n</ul>');
    html = html.replace(/^\- (.*$)/gim, '<ul>\n<li>$1</li>\n</ul>');
    // Consolidate adjacent lists
    html = html.replace(/<\/ul>\n<ul>/g, '');

    // Ordered Lists
    html = html.replace(/^\d+\. (.*$)/gim, '<ol>\n<li>$1</li>\n</ol>');
    // Consolidate adjacent lists
    html = html.replace(/<\/ol>\n<ol>/g, '');

    // Code Blocks (```...```) - handles multiline
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline elements
    // Bold (**...** or __...__)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic (*...* or _..._)
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Links ([text](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Inline code (`...`)
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Paragraphs (handle remaining newlines)
    html = html.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');
    // Cleanup paragraphs inside other block elements
    html = html.replace(/<p><(h[1-6]|ul|ol|li|blockquote|pre)>/g, '<$1>');
    html = html.replace(/<\/(h[1-6]|ul|ol|li|blockquote|pre)><\/p>/g, '</$1>');


    return html;
};

const defaultMarkdown = `# Welcome to the Markdown Previewer!

This is a real-time previewer built with **Pure JavaScript** and **React**.

## Features
- **Instant Updates:** See your rendered HTML as you type.
- **Pure JavaScript:** No heavy libraries, just fast, native parsing.
- **Tailwind Styling:** The output is styled with Tailwind's typography plugin.

### Examples

*   Unordered List Item 1
*   Unordered List Item 2

1.  Ordered List Item 1
2.  Ordered List Item 2

> This is a blockquote. It's great for highlighting important text.

Check out this inline code: \`const example = "hello world";\`

Or this code block:
\`\`\`javascript
function greet() {
  console.log("Hello, Markdown!");
}
greet();
\`\`\`

[Visit Doodax Home](/) for more tools.`;

const MarkdownPreviewer: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>(defaultMarkdown);

    const processedHtml = useMemo(() => {
        // SECURITY NOTE: We are using dangerouslySetInnerHTML, which can be risky if the
        // HTML is not properly sanitized. Our custom parser is basic and aims to produce
        // safe HTML from Markdown syntax, but a production-grade library like 'marked'
        // or 'DOMPurify' would be recommended for handling untrusted user input to
        // prevent XSS (Cross-Site Scripting) attacks.
        return parseMarkdown(markdown);
    }, [markdown]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Markdown Previewer</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
                {/* Input Pane */}
                <div className="flex flex-col h-full">
                    <label htmlFor="markdown-input" className="block text-sm font-medium text-gray-300 mb-2">Markdown Input</label>
                    <textarea
                        id="markdown-input"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="w-full flex-grow bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-none"
                        aria-label="Markdown Input"
                    />
                </div>

                {/* Output Pane */}
                <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2">HTML Preview</label>
                    <div
                        className="w-full flex-grow bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md overflow-y-auto prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-code:text-yellow-300 prose-blockquote:border-l-cyan-400"
                        dangerouslySetInnerHTML={{ __html: processedHtml }}
                        aria-label="HTML Preview"
                    />
                </div>
            </div>
        </div>
    );
};

export default MarkdownPreviewer;
