import React, { useState } from 'react';

const OnlineQRCodeGeneratorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
                    <h2>The History and Structure of QR Codes, The Importance of Error Correction Levels, and Generating Codes Client-Side vs. Server-Side</h2>
                    <p>
                        QR (Quick Response) codes have become a ubiquitous part of our digital lives, seamlessly bridging the gap between the physical and online worlds. From restaurant menus to event tickets, these pixelated squares provide instant access to information with a simple scan from a smartphone. Originally invented in 1994 by the Japanese company Denso Wave for tracking automotive parts, their versatility and the rise of smartphones have led to widespread adoption. Understanding their structure, especially the role of error correction, is key to leveraging their full potential.
                    </p>

                    <h3>The Structure of a QR Code</h3>
                    <p>
                        A QR code is not just a random collection of black and white squares; it's a highly structured data matrix. Key components include:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Finder Patterns:</strong> The three large squares in the corners of the code. These help the scanner quickly identify the presence of a QR code and determine its orientation.</li>
                        <li><strong>Alignment Patterns:</strong> A smaller square, typically found in the bottom-right corner of larger codes, which helps the scanner correct for distortion if the code is on a curved surface.</li>
                        <li><strong>Timing Patterns:</strong> Alternating black and white modules that run between the finder patterns. These help the scanner determine the size of the data matrix.</li>
                        <li><strong>Data and Error Correction Keys:</strong> The rest of the modules in the code store the actual data (like a URL or text) along with error correction information.</li>
                    </ul>

                    <h3>The Importance of Error Correction Levels</h3>
                    <p>
                        One of the most powerful features of QR codes is their built-in error correction. This allows the code to be read even if it is partially damaged or obscured. The technology is based on the Reed-Solomon error correction algorithm, which adds redundant data to the code. There are four levels of error correction:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Level L (Low):</strong> Can restore approximately 7% of damaged data.</li>
                        <li><strong>Level M (Medium):</strong> Can restore approximately 15% of damaged data. (This is the most common level for general use).</li>
                        <li><strong>Level Q (Quartile):</strong> Can restore approximately 25% of damaged data.</li>
                        <li><strong>Level H (High):</strong> Can restore approximately 30% of damaged data.</li>
                    </ul>
                    <p>
                        There is a trade-off: a higher error correction level means more redundant data is stored, which increases the density and size of the QR code, reducing the amount of data it can hold. For digital use, Level M is usually sufficient. However, for QR codes that will be printed on physical materials exposed to wear and tear, like a poster or a business card, using Level Q or H is a wise choice to ensure long-term scannability.
                    </p>
                    
                    <h3>Client-Side vs. Server-Side Generation</h3>
                    <p>
                        QR codes can be generated in two primary ways: on a server or on the client (i.e., directly in the user's browser).
                        <strong>Server-side generation</strong> involves sending the data to a server, which then creates the QR code image and sends it back. This can be useful for logging or tracking, but it introduces a network delay and potential privacy concerns.
                        <strong>Client-side generation</strong>, as used in this tool, leverages JavaScript libraries to create the QR code directly in the browser. This method is faster, works offline, and is more secure because the data never leaves the user's computer. For a public utility tool, client-side generation is the superior approach, providing instant feedback and preserving user privacy.
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
                className="text-emerald-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default OnlineQRCodeGeneratorArticle;