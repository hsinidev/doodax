import React, { useState } from 'react';

const ImageCaptionGeneratorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
                    <h2>How AI Vision Models Generate Alt Text and Captions from Images</h2>
                    <p>
                        Images are a powerful medium for communication, but without text descriptions, they are inaccessible to visually impaired users and opaque to search engines. Manually writing descriptions for a large number of images is a time-consuming task. This is where AI-powered image captioning comes in. Using advanced multimodal AI models like Google's Gemini, it's now possible to automatically generate high-quality, context-aware text that describes the content of an image.
                    </p>

                    <h3>How Do Vision Models "See"?</h3>
                    <p>
                        An AI vision model doesn't "see" an image like a human does. Instead, it processes the image as a grid of pixels and their corresponding color values. Through a process called deep learning, specifically using neural networks, the model is trained on a massive dataset containing millions of images paired with human-written descriptions.
                    </p>
                    <p>
                        During this training, the model learns to identify patterns, objects, shapes, and colors. It learns to recognize a "cat" by analyzing thousands of different pictures of cats. It also learns the relationships between objects (e.g., a "cat sitting on a couch"). When you provide a new image, the model applies this learned knowledge to identify the elements within the image and then generates a textual description that accurately represents what it has identified.
                    </p>

                    <h3>The Difference Between Alt Text and Captions</h3>
                    <p>
                        While often used interchangeably, alt text and captions serve two different purposes:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Alt Text (Alternative Text):</strong> This is a concise, functional description of an image that is embedded in the HTML <code>&lt;img&gt;</code> tag. Its primary purpose is accessibility. Screen readers use it to describe the image to visually impaired users. Its secondary purpose is SEO; it provides context to search engines, helping them understand the image content. Good alt text is descriptive and to the point (e.g., "A black cat sleeping on a red sofa").</li>
                        <li><strong>Caption:</strong> A caption is the text that is displayed with an image. It can be more creative, engaging, and provide additional context or a narrative that isn't immediately obvious from the image itself. For social media, a caption might include a question, a call to action, or relevant hashtags.</li>
                    </ul>
                    <p>An AI caption generator can be prompted to create both, providing functional text for accessibility and SEO, as well as creative text for user engagement.</p>
                
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

export default ImageCaptionGeneratorArticle;