import React, { useState } from 'react';

const ImageToBase64ConverterArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
                    <h2>Using Base64 Data URLs for Inlining Images in CSS/HTML, The Role of the `FileReader` API, and Best Practices for Handling Large Image Files Client-Side</h2>
                    <p>
                        In web development, performance optimization often involves reducing the number of HTTP requests a browser needs to make to render a page. One powerful technique for this is inlining images directly into HTML or CSS using Base64 Data URLs. This method embeds the image data into the document itself, eliminating the need for a separate network request. The entire conversion from an image file to a Data URL can be done securely and efficiently on the client-side, thanks to modern browser APIs like the `FileReader` API.
                    </p>

                    <h3>Understanding the Structure of a Data URL</h3>
                    <p>
                        A Data URL is a URI scheme that provides a way to include data in-line in web pages as if they were external resources. When you convert an image to Base64, you're creating a Data URL with a specific structure:
                    </p>
                    <p><code>data:[&lt;MIME type&gt;];base64,[&lt;data&gt;]</code></p>
                    <ul className="list-disc pl-5">
                        <li><strong><code>data:</code></strong> The scheme prefix.</li>
                        <li><strong><code>[&lt;MIME type&gt;]</code>:</strong> The media type of the data, such as <code>image/png</code> or <code>image/jpeg</code>. This tells the browser how to interpret the data.</li>
                        <li><strong><code>;base64</code>:</strong> An optional flag indicating that the data is encoded as Base64.</li>
                        <li><strong><code>,[&lt;data&gt;]</code>:</strong> The comma separates the metadata from the actual Base64-encoded data string.</li>
                    </ul>
                    <p>
                        When a browser encounters a Data URL in an <code>&lt;img&gt;</code> tag's <code>src</code> attribute or a CSS <code>background-image</code> property, it decodes the Base64 string and renders the image directly, without needing to fetch a file from a server.
                    </p>

                    <h3>The Role of the `FileReader` API</h3>
                    <p>
                        The magic behind a client-side image converter is the <code>FileReader</code> API. This native browser API allows web applications to asynchronously read the contents of files (or raw data buffers) stored on the user's computer. It's a secure process because it doesn't upload the file to a server; all the processing happens locally.
                    </p>
                    <p>
                        The <code>reader.readAsDataURL(file)</code> method is the key function. It reads the contents of the specified <code>File</code> or <code>Blob</code>. When the read operation is finished, the <code>readyState</code> becomes <code>DONE</code>, and the <code>loadend</code> is triggered. The file's contents are returned as a <code>data:</code> URL representing the file's data as a Base64 encoded string. This entire process is asynchronous to prevent the user interface from freezing while the file is being read, ensuring a smooth user experience even with larger files.
                    </p>

                    <h3>Best Practices: When to Inline and When to Link</h3>
                    <p>
                        While inlining images can improve performance, it's not a silver bullet. The key trade-off is file size. A Base64-encoded string is approximately 33% larger than the original binary image. This means that while you save an HTTP request, you increase the size of your HTML or CSS file.
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Do Inline:</strong> Small, decorative images, icons, and logos that are under 5-10 KB are excellent candidates for inlining. The overhead of an HTTP request for such a small file is often greater than the size increase from Base64 encoding.</li>
                        <li><strong>Don't Inline:</strong> Large images, such as hero images, photographs, or detailed graphics. Inlining a large image can dramatically bloat your HTML or CSS file, which can block the rendering of the page and make the site feel slower. For these, a traditional linked image (<code>&lt;img src="path/to/image.jpg"&gt;</code>) is far better, as it can be loaded in parallel and cached by the browser independently.</li>
                    </ul>
                    <p>By using this technique judiciously, developers can strike the right balance between reducing network requests and keeping initial page payloads lean.</p>
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

export default ImageToBase64ConverterArticle;