import React, { useState } from 'react';

const WorldClockDashboardArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
                    <h2>Coordinating Across the Globe: The Utility of a World Clock Dashboard</h2>
                    <p>
                        In an increasingly remote and globalized workforce, coordinating with team members, clients, and partners across different time zones is a daily challenge. A world clock dashboard is a simple but essential tool that provides an at-a-glance view of the current time in multiple key cities around the world. This helps prevent scheduling mishaps, missed meetings, and late-night calls, fostering smoother international collaboration.
                    </p>

                    <h3>The Challenge of Global Scheduling</h3>
                    <p>
                        Scheduling a meeting between team members in New York, London, and Tokyo requires careful calculation. Is it a reasonable hour for everyone? Has daylight saving time started in one region but not another? A world clock dashboard removes this mental overhead by displaying the current time in each location side-by-side, making it immediately obvious what time of day it is for everyone involved.
                    </p>

                    <h3>How it Works: The IANA Time Zone Database</h3>
                    <p>
                        The accuracy of a world clock depends on the IANA Time Zone Database, a comprehensive public-domain dataset that contains information about all the world's time zones. It includes their offsets from UTC and, critically, their historical and future daylight saving time (DST) rules.
                    </p>
                    <p>
                        Modern browsers, through the `Intl.DateTimeFormat` API, have built-in access to this database. When a world clock tool uses this API, it can accurately display the local time for any given time zone (like 'America/New_York' or 'Asia/Tokyo') without needing to manually calculate offsets or worry about daylight saving time changes. The browser's internationalization engine handles all the complexity, ensuring the displayed times are always correct.
                    </p>
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

export default WorldClockDashboardArticle;