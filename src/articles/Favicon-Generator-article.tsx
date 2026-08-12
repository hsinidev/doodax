import React, { useState } from 'react';

const FaviconGeneratorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
                    <h2>The Importance of Favicons for Branding and UX, Why Multiple Sizes are Necessary (Web, Apple Touch, Android), and Best Practices for Favicon Design</h2>
                    <p>
                        A favicon—short for "favorite icon"—is the small, iconic image that represents your website in browser tabs, bookmarks, and history. While it may seem like a minor detail, the favicon is a powerful and essential element of a website's branding and user experience. It acts as a visual anchor, making it easy for users to identify your site at a glance among a sea of open tabs. A well-designed favicon reinforces brand identity, adds a layer of professionalism, and enhances usability. Understanding its role and the need for multiple sizes is key to implementing it correctly across all modern platforms.
                    </p>

                    <h3>More Than Just a Small Image: Branding and UX</h3>
                    <p>
                        The primary role of a favicon is to provide a quick, visual identifier for your website. In today's multi-tab browsing environment, users often have dozens of tabs open. A distinctive favicon allows them to locate your site's tab instantly, improving navigation and user retention. This small graphic is a constant, subtle reinforcement of your brand. When a user bookmarks your page, your favicon appears in their bookmarks list, creating a persistent visual connection to your brand. The absence of a favicon, on the other hand, can make a site appear unprofessional or incomplete.
                    </p>

                    <h3>Why One Size Doesn't Fit All: Web, Apple Touch, and Android</h3>
                    <p>
                        The world of favicons has evolved far beyond the original 16x16 pixel `favicon.ico` file. Different devices and operating systems require different sizes and formats to display your site's icon correctly in various contexts, such as a high-resolution "Retina" screen or a home screen shortcut on a smartphone.
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Standard Web Favicons:</strong> Modern browsers are flexible, but it's best practice to provide several sizes to ensure sharpness on all displays. Common sizes include 16x16, 32x32, and 48x48 pixels. These are typically referenced in the `head` of your HTML document.</li>
                        <li><strong>Apple Touch Icons:</strong> When a user saves your website to their home screen on an iPhone or iPad, iOS looks for an "apple-touch-icon." These are higher resolution icons, with 180x180 pixels being the current standard size for modern iPhones. Without this specific icon, iOS may use a generic, less appealing screenshot of your page.</li>
                        <li><strong>Android Chrome Icons:</strong> Similar to Apple, Android also uses higher-resolution icons when a user adds a site to their home screen. The recommended sizes often range from 192x192 to 512x512 pixels. These larger icons are also used by Progressive Web Apps (PWAs) for their app-like appearance.</li>
                    </ul>
                    <p>
                        Providing a comprehensive set of these icons ensures a consistent and high-quality brand representation, no matter how a user interacts with your site.
                    </p>
                    
                    <h3>Best Practices for Favicon Design</h3>
                    <p>
                        Creating an effective favicon requires simplifying your brand's essence into a tiny square. Here are some key design principles:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Simplicity is Key:</strong> A favicon is viewed at a very small size. Complex designs or detailed text will become an unrecognizable blur. A simple logo mark, a single letter, or an abstract symbol works best.</li>
                        <li><strong>High Contrast:</strong> Your favicon will appear on light, dark, and gray browser tabs. Ensure your design is legible against different backgrounds. Using a transparent background for PNG favicons can help them adapt.</li>
                        <li><strong>Use Brand Colors:</strong> Incorporate your brand's color palette to maintain consistency and reinforce brand recognition.</li>
                        <li><strong>Avoid Words:</strong> Unless your brand name is extremely short (1-3 letters), avoid using words. They will be unreadable at 16x16 pixels.</li>
                        <li><strong>Test It:</strong> Once you have a design, test it in a real browser. See how it looks in a tab, in your bookmarks, and against different backgrounds to ensure it's effective.</li>
                    </ul>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-rose-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default FaviconGeneratorArticle;