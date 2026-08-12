import React, { useState } from 'react';

const JSONFormatterValidatorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
                    <h2>The JSON Data Format: Syntax Rules, Schema Validation, and the Difference Between Parsing and Stringifying</h2>
                    <p>
                        JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web, prized for its lightweight structure and human-readable syntax. It's the language APIs speak and the format configuration files are written in. However, its simplicity is governed by a strict set of syntax rules that, if violated, can break applications. This is where a JSON formatter and validator becomes an indispensable tool for any developer. Understanding the core principles of JSON, including its syntax, the processes of parsing and stringifying, and the concept of schema validation, is crucial for building robust and reliable software.
                    </p>

                    <h3>Core JSON Syntax Rules</h3>
                    <p>
                        At its heart, JSON is built on two simple structures: a collection of name/value pairs (often realized as an object, record, or dictionary in various languages) and an ordered list of values (an array or list). The syntax rules are precise:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Data is in key/value pairs:</strong> Keys must be strings enclosed in double quotes.</li>
                        <li><strong>Curly braces <code>{`{}`}</code> hold objects:</strong> Objects are comma-separated collections of key/value pairs.</li>
                        <li><strong>Square brackets <code>[]</code> hold arrays:</strong> Arrays are comma-separated lists of values.</li>
                        <li><strong>Strings must be in double quotes:</strong> Single quotes are not allowed for keys or string values.</li>
                        <li><strong>Data types are limited:</strong> JSON supports strings, numbers, booleans (<code>true</code>/<code>false</code>), arrays, objects, and <code>null</code>.</li>
                    </ul>
                    <p>
                        A single misplaced comma or a string wrapped in single quotes is enough to render a JSON document invalid, making a validator essential for debugging.
                    </p>

                    <h3>Parsing (<code>JSON.parse()</code>) vs. Stringifying (<code>JSON.stringify()</code>)</h3>
                    <p>
                        In JavaScript and many other languages, interacting with JSON involves two fundamental operations:
                    </p>
                    <p>
                        <strong>Parsing</strong> is the process of converting a JSON string into a native data structure (like a JavaScript object or array) that the programming language can work with. The <code>JSON.parse()</code> method in JavaScript is used for this. It takes a JSON string as input and, if the string is valid, returns the corresponding JavaScript object. If the string contains any syntax errors, <code>JSON.parse()</code> will throw an error, which is the core mechanism a validator uses to check for correctness.
                    </p>
                    <p>
                        <strong>Stringifying</strong> is the opposite process: converting a native data structure (like a JavaScript object or array) into a JSON string. This is done using the <code>JSON.stringify()</code> method. This is necessary when you need to send data to a web server or store it in a file, as the data must be in a string format. <code>JSON.stringify()</code> can also be used to format the output. By providing additional arguments, you can "pretty-print" the JSON with specific indentation (like 2 spaces, 4 spaces, or tabs), which is exactly what a JSON formatter does to improve readability.
                    </p>
                    
                     <h3>What About Schema Validation?</h3>
                    <p>
                        While a JSON validator checks for correct syntax, it doesn't check for correct structure. For example, a validator will confirm that a document is valid JSON, but it won't know if a required field like <code>"userId"</code> is missing or if a field like <code>"age"</code> is a string instead of a number. This is where schema validation comes in. A JSON Schema is a separate document that defines the expected structure, data types, and constraints for a JSON document. While not part of the JSON standard itself, tools that use JSON Schema can perform a deeper level of validation, ensuring that the data is not only syntactically correct but also semantically meaningful for the application.
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
                className="text-rose-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default JSONFormatterValidatorArticle;