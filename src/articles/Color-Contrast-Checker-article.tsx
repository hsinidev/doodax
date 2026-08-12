import React, { useState } from 'react';

const ColorContrastCheckerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
                    <h2>Understanding WCAG 2.1 Color Contrast Guidelines for Web Accessibility (AA vs. AAA)</h2>
                    <p>
                        Web accessibility (often abbreviated as a11y) is the practice of designing and developing websites, tools, and technologies so that people with disabilities can use them. One of the most critical and often overlooked aspects of accessibility is color contrast. For users with visual impairments, such as color blindness or low vision, insufficient contrast between text and its background can make content difficult or impossible to read. The Web Content Accessibility Guidelines (WCAG) provide a clear, testable set of standards to ensure content is legible for everyone.
                    </p>

                    <h3>What is Color Contrast and Why is it Important?</h3>
                    <p>
                        Color contrast is the difference in luminance, or brightness, between two colors. This is expressed as a ratio, ranging from 1:1 (white on white) to 21:1 (black on white). A higher ratio means greater contrast. Good contrast is essential because it directly impacts readability. While a person with perfect vision might be able to read light gray text on a white background, someone with moderately low vision would likely see it as a blur. By adhering to established contrast standards, we can create digital experiences that are inclusive and usable by the widest possible audience.
                    </p>

                    <h3>Decoding WCAG 2.1 Compliance: AA vs. AAA</h3>
                    <p>
                        WCAG 2.1 defines two main levels of conformance for contrast: AA and AAA. Level AA is the widely accepted standard that most websites and applications aim to meet, while Level AAA is a stricter standard for enhanced accessibility. The required ratio depends on the size of the text.
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Level AA (Minimum Compliance):</strong>
                            <ul className="list-disc pl-8">
                                <li><strong>Normal Text:</strong> Requires a contrast ratio of at least <strong>4.5:1</strong>.</li>
                                <li><strong>Large Text:</strong> Requires a contrast ratio of at least <strong>3:1</strong>. (Large text is defined as 18pt/24px or 14pt/18.5px if bold).</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Level AAA (Enhanced Compliance):</strong>
                             <ul className="list-disc pl-8">
                                <li><strong>Normal Text:</strong> Requires a contrast ratio of at least <strong>7:1</strong>.</li>
                                <li><strong>Large Text:</strong> Requires a contrast ratio of at least <strong>4.5:1</strong>.</li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Achieving Level AA is a necessary goal for most public-facing web content. Level AAA provides a superior user experience for those with vision loss and is often a goal for government websites or organizations focused on accessibility.
                    </p>
                    
                    <h3>The Science Behind the Ratio: Relative Luminance</h3>
                    <p>
                        The contrast ratio is not just a subjective measure; it's calculated using a precise formula defined by WCAG. The formula is based on the **relative luminance** of the foreground and background colors. Relative luminance is a measure of the perceived brightness of a color, calculated from its red, green, and blue (RGB) values. The formula gives more weight to green than to red and blue, which aligns with how the human eye perceives brightness.
                    </p>
                    <p>
                        The contrast ratio is then calculated as <code>(L1 + 0.05) / (L2 + 0.05)</code>, where <code>L1</code> is the relative luminance of the lighter color and <code>L2</code> is the relative luminance of the darker color. A color contrast checker automates this entire process, allowing designers and developers to instantly verify whether their color choices are accessible without having to perform complex manual calculations. This makes it an essential tool for building an inclusive web.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-cyan-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default ColorContrastCheckerArticle;