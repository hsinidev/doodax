import React, { useState, useMemo, useCallback } from 'react';

// --- TypeScript Interfaces ---
interface RobotsConfig {
    userAgent: string;
    disallowPaths: string[];
    sitemapUrl: string;
}

// --- Core Logic ---
const generateRobotsTxt = (config: RobotsConfig): string => {
    let content = `User-agent: ${config.userAgent}\n`;

    config.disallowPaths.forEach(path => {
        if (path.trim()) {
            content += `Disallow: ${path.trim()}\n`;
        }
    });

    if (config.sitemapUrl.trim()) {
        content += `\nSitemap: ${config.sitemapUrl.trim()}\n`;
    }

    return content;
};

// --- Main Component ---
const RobotsTxtGenerator: React.FC = () => {
    const [disallowInput, setDisallowInput] = useState<string>('/admin/\n/tmp/\n/private/');
    const [sitemapUrl, setSitemapUrl] = useState<string>('https://www.example.com/sitemap.xml');
    const [userAgent, setUserAgent] = useState<string>('*');

    const config: RobotsConfig = useMemo(() => ({
        userAgent,
        disallowPaths: disallowInput.split('\n').filter(path => path.trim() !== ''),
        sitemapUrl,
    }), [userAgent, disallowInput, sitemapUrl]);

    const generatedContent = useMemo(() => generateRobotsTxt(config), [config]);

    const handleDownload = useCallback(() => {
        const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'robots.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [generatedContent]);

    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Robots.txt Generator</h2>
            <p className="text-center text-gray-400 mb-8">Configure and generate an SEO-safe `robots.txt` file.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Form */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="user-agent" className="block text-lg font-semibold text-gray-300 mb-2">1. Select User-Agent</label>
                        <select
                            id="user-agent"
                            value={userAgent}
                            onChange={(e) => setUserAgent(e.target.value)}
                            className="w-full bg-gray-800 text-white p-3 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0"
                        >
                            <option value="*">All Robots (*)</option>
                            <option value="Googlebot">Googlebot</option>
                            <option value="Bingbot">Bingbot</option>
                            <option value="Baiduspider">Baiduspider</option>
                            <option value="Yandex">Yandex</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="disallow-paths" className="block text-lg font-semibold text-gray-300 mb-2">2. Add Disallowed Paths</label>
                        <textarea
                            id="disallow-paths"
                            value={disallowInput}
                            onChange={(e) => setDisallowInput(e.target.value)}
                            placeholder="/private/"
                            className="w-full h-40 bg-gray-800 text-gray-200 font-mono p-3 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 resize-y"
                            aria-label="Disallowed paths, one per line"
                        />
                         <p className="text-sm text-gray-400 mt-1">Enter one path per line.</p>
                    </div>
                     <div>
                        <label htmlFor="sitemap-url" className="block text-lg font-semibold text-gray-300 mb-2">3. Add Sitemap URL</label>
                        <input
                            type="url"
                            id="sitemap-url"
                            value={sitemapUrl}
                            onChange={(e) => setSitemapUrl(e.target.value)}
                            placeholder="https://www.example.com/sitemap.xml"
                            className="w-full bg-gray-800 text-white p-3 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0"
                        />
                    </div>
                </div>

                {/* Output Preview & Download */}
                <div>
                     <label className="block text-lg font-semibold text-gray-300 mb-2">4. Generated `robots.txt`</label>
                     <pre className="w-full h-80 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md overflow-auto whitespace-pre-wrap break-all">
                        <code>{generatedContent}</code>
                    </pre>
                    <button
                        onClick={handleDownload}
                        className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                    >
                        Download robots.txt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RobotsTxtGenerator;
