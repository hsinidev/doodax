import React, { useState } from 'react';

const ImageFileOptimizerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
                    <h2>Lossy vs. Lossless Compression, How JPEG Quality Affects SEO, and Client-Side Optimization Using the HTML Canvas API</h2>
                    <p>
                        Images are a vital component of the modern web, but they are also often the largest and heaviest assets on a webpage. Large image files can drastically slow down page load times, leading to a poor user experience and lower search engine rankings. Image optimization is the process of reducing an image's file size as much as possible without significantly compromising its visual quality. Understanding the core concepts of compression, like lossy vs. lossless, and the tools available for optimization, is essential for any web developer.
                    </p>

                    <h3>Lossy vs. Lossless Compression: The Fundamental Trade-Off</h3>
                    <p>
                        Image compression algorithms are generally divided into two categories: lossless and lossy.
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Lossless Compression (e.g., PNG):</strong> This method reduces file size by identifying and eliminating redundant data in the image file without discarding any information. When the image is uncompressed, it is a perfect, pixel-for-pixel recreation of the original. The PNG format is a common example of lossless compression. It's ideal for graphics with sharp lines, text, or transparency, where preserving every detail is crucial. The downside is that the file size reduction is often less significant than with lossy methods.
                        </li>
                        <li>
                            <strong>Lossy Compression (e.g., JPEG):</strong> This method achieves much smaller file sizes by selectively and permanently discarding some of the image data that is least perceptible to the human eye. The JPEG format is the most common example. When you save a JPEG, you can choose a "quality" level. A lower quality setting results in a smaller file size but more visible artifacts and a greater loss of detail. This type of compression is best suited for photographs and complex images where slight imperfections are less noticeable.
                        </li>
                    </ul>

                    <h3>Image Quality, Page Speed, and SEO</h3>
                    <p>
                        The connection between image optimization and Search Engine Optimization (SEO) is direct and significant. Google uses page load speed as a key ranking factor, and a major component of this is the Core Web Vitals metric **Largest Contentful Paint (LCP)**. LCP measures how long it takes for the largest image or text block to load in the viewport. Large, unoptimized images are a primary cause of poor LCP scores.
                    </p>
                    <p>
                        By using lossy compression for JPEG images, you can dramatically reduce their file size, which in turn leads to a faster download time and a better LCP score. A fast-loading site provides a better user experience, which reduces bounce rates and signals to Google that your page is high-quality, potentially boosting its ranking. The key is to find the right balance—a quality setting that significantly reduces file size without making the image look blurry or pixelated.
                    </p>
                    
                    <h3>Client-Side Optimization with the HTML Canvas API</h3>
                    <p>
                        Traditionally, image optimization was a task performed in design software like Photoshop before uploading, or on a server after upload. However, modern browsers provide a powerful tool for performing this optimization directly on the client-side: the **HTML Canvas API**.
                    </p>
                    <p>
                        The process is straightforward: an uploaded image is drawn onto an invisible <code>&lt;canvas&gt;</code> element in the browser. Then, the <code>canvas.toBlob()</code> method is called. This powerful method allows you to re-encode the image from the canvas into a new format (like <code>image/jpeg</code>) and, crucially, to specify a quality level (a number between 0.0 and 1.0). The browser's internal image encoder then performs the lossy compression, generating a new, smaller image <code>Blob</code> (Binary Large Object). This <code>Blob</code> can then be previewed, its new size can be calculated, and it can be offered to the user for download, all without the image ever leaving their computer. This client-side approach is fast, secure, and places no load on a web server.
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
                className="text-blue-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default ImageFileOptimizerArticle;