import React, { useState } from 'react';

const SocialMediaImageResizerArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
                    <h2>Optimizing Image Aspect Ratios for Social Media Success, Understanding Cropping vs. Scaling, and the Role of the HTML Canvas API</h2>
                    <p>
                        In the visually driven world of social media, the presentation of your images is just as important as the content itself. Each platform—from Instagram to Twitter and Facebook—has its own set of optimal image dimensions and aspect ratios for different placements like posts, stories, and headers. Uploading an image that doesn't fit these specifications can result in awkward automatic cropping, blurry upscaling, or a loss of key visual information. A dedicated social media image resizer is an essential tool for marketers, content creators, and anyone looking to maintain a professional and consistent brand presence online.
                    </p>

                    <h3>Aspect Ratios: Why One Size Doesn't Fit All</h3>
                    <p>
                        The **aspect ratio** of an image is the proportional relationship between its width and height. For example, a square image has a 1:1 aspect ratio, while a standard widescreen video has a 16:9 ratio. Social media platforms optimize their layouts for specific aspect ratios to create a consistent user experience:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Instagram Feed:</strong> Prefers square (1:1) and portrait (4:5) images to maximize screen real estate on mobile devices. A landscape image will appear much smaller.</li>
                        <li><strong>Instagram Stories:</strong> Use a vertical 9:16 aspect ratio, designed to fill an entire smartphone screen.</li>
                        <li><strong>Twitter (X) Headers:</strong> Require a wide, panoramic 3:1 aspect ratio, which is very different from a standard photo.</li>
                        <li><strong>Facebook Link Previews:</strong> Typically use a 1.91:1 ratio to create the familiar rectangular preview card.</li>
                    </ul>
                    <p>Using the correct aspect ratio ensures your image is displayed as intended, without being automatically cropped in a way that cuts off important content.</p>

                    <h3>Cropping vs. Scaling: Two Different Approaches</h3>
                    <p>
                        When you need to fit an image into a new aspect ratio, there are two primary methods: scaling and cropping.
                    </p>
                    <p>
                        <strong>Scaling</strong> (or resizing without constraint) involves stretching or squashing the image to fit the new dimensions. This is almost always a bad idea, as it distorts the image, making people and objects look unnaturally wide or tall.
                    </p>
                    <p>
                        <strong>Cropping</strong>, on the other hand, involves cutting away parts of the image to make it fit the target aspect ratio. A "center crop" is the most common and effective technique. It preserves the original aspect ratio of the image's subject matter by first scaling the image down until it fits the target dimensions, and then trimming the excess from the sides (for a wide image) or the top and bottom (for a tall image), keeping the center of the image as the focal point. This results in a non-distorted, perfectly sized image.
                    </p>
                    
                    <h3>The Power of the HTML Canvas API for Client-Side Manipulation</h3>
                    <p>
                        Performing these transformations doesn't require complex server-side software. Modern browsers are equipped with the **HTML Canvas API**, a powerful tool that allows for dynamic, client-side image manipulation using JavaScript.
                    </p>
                    <p>
                        The process involves drawing the uploaded image onto a hidden or visible <code>&lt;canvas&gt;</code> element. The <code>drawImage()</code> method of the canvas is particularly powerful, as it allows you to specify not only the destination size but also the exact source rectangle (<code>sx, sy, sWidth, sHeight</code>) to draw from the original image. This is what enables the center-crop logic. By calculating the correct source area based on the aspect ratios, a developer can programmatically crop the image to perfection. Once the desired portion of the image is drawn onto the canvas at the final dimensions, methods like <code>canvas.toBlob()</code> can be used to export the result as a new, optimized JPEG or PNG file, ready for the user to download—all without the image ever needing to leave their browser.
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

export default SocialMediaImageResizerArticle;