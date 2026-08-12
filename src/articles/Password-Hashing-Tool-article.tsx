import React, { useState } from 'react';

const PasswordHashingToolArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
                    <h2>SHA-256 Hashing: Understanding Its One-Way Nature, Collision Resistance, and the Importance of the Web Crypto API for Client-Side Security</h2>
                    <p>
                        In the realm of digital security, password hashing is a non-negotiable practice for protecting sensitive user data. Hashing is the process of transforming a string of characters (like a password) into a fixed-length string of characters, known as a hash. SHA-256 (Secure Hash Algorithm 256-bit) is a widely trusted and commonly used hashing algorithm. Understanding its core properties—its one-way nature and collision resistance—and the correct way to implement it using modern browser APIs is essential for any developer building secure applications.
                    </p>

                    <h3>The One-Way Street of Hashing (vs. Encryption)</h3>
                    <p>
                        It is crucial to understand that **hashing is not encryption**. Encryption is a two-way process: you can encrypt data to make it unreadable and then decrypt it back to its original form using a key. Hashing, by contrast, is a **one-way function**. You can easily compute a hash from an input, but it is computationally infeasible to reverse the process and derive the original input from the hash.
                    </p>
                    <p>
                        This one-way property is perfect for password storage. When a user signs up, instead of storing their password in plain text, you store its SHA-256 hash. When they log in, you hash the password they entered and compare it to the stored hash. If they match, the password is correct. If a database is ever breached, the attackers will only get a list of hashes, not the actual passwords, making the user accounts significantly more secure.
                    </p>

                    <h3>Key Properties of SHA-256: Determinism and Collision Resistance</h3>
                    <p>
                        SHA-256 has several properties that make it a strong cryptographic hash function:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Deterministic:</strong> The same input will always produce the exact same output. The SHA-256 hash for "hello" will be the same every time it's calculated.</li>
                        <li><strong>Fixed-Length Output:</strong> Regardless of the input size—whether it's a single word or an entire book—the output of SHA-256 is always a 256-bit hash, which is represented as a 64-character hexadecimal string.</li>
                        <li><strong>Avalanche Effect:</strong> A tiny change in the input (e.g., changing "password123" to "Password123") will produce a drastically different hash. This prevents attackers from making educated guesses about the input by looking at the output.</li>
                        <li><strong>Collision Resistance:</strong> It is computationally infeasible to find two different inputs that produce the exact same hash output. The theoretical possibility exists, but the probability is so astronomically low that it is considered impossible for all practical purposes with current technology.</li>
                    </ul>

                    <h3>Why the Web Crypto API is Essential for Client-Side Security</h3>
                    <p>
                        When performing cryptographic operations in the browser, it is vital to use secure, standardized APIs. The **Web Crypto API** is the modern standard for this, providing low-level access to a browser's cryptographic capabilities. The <code>window.crypto.subtle.digest()</code> method is the secure, recommended way to perform hashing.
                    </p>
                    <p>
                        In the past, developers might have used JavaScript libraries that implemented hashing algorithms from scratch. While often functional, these libraries can be prone to subtle implementation bugs or side-channel attacks that a browser's native, highly-vetted implementation is protected against. The Web Crypto API runs in a secure context and is optimized for performance. By relying on this native browser feature, developers ensure they are using a robust, secure, and standardized method for hashing, which is the cornerstone of building trustworthy client-side security tools.
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

export default PasswordHashingToolArticle;