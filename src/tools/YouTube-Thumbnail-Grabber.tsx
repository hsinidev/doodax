import React, { useState, useMemo, useCallback } from 'react';

// --- Core Logic ---

/**
 * Extracts the YouTube video ID from various URL formats.
 * @param url The YouTube URL string.
 * @returns The 11-character video ID or null if not found.
 */
const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

/**
 * Constructs the highest resolution thumbnail URL from a video ID.
 * @param videoId The 11-character YouTube video ID.
 * @returns The URL for the max resolution default thumbnail.
 */
const buildThumbnailUrl = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

// --- Main Component ---
const YouTubeThumbnailGrabber: React.FC = () => {
    const [urlInput, setUrlInput] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    const [status, setStatus] = useState<FetchStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [videoId, setVideoId] = useState<string | null>(null);

    const handleFetch = useCallback(() => {
        const id = getYouTubeVideoId(urlInput);
        if (id) {
            setVideoId(id);
            const thumbUrl = buildThumbnailUrl(id);
            setThumbnailUrl(thumbUrl);
            setStatus('success');
            setError(null);
        } else {
            setVideoId(null);
            setThumbnailUrl(null);
            setStatus('error');
            setError('Invalid or unsupported YouTube URL format.');
        }
    }, [urlInput]);
    
    const triggerDownload = (blob: Blob, fileName: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownload = useCallback(async () => {
        if (!thumbnailUrl || !videoId) return;

        setStatus('loading');
        try {
            const response = await fetch(thumbnailUrl);
            if (!response.ok) {
                // maxresdefault might not exist for older videos, fallback to hqdefault
                const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                const fallbackResponse = await fetch(fallbackUrl);
                if (!fallbackResponse.ok) throw new Error('Could not fetch thumbnail image.');
                const blob = await fallbackResponse.blob();
                triggerDownload(blob, `${videoId}_hq.jpg`);
            } else {
                 const blob = await response.blob();
                 triggerDownload(blob, `${videoId}_maxres.jpg`);
            }
            setStatus('success');
        } catch (err: any) {
            setError('Failed to download image. It may not exist or the network failed.');
            setStatus('error');
        }
    }, [thumbnailUrl, videoId]);

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">YouTube Thumbnail Grabber</h2>
            <p className="text-center text-gray-400 mb-8">Paste any YouTube URL to get the highest resolution thumbnail.</p>

            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                />
                <button
                    onClick={handleFetch}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all"
                >
                    Fetch Thumbnail
                </button>
            </div>

            <div className="mt-8">
                {status === 'error' && <p className="text-center text-red-400 my-4 bg-red-500/10 p-3 rounded-md">{error}</p>}
                
                {thumbnailUrl && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Thumbnail Preview</h3>
                            <div className="bg-gray-800/50 p-4 rounded-lg flex justify-center items-center">
                                <img src={thumbnailUrl} alt="YouTube Thumbnail" className="max-w-full rounded-md shadow-lg" onError={() => setError('High-res thumbnail not found; download will try a fallback.')}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="thumbnail-url" className="block text-sm font-medium text-gray-300 mb-2">Direct Image URL</label>
                            <input id="thumbnail-url" readOnly value={thumbnailUrl} className="w-full bg-gray-800 text-gray-300 font-mono p-3 border-2 border-gray-700 rounded-md"/>
                        </div>
                        <button
                            onClick={handleDownload}
                            disabled={status === 'loading'}
                            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-md text-lg transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Downloading...' : 'Download Image (JPG)'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouTubeThumbnailGrabber;