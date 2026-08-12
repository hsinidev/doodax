import React, { useState } from 'react';

const InternetSpeedTestArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-48 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
                    <h2>Understanding Your Internet Speed: Latency, Jitter, and Bandwidth</h2>
                    <p>
                        Running an internet speed test provides you with more than just a single number; it reveals several key metrics about the quality and performance of your connection. The three most important measurements are bandwidth (download and upload speed), latency (or ping), and jitter. Understanding what each of these means is crucial for diagnosing connection issues, choosing the right internet plan, and ensuring a smooth online experience, whether you're streaming 4K video, participating in a video conference, or engaging in competitive online gaming. This guide will break down these core concepts to help you interpret your speed test results like a pro.
                    </p>

                    <h3>What is Bandwidth (Download & Upload Speed)?</h3>
                    <p>
                        Bandwidth is likely the metric you're most familiar with, as it's what internet service providers (ISPs) advertise most heavily. It measures the maximum amount of data that can be transferred over your internet connection in a given amount of time, typically expressed in Megabits per second (Mbps).
                    </p>
                    <p>
                        <strong>Download Speed</strong> refers to how quickly your connection can pull data from the internet to your device. This is critical for activities like streaming movies, downloading files, and loading websites. A higher download speed means less buffering and faster load times. For example, streaming a 4K movie requires around 25 Mbps, while basic web browsing might only need 5 Mbps.
                    </p>
                    <p>
                        <strong>Upload Speed</strong> measures how quickly you can send data from your device to the internet. This is important for video calls, uploading large files to cloud storage, and live streaming. Symmetrical connections, where download and upload speeds are the same, are ideal but less common than asymmetrical plans where download speed is significantly higher. If your video calls are frequently choppy, a low upload speed could be the culprit.
                    </p>

                    <h3>Latency and Jitter Explained: The Keys to a Responsive Connection</h3>
                    <p>
                        While bandwidth measures capacity, latency and jitter measure the quality and responsiveness of your connection. For real-time applications, these metrics are often more important than raw speed.
                    </p>
                    <p>
                        <strong>Latency</strong>, also known as ping, is the time it takes for a small packet of data to travel from your device to a server on the internet and back again. It's measured in milliseconds (ms). A lower latency is always better, as it means your connection is more responsive. For competitive online gaming or high-frequency trading, a latency below 20ms is desirable. For video calls and general browsing, anything under 100ms is generally acceptable. High latency results in noticeable lag, where your actions take a moment to be reflected online.
                    </p>
                    <p>
                        <strong>Jitter</strong> is the variation in your latency over time. If your latency is consistently 30ms, your jitter is low. However, if your latency fluctuates rapidly between 20ms and 100ms, you have high jitter. This inconsistency can be more disruptive than high latency, causing glitches in video calls, stuttering in online games, and unstable connections. A stable connection with low jitter is essential for a smooth and predictable real-time experience.
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

export default InternetSpeedTestArticle;