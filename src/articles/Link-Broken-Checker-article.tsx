import React, { useState } from 'react';

const LinkBrokenCheckerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-pink-400">
                    <h2>The Importance of Checking for Broken Links, the Role of HTTP Status Codes in SEO, and Why Server-Side Requests are Necessary</h2>
                    <p>
                        Maintaining a healthy website involves more than just creating great content; it also requires regular technical maintenance. One of the most common and detrimental issues a site can suffer from is "link rot"—the gradual decay of links that become broken over time. Broken links, which typically lead to 404 "Not Found" errors, create a frustrating user experience and can negatively impact your site's SEO. Understanding the HTTP status codes that define the health of a link, and why a server-side tool is necessary to check them, is a fundamental skill for any website owner.
                    </p>

                    <h3>HTTP Status Codes and Their SEO Impact</h3>
                    <p>
                        Every time your browser requests a web page, the server responds with an HTTP status code. These three-digit codes are grouped into families, each signaling a different type of outcome:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>2xx (Success):</strong> Codes like <strong>200 OK</strong> mean the request was successful and the server is providing the requested page. This is the ideal state for all your healthy links.</li>
                        <li><strong>3xx (Redirection):</strong> Codes like <strong>301 Moved Permanently</strong> indicate that the requested resource has been moved to a new URL. While not an error, having long redirect chains can slow down your site and dilute link equity.</li>
                        <li><strong>4xx (Client Error):</strong> This family indicates a problem with the request itself. The most famous is the <strong>404 Not Found</strong> error, which tells users and search engines that the page doesn't exist. A high number of 404 errors on your site signals to search engines that it is poorly maintained, which can harm your rankings. Another common one is <strong>403 Forbidden</strong>, meaning you don't have permission to view the page.</li>
                        <li><strong>5xx (Server Error):</strong> Codes like <strong>500 Internal Server Error</strong> or <strong>503 Service Unavailable</strong> indicate a problem on the server's end. These are critical errors that make your content inaccessible and should be fixed immediately.</li>
                    </ul>
                    <p>Regularly checking for and fixing 4xx and 5xx errors is essential for both user experience and SEO.</p>

                    <h3>Why a Server-Side Check is Necessary</h3>
                    <p>
                        You might wonder why a special tool is needed to check a link's status. Can't the browser just do it? The answer lies in a web security policy called the **Cross-Origin Resource Sharing (CORS)** policy. For security reasons, web browsers are heavily restricted from making requests to a different domain (a different "origin") than the one the web page is hosted on.
                    </p>
                    <p>
                        If you tried to check an external link (e.g., from `your-tool.com` to `externalsite.com`) directly from the browser using JavaScript, the browser would block the request unless `externalsite.com` explicitly configured its server to allow requests from `your-tool.com`. Since most websites do not do this, client-side link checking is unreliable for any external links.
                    </p>
                     <p>
                        A server-side tool, like this one using a Next.js API Route, bypasses this limitation. The request is not made from your browser, but from the web server where the tool is hosted. Servers are not bound by the same CORS restrictions as browsers, allowing them to make requests to any other server on the internet and reliably retrieve the HTTP status code. This makes a server-side checker the only robust way to test the status of any link on the web.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-pink-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default LinkBrokenCheckerArticle;