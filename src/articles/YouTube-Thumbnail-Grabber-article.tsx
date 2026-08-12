import React, { useState } from 'react';

const YouTubeThumbnailGrabberArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-pink-400">
                    <h2>YouTube Thumbnail Optimization: Standard vs. High-Resolution Formats, and Extracting Video IDs from Different URL Structures</h2>
                    <p>
                        A YouTube thumbnail is the single most important piece of marketing for a video. It's the first thing a potential viewer sees, and a compelling, high-quality thumbnail can dramatically increase click-through rates. While YouTube automatically generates a few thumbnail options, creators almost always upload a custom, high-resolution image for maximum impact. Understanding the different thumbnail formats YouTube makes available and how to access them directly can be a powerful tool for developers, marketers, and content creators alike.
                    </p>

                    <h3>The Hierarchy of YouTube Thumbnail Resolutions</h3>
                    <p>
                        For every video uploaded, YouTube generates a set of thumbnails at various resolutions. These are publicly accessible via a simple URL structure, requiring only the video's unique 11-character ID. This allows for easy integration without needing to use the official YouTube Data API. The available formats are:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><code>default.jpg</code>: A small, low-resolution thumbnail (120x90 pixels). Often used in related video sidebars.</li>
                        <li><code>mqdefault.jpg</code>: Medium quality (320x180 pixels).</li>
                        <li><code>hqdefault.jpg</code>: High quality (480x360 pixels). For a long time, this was the standard for most embeds.</li>
                        <li><code>sddefault.jpg</code>: Standard definition quality (640x480 pixels). This offers better quality but is not always available.</li>
                        <li><strong><code>maxresdefault.jpg</code></strong>: The highest possible resolution (typically 1280x720 or 1920x1080 pixels). This is the format that provides the crispest, most professional-looking image. However, it's not guaranteed to exist for every video, especially very old or low-resolution uploads.</li>
                    </ul>
                    <p>The URL format is straightforward: <code>https://img.youtube.com/vi/&lt;VIDEO_ID&gt;/&lt;RESOLUTION_CODE&gt;.jpg</code>. For the best quality, always try to fetch `maxresdefault.jpg` first, and have a fallback plan to request `hqdefault.jpg` if the higher resolution version is not found.</p>

                    <h3>Extracting Video IDs from Different URL Structures</h3>
                    <p>
                        The key to grabbing a thumbnail is the video ID. YouTube uses several different URL formats, and a robust tool needs to be able to parse all of them. This is a perfect job for Regular Expressions (Regex). The video ID is always an 11-character string containing letters, numbers, hyphens, and underscores.
                    </p>
                    <p>Here are the most common URL formats a tool must handle:</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Standard Watch URL:</strong> <code>https://www.youtube.com/watch?v=VIDEO_ID</code></li>
                        <li><strong>Shortened URL:</strong> <code>https://youtu.be/VIDEO_ID</code></li>
                        <li><strong>Embed URL:</strong> <code>https://www.youtube.com/embed/VIDEO_ID</code></li>
                        <li><strong>Channel Video URL:</strong> <code>https://www.youtube.com/v/VIDEO_ID</code></li>
                    </ul>
                    <p>
                        A well-crafted Regex can capture the 11-character ID group from any of these variations, ignoring other parameters like timestamps (`&t=...`) or playlist information. This makes the extraction process fast and reliable, enabling a tool to work with virtually any YouTube link a user provides.
                    </p>
                
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
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

export default YouTubeThumbnailGrabberArticle;