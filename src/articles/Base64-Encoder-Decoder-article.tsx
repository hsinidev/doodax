import React, { useState } from 'react';

const Base64EncoderDecoderArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-60 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-teal-400">
                    <h2>Base64 Encoding: What It Is, Why We Use It for Images (Data URLs), and Its Role in Email (MIME)</h2>
                    <p>
                        Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation. In essence, it allows you to reliably transmit binary data over channels that are designed to handle only plain text. It's a fundamental utility for web developers, but it's often misunderstood. Base64 is not a form of encryption and provides no security; it's a method of transportation. Understanding its purpose is key to using it correctly, particularly when dealing with images on the web or attachments in emails.
                    </p>

                    <h3>What is Base64 and How Does it Work?</h3>
                    <p>
                        At its core, Base64 takes a stream of binary data and breaks it down into 6-bit chunks. Since 6 bits can represent 64 different values (2^6), each chunk is mapped to one of 64 characters from a specific set of the ASCII standard. This character set includes the uppercase letters A-Z, lowercase letters a-z, numbers 0-9, and two additional characters, typically '+' and '/'. The result is a text string that is safe to transmit across any system that can handle text. Because it uses 4 characters to represent every 3 bytes of original data, a Base64-encoded string is approximately 33% larger than the original binary data.
                    </p>

                    <h3>Practical Use Case 1: Images and Data URLs</h3>
                    <p>
                        One of the most common uses of Base64 on the modern web is for embedding images directly into HTML or CSS files using Data URLs. A Data URL has a specific format: <code>data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</code>. For a PNG image, it would look like <code>data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...</code>. By encoding an image into a Base64 string and placing it in an <code>&lt;img&gt;</code> tag's <code>src</code> attribute, you eliminate the need for a separate HTTP request to fetch the image. This can be a performance advantage for very small icons or images, as it can reduce the number of requests a browser needs to make, potentially speeding up initial page load. However, for larger images, this approach is discouraged because it significantly increases the size of the HTML or CSS file, which can block rendering.
                    </p>

                    <h3>Practical Use Case 2: Email Attachments and MIME</h3>
                    <p>
                        Base64 has its roots in email. The original email protocol, SMTP, was designed to handle only 7-bit ASCII text. This posed a problem for sending attachments like images, documents, or executables, which are binary files. To solve this, the Multipurpose Internet Mail Extensions (MIME) standard was created. MIME uses Base64 encoding to convert binary attachments into plain ASCII text that can be safely included in the body of an email. The receiving email client then decodes the Base64 string back into its original binary format, allowing the user to download the attachment. This is why you can seamlessly send any file type through email systems that were originally text-only.
                    </p>
                    
                    <h3>Important: Base64 is Not Encryption</h3>
                    <p>
                        It is critical to remember that Base64 is an encoding scheme, not an encryption algorithm. The conversion process is public and fully reversible by anyone. It provides zero confidentiality or security. Its only purpose is to ensure that binary data can be safely transported through text-based systems. Never use Base64 to obscure or protect sensitive information; always use proper encryption methods like AES for that purpose.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-teal-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default Base64EncoderDecoderArticle;