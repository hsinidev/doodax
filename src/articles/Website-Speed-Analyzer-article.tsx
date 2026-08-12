import React, { useState } from 'react';

const WebsiteSpeedAnalyzerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
                    <h2>The Importance of Core Web Vitals (LCP, INP, CLS) for Modern SEO</h2>
                    <p>
                        In the competitive landscape of the modern web, website performance is no longer just a technical concern—it's a critical factor for business success, user satisfaction, and search engine optimization (SEO). Google has made it clear that user experience is paramount, and to quantify this, they introduced Core Web Vitals. These are a specific set of metrics that measure real-world user experience for loading performance, interactivity, and visual stability of a webpage. A strong performance in Core Web Vitals can lead to higher search rankings, lower bounce rates, and increased conversions. This guide delves into the three pillars of Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS), explaining what they measure and why they are indispensable for modern SEO strategy.
                    </p>

                    <h3>Largest Contentful Paint (LCP): Measuring Loading Performance</h3>
                    <p>
                        Largest Contentful Paint (LCP) measures the time it takes for the largest single element (typically an image, video, or a large block of text) to become visible within the user's viewport. In simple terms, it marks the point in the page load timeline when the main content has likely loaded. A fast LCP reassures the user that the page is useful and loading correctly. Google recommends an LCP of 2.5 seconds or less to provide a good user experience. Anything over 4 seconds is considered poor.
                    </p>
                    <p>
                        Common causes of a slow LCP include slow server response times, render-blocking JavaScript and CSS, large image files, and slow resource load times. Optimizing these elements by using a Content Delivery Network (CDN), compressing images, deferring non-critical CSS and JS, and upgrading your hosting plan are effective strategies to improve your LCP score and, consequently, your site's perceived loading speed.
                    </p>

                    <h3>Interaction to Next Paint (INP): Measuring Responsiveness</h3>
                    <p>
                        Interaction to Next Paint (INP) is the newest Core Web Vital, replacing First Input Delay (FID). It assesses a page's overall responsiveness to user interactions. INP measures the time from when a user interacts with the page (like clicking a button, tapping on a mobile screen, or typing in a field) until the browser paints the next frame, showing a visual response to that interaction. A low INP means the page feels snappy and responsive. Google's threshold for a good INP is 200 milliseconds or less.
                    </p>
                    <p>
                        High INP is often caused by a busy main thread, where the browser is tied up executing long tasks, typically from complex JavaScript. This prevents it from responding quickly to user input. To improve INP, developers should focus on breaking up long JavaScript tasks, reducing the amount of JavaScript that runs on page load, and using techniques like web workers to offload heavy computations from the main thread. A responsive interface is crucial for preventing user frustration and ensuring a smooth interactive experience.
                    </p>
                    
                    <h3>Cumulative Layout Shift (CLS): Measuring Visual Stability</h3>
                    <p>
                        Cumulative Layout Shift (CLS) measures the visual stability of a page by quantifying how much its content unexpectedly shifts during the loading process. We've all experienced this: you try to click a button, but an ad loads above it at the last second, pushing the button down and causing you to click the ad instead. This is a frustrating experience caused by a high CLS. The score is calculated based on the size of the unstable elements and the distance they move. A good CLS score is 0.1 or less.
                    </p>
                    <p>
                        The primary culprits for a high CLS are images, ads, or iframes without specified dimensions, as well as content that is injected dynamically above existing content. To fix this, always include `width` and `height` attributes on your image and video elements, reserve space for ads and embeds with CSS, and avoid inserting new content above existing content unless it's in response to a user interaction. Ensuring a stable layout builds user trust and makes the site feel more professional and reliable.
                    </p>
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

export default WebsiteSpeedAnalyzerArticle;