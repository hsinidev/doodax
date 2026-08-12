import React, { useState } from 'react';

const ImageResizerCropperArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
                    <h2>The Math Behind Image Cropping: Source vs. Destination Coordinates in the Canvas API and Client-Side Resizing Techniques</h2>
                    <p>
                        Client-side image manipulation has become a powerful feature of modern web applications, allowing for everything from applying filters to resizing and cropping images directly in the user's browser. The cornerstone of these capabilities is the HTML Canvas API, a versatile tool for rendering graphics programmatically. One of its most powerful methods, <code>drawImage()</code>, can perform complex operations like cropping and resizing in a single, efficient step. Understanding how to use its different arguments is key to building high-precision image editing tools.
                    </p>

                    <h3>The Versatile `drawImage()` Method</h3>
                    <p>
                        The <code>drawImage()</code> method comes in three flavors, but the most powerful version for cropping and resizing accepts nine arguments:
                    </p>
                    <p><code>context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);</code></p>
                    <p>
                        These arguments define two distinct rectangles: the **source rectangle** (what to grab from the original image) and the **destination rectangle** (where to draw it on the canvas).
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong><code>image</code></strong>: The source image element (<code>HTMLImageElement</code>).</li>
                        <li><strong><code>sx</code>, <code>sy</code>, <code>sWidth</code>, <code>sHeight</code></strong>: These define the source rectangle. <code>(sx, sy)</code> is the top-left coordinate on the original image from which to start the crop. <code>sWidth</code> and <code>sHeight</code> are the width and height of the area to be cropped.</li>
                        <li><strong><code>dx</code>, <code>dy</code>, <code>dWidth</code>, <code>dHeight</code></strong>: These define the destination rectangle. <code>(dx, dy)</code> is the top-left coordinate on the canvas where the cropped image should be placed. <code>dWidth</code> and <code>dHeight</code> are the final width and height of the image on the canvas.</li>
                    </ul>

                    <h3>Combining Cropping and Resizing in One Operation</h3>
                    <p>
                        The magic happens when you use these two rectangles together. The browser takes the pixels defined by the source rectangle and scales them to fit perfectly into the destination rectangle.
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Cropping is achieved via the source arguments.</strong> By specifying an <code>sx</code>, <code>sy</code>, <code>sWidth</code>, and <code>sHeight</code> that is smaller than the full original image, you are effectively telling the canvas to only use that portion of the source. This is the "crop."</li>
                        <li><strong>Resizing is achieved via the destination arguments.</strong> By setting <code>dWidth</code> and <code>dHeight</code> to values different from <code>sWidth</code> and <code>sHeight</code>, you tell the browser to scale the cropped portion up or down to fit the new dimensions.</li>
                    </ul>
                    <p>
                        For example, to crop a 200x200 square from the center of a 1920x1080 image and resize it to a 50x50 thumbnail, your arguments would be:
                    </p>
                    <pre><code>
{`const sx = (1920 - 200) / 2; // 860
const sy = (1080 - 200) / 2; // 440
const sWidth = 200;
const sHeight = 200;

const dx = 0;
const dy = 0;
const dWidth = 50;
const dHeight = 50;

ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`}
                    </code></pre>
                    <p>This single command tells the browser to take a 200x200 pixel block from the center of the original image and draw it onto the <code>&lt;canvas&gt;</code> as a 50x50 pixel image, performing both a crop and a resize simultaneously.</p>

                    <h3>The Benefit of a Client-Side Approach</h3>
                    <p>
                        By leveraging the Canvas API, all of this complex image processing can happen entirely within the user's browser. This has significant advantages: it's incredibly fast, as there are no network delays from uploading and downloading; it's secure, as the user's image never leaves their computer; and it reduces server load and bandwidth costs. This makes it the ideal technology for building modern, responsive, and cost-effective web-based image utilities.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-cyan-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default ImageResizerCropperArticle;