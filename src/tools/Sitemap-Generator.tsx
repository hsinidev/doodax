import React, { useState, useMemo, useCallback } from 'react';

// --- Core Logic ---
const generateXmlSitemap = (urls: string[]): string => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const urlEntries = urls.map(url => `
  <url>
    <loc>${url.trim()}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>`;
};

// --- Main Component ---
const SitemapGenerator: React.FC = () => {
    const [urlsInput, setUrlsInput] = useState<string>('https://www.example.com/\nhttps://www.example.com/about\nhttps://www.example.com/contact');
    const [generatedXml, setGeneratedXml] = useState<string>('');
    const [hasGenerated, setHasGenerated] = useState<boolean>(false);

    const handleGenerate = useCallback(() => {
        const urls = urlsInput.split('\n').filter(url => url.trim() !== '');
        if (urls.length === 0) {
            setGeneratedXml('<!-- Please enter at least one URL -->');
            setHasGenerated(true);
            return;
        }
        const sitemapContent = generateXmlSitemap(urls);
        setGeneratedXml(sitemapContent);
        setHasGenerated(true);
    }, [urlsInput]);
    
    const handleDownload = useCallback(() => {
        if (!generatedXml || generatedXml.startsWith('<!--')) return;

        const blob = new Blob([generatedXml], { type: 'application/xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sitemap.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [generatedXml]);

    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">XML Sitemap Generator</h2>
            <p className="text-center text-gray-400 mb-8">Paste your URLs and generate a downloadable `sitemap.xml` file.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div>
                    <label htmlFor="urls-input" className="block text-lg font-semibold text-gray-300 mb-2">1. Paste URLs (one per line)</label>
                    <textarea
                        id="urls-input"
                        value={urlsInput}
                        onChange={(e) => {
                            setUrlsInput(e.target.value);
                            setHasGenerated(false);
                        }}
                        className="w-full h-80 bg-gray-800 text-gray-200 font-mono p-3 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 resize-y"
                    />
                </div>

                {/* Output Preview */}
                <div>
                     <label className="block text-lg font-semibold text-gray-300 mb-2">2. Generated Sitemap Preview</label>
                     <pre className="w-full h-80 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md overflow-auto whitespace-pre-wrap break-all">
                        <code>{hasGenerated ? generatedXml : '<!-- Click "Generate Sitemap" to see the output -->'}</code>
                    </pre>
                </div>
            </div>
            
            <div className="text-center mt-8">
                <button
                    onClick={() => {
                        handleGenerate();
                        // A short delay to allow state to update before download is available
                        setTimeout(() => handleDownload(), 100);
                    }}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                >
                    Generate & Download Sitemap
                </button>
            </div>
        </div>
    );
};

export default SitemapGenerator;
