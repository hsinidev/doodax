import React from 'react';

const FileSizeConverterArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-teal-400">
            <h2>Bytes, Kilobytes, and Megabytes: Understanding Binary vs. Decimal File Sizes</h2>
            <p>
                When we talk about file sizes, we use terms like kilobytes (KB), megabytes (MB), and gigabytes (GB). However, there's a common point of confusion in how these units are defined. Traditionally in computing, these units are based on powers of 2 (binary), but sometimes they are marketed or described using powers of 10 (decimal). This discrepancy can lead to differences between the file size reported by your operating system and the size advertised by a hard drive manufacturer.
            </p>
            <h3>The Binary Standard (Base-1024)</h3>
            <p>
                In computing and for operating systems like Windows and macOS, file sizes are almost always calculated using a binary (base-2) system, where each unit is 1024 times larger than the previous one. This is because computers work with binary data. The standard is:
            </p>
            <ul className="list-disc pl-5">
                <li>1 Kilobyte (KB) = 1,024 Bytes</li>
                <li>1 Megabyte (MB) = 1,024 Kilobytes</li>
                <li>1 Gigabyte (GB) = 1,024 Megabytes</li>
                <li>1 Terabyte (TB) = 1,024 Gigabytes</li>
            </ul>
            <p>To be technically precise, these binary-based units should be called Kibibyte (KiB), Mebibyte (MiB), etc., but the KB/MB/GB notation is still used colloquially.</p>

            <h3>The Decimal Standard (Base-1000)</h3>
            <p>
                In contrast, some contexts, particularly in data storage manufacturing and telecommunications, use a decimal (base-10) system. Here, each unit is 1,000 times larger than the last.
            </p>
            <p>This is why a hard drive advertised as "1 TB" might show up in your operating system as only about 931 GB. The manufacturer is defining a terabyte as 1 trillion bytes (1000^4), but your OS is measuring it in binary gigabytes (1024^3). A file size converter tool typically uses the binary (base-1024) standard, as it's the most relevant for software and file management.</p>
        </article>
    );
};

export default FileSizeConverterArticle;