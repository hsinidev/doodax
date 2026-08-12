import React, { useState, useCallback } from 'react';

// --- TypeScript Interfaces for Strict Type Checking ---
interface VitalsMetricsInterface {
    value: number;
    rating: 'Good' | 'Needs Improvement' | 'Poor';
    unit: 'ms' | 's' | '';
}

interface SpeedReportInterface {
    performanceScore: number;
    lcp: VitalsMetricsInterface;
    inp: VitalsMetricsInterface;
    cls: VitalsMetricsInterface;
    suggestions: string[];
}

// --- Mock API Function ---
// Simulates fetching a Lighthouse report from Google PageSpeed Insights API.
const fetchAPI = (url: string): Promise<SpeedReportInterface> => {
    console.log(`Analyzing ${url}...`); // Simulate using the URL
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                performanceScore: 88,
                lcp: { value: 1.8, rating: 'Good', unit: 's' },
                inp: { value: 150, rating: 'Good', unit: 'ms' },
                cls: { value: 0.12, rating: 'Needs Improvement', unit: '' },
                suggestions: [
                    'Serve images in next-gen formats',
                    'Reduce initial server response time',
                    'Eliminate render-blocking resources',
                    'Minify JavaScript and CSS',
                    'Avoid large layout shifts'
                ],
            });
        }, 1500); // Simulate network delay
    });
};

// --- UI Helper Components ---

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = (s: number) => {
        if (s >= 90) return 'text-green-400';
        if (s >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };
    const circumference = 2 * Math.PI * 52; // 2 * pi * radius
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle className="text-gray-700" strokeWidth="12" stroke="currentColor" fill="transparent" r="52" cx="96" cy="96" />
                <circle
                    className={getScoreColor(score)}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="96"
                    cy="96"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
    );
};

const VitalsCard: React.FC<{ metricName: string; data: VitalsMetricsInterface }> = ({ metricName, data }) => {
    const getRatingColor = (rating: 'Good' | 'Needs Improvement' | 'Poor') => {
        switch (rating) {
            case 'Good': return 'bg-green-500/20 text-green-400';
            case 'Needs Improvement': return 'bg-yellow-500/20 text-yellow-400';
            case 'Poor': return 'bg-red-500/20 text-red-400';
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h3 className="text-gray-400 font-semibold">{metricName}</h3>
            <p className="text-3xl font-bold text-white my-1">{data.value.toFixed(metricName === 'CLS' ? 2 : 0)}<span className="text-lg text-gray-400">{data.unit}</span></p>
            <span className={`px-3 py-1 text-sm font-bold rounded-full ${getRatingColor(data.rating)}`}>{data.rating}</span>
        </div>
    );
};


// --- Main Component ---

const WebsiteSpeedAnalyzer: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [report, setReport] = useState<SpeedReportInterface | null>(null);

    const handleAnalyze = useCallback(async () => {
        // Basic URL validation
        const urlPattern = new RegExp('^(https?|ftp)://[^\\s/$.?#].[^\\s]*$', 'i');
        if (!urlPattern.test(url)) {
            setError('Please enter a valid URL (e.g., https://example.com).');
            return;
        }

        setError(null);
        setIsLoading(true);
        setReport(null);

        try {
            const result = await fetchAPI(url);
            setReport(result);
        } catch (err) {
            setError('Failed to analyze the website. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Website Speed Analyzer</h2>
            <p className="text-center text-gray-400 mb-8">Enter a URL to analyze its performance and Core Web Vitals.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-website.com"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                    disabled={isLoading}
                />
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>
            {error && <p className="text-center text-red-400 mt-4">{error}</p>}

            {isLoading && <div className="text-center py-10">Loading results...</div>}

            {report && (
                <div className="mt-10 animate-fade-in">
                    <div className="flex flex-col items-center mb-8">
                        <h3 className="text-xl font-semibold mb-4">Overall Performance</h3>
                        <ScoreCircle score={report.performanceScore} />
                    </div>

                    <div className="mb-8">
                         <h3 className="text-xl font-semibold mb-4 text-center">Core Web Vitals</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                           <VitalsCard metricName="Largest Contentful Paint (LCP)" data={report.lcp} />
                           <VitalsCard metricName="Interaction to Next Paint (INP)" data={report.inp} />
                           <VitalsCard metricName="Cumulative Layout Shift (CLS)" data={report.cls} />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">Top Improvement Suggestions</h3>
                        <ul className="space-y-2">
                            {report.suggestions.map((item, index) => (
                                <li key={index} className="bg-gray-800 p-3 rounded-md flex items-center">
                                    <span className="text-cyan-400 mr-3">&#10148;</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebsiteSpeedAnalyzer;
