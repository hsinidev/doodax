import React, { useState } from 'react';

const TimeZoneConverterArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>How Time Zone Converters Work: Understanding UTC and the Intl API</h2>
                    <p>
                        In our globally connected world, coordinating with people across different time zones is a daily reality. A time zone converter is an essential tool for scheduling meetings, planning travel, or simply knowing when to call a friend overseas. Modern converters rely on standardized timekeeping principles and powerful browser APIs to provide accurate, real-time conversions without needing a server.
                    </p>

                    <h3>The Standard: Coordinated Universal Time (UTC)</h3>
                    <p>
                        The foundation of all modern timekeeping is Coordinated Universal Time (UTC). It is the primary time standard by which the world regulates clocks and time. UTC is not a time zone but a time standard that remains constant and does not observe daylight saving time. All other time zones are expressed as an offset from UTC. For example, New York is UTC-5 during standard time and UTC-4 during daylight saving time.
                    </p>
                    <p>
                        By using UTC as a universal reference point, a time zone converter can accurately calculate the time anywhere in the world. It first determines the current UTC time and then applies the specific offset for the target time zone.
                    </p>
                    
                    <h3>The Power of the `Intl` API in JavaScript</h3>
                    <p>
                        In the past, handling time zones in JavaScript was notoriously difficult and often required large, external libraries. However, modern browsers now include the built-in <code>Intl</code> (Internationalization) object, which provides powerful, native capabilities for handling different languages, number formats, and, most importantly, dates and times.
                    </p>
                    <p>
                        The <code>Intl.DateTimeFormat</code> constructor is the key. It allows you to create a formatter that can display a date and time according to a specific locale and, crucially, in a specific time zone.
                    </p>
                    <p><code>{`new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo' }).format(date);`}</code></p>
                
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
                className="text-amber-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default TimeZoneConverterArticle;