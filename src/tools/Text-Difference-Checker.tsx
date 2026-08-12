import React, { useState, useMemo } from 'react';

// This component assumes the diff_match_patch library is loaded via a CDN script tag
// in index.html, making the `diff_match_patch` class globally available.
declare const diff_match_patch: any;
declare const DIFF_DELETE: number;
declare const DIFF_INSERT: number;
declare const DIFF_EQUAL: number;


// --- Core Diff Logic ---

/**
 * Calculates the difference between two texts and generates styled HTML for display.
 * @param originalText The original text.
 * @param modifiedText The modified text.
 * @returns An object containing two HTML strings for the original and modified panes.
 */
const calculateDiffHtml = (originalText: string, modifiedText: string): { originalHtml: string; modifiedHtml: string } => {
    if (typeof diff_match_patch === 'undefined') {
        const errorHtml = '<span class="text-red-400">Error: Diff library not loaded.</span>';
        return { originalHtml: errorHtml, modifiedHtml: errorHtml };
    }

    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(originalText, modifiedText);
    dmp.diff_cleanupSemantic(diff);

    let originalHtml = '';
    let modifiedHtml = '';

    const escapeHtml = (text: string) => 
        text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\n/g, '<br>');

    for (const [op, data] of diff) {
        const text = escapeHtml(data);
        switch (op) {
            case DIFF_INSERT: // Added
                modifiedHtml += `<span class="bg-green-500/20">${text}</span>`;
                break;
            case DIFF_DELETE: // Deleted
                originalHtml += `<span class="bg-red-500/20">${text}</span>`;
                break;
            case DIFF_EQUAL: // Unchanged
                originalHtml += text;
                modifiedHtml += text;
                break;
        }
    }

    return { originalHtml, modifiedHtml };
};


// --- Main Component ---
const TextDifferenceChecker: React.FC = () => {
    const [originalText, setOriginalText] = useState<string>('This is the original line.\nThis line will be removed.\nThis line remains the same.');
    const [modifiedText, setModifiedText] = useState<string>('This is the original line, but modified.\nThis line remains the same.\nAnd this is a new line.');

    const { originalHtml, modifiedHtml } = useMemo(() => {
        return calculateDiffHtml(originalText, modifiedText);
    }, [originalText, modifiedText]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Text Difference Checker</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
                {/* Input Panes */}
                <div className="flex flex-col h-full">
                    <label htmlFor="original-text" className="block text-sm font-medium text-gray-300 mb-2">Original Text</label>
                    <textarea
                        id="original-text"
                        value={originalText}
                        onChange={(e) => setOriginalText(e.target.value)}
                        className="w-full flex-grow bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-none"
                        aria-label="Original Text Input"
                    />
                </div>
                <div className="flex flex-col h-full">
                    <label htmlFor="modified-text" className="block text-sm font-medium text-gray-300 mb-2">Modified Text</label>
                    <textarea
                        id="modified-text"
                        value={modifiedText}
                        onChange={(e) => setModifiedText(e.target.value)}
                        className="w-full flex-grow bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-none"
                        aria-label="Modified Text Input"
                    />
                </div>
            </div>

             {/* Output Panes */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 h-[70vh]">
                <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Difference (Original)</label>
                    <div
                        className="w-full flex-grow bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md overflow-y-auto font-mono whitespace-pre-wrap break-all"
                        // SECURITY NOTE: This is safe in this context because the diff library produces
                        // simple <span> tags and the content is escaped, mitigating XSS risks.
                        dangerouslySetInnerHTML={{ __html: originalHtml }}
                        aria-label="Original Text Difference"
                    />
                </div>
                 <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Difference (Modified)</label>
                    <div
                        className="w-full flex-grow bg-gray-800/50 p-4 border-2 border-gray-700 rounded-md overflow-y-auto font-mono whitespace-pre-wrap break-all"
                        dangerouslySetInnerHTML={{ __html: modifiedHtml }}
                        aria-label="Modified Text Difference"
                    />
                </div>
            </div>
        </div>
    );
};

export default TextDifferenceChecker;