import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Tool Inventory (from user prompt)
const tools = [
    "Internet Speed Test", "Website Speed Analyzer", "Domain Availability Checker", "DNS Lookup Tool",
    "JSON Formatter Validator", "CSS Minifier Compressor", "Base64 Encoder Decoder", "Password Hashing Tool",
    "Color Contrast Checker", "URL Encoder Decoder", "Link Broken Checker", "Website Down Detector",
    "Simple Text Summarizer", "Simple Sentiment Analyzer", "Stockholm Video Idea Generator", "Image Caption Generator",
    "Blog Post Title Generator", "Tweet Post Rewriter", "Cover Letter Generator", "Project Proposal Generator",
    "Online QR Code Generator", "Favicon Generator", "Image to Base64 Converter", "Image File Optimizer",
    "Social Media Image Resizer", "Image Reducer Cropper", "Passport Photo Resizer", "YouTube Thumbnail Grabber",
    "Stock Photo Finder", "Website Thumbnail Generator", "Loan Currency Calculator", "VAT Sales Tax Calculator",
    "Tip Calculator", "Savings Goal Calculator", "Percentage Change Calculator", "Debt Calculator",
    "Retirement Savings Planner", "Mortgage Calculator", "Investment Return Calculator", "Inflation Calculator",
    "Paycheck Calculator", "Break Even Point Calculator", "Rental Yield Calculator", "Budget Planner Template",
    "Net Worth Tracker", "BMI Calculator", "Time Zone Converter", "Date Difference Calculator",
    "World Clock Dashboard", "Age Calculator", "Countdown Timer", "US Public Holiday Calendar",
    "Markdown Previewer", "Character Word Line Counter", "HTML Text Stripper", "Text Difference Checker",
    "Readability Score Checker", "Time to Read Calculator", "Interview Calendar", "Sitemap Generator",
    "Email Validator", "Resume CV Maker", "Invoice Generator", "Business Card Maker",
    "Meeting Minutes Template", "Simple NDA Generator", "Letter of Intent Generator", "Simple Will Template Generator",
    "POA Request Generator", "Voter Registration Checker", "Local Parcel Lookup", "Public Check Service Contact Tool",
    "Small Claims Forms Template", "DMV Wait Time Checker", "Court Date Lookup", "Simple History Finder",
    "UUID GUID Generator", "Password Checker Generator", "Online Whiteboard", "Recipe Unit Converter",
    "PDF Merger Splitter", "File Size Converter", "Color Picker Hex Converter"
];

// 2. Topic Clusters / Angles
const topics = [
    {
        titleTemplate: "How to Use [Tool] to Boost Your Productivity",
        slugSuffix: "boost-productivity",
        category: "Guides"
    },
    {
        titleTemplate: "Why [Tool] is Essential for Modern Workflows",
        slugSuffix: "essential-modern-workflows",
        category: "Insights"
    },
    {
        titleTemplate: "Top 5 Use Cases for [Tool] You Didn't Know",
        slugSuffix: "top-5-use-cases",
        category: "Tips & Tricks"
    },
    {
        titleTemplate: "Understanding the Technology Behind [Tool]",
        slugSuffix: "technology-behind",
        category: "Tech Deep Dive"
    },
    {
        titleTemplate: "[Tool]: A Comprehensive Guide for Beginners",
        slugSuffix: "comprehensive-guide-beginners",
        category: "Tutorials"
    }
];

// 3. Helper Functions
function generateSlug(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

function generateContent(toolName, topicTitle) {
    // Generates a structured "draft" article
    return `
        <p class="lead">In today's digital landscape, efficiency is key. <strong>${toolName}</strong> has emerged as a vital utility for professionals looking to streamline their operations. This article explores ${topicTitle.toLowerCase()} and how it can transform your daily workflow.</p>

        <h2>Introduction to ${toolName}</h2>
        <p>Whether you are a developer, a content creator, or a business owner, having the right tools at your disposal is crucial. ${toolName} offers a seamless solution for specific tasks that often consume valuable time. By automating or simplifying these processes, you can focus on what truly matters: your core business objectives.</p>

        <h2>Key Features and Benefits</h2>
        <ul>
            <li><strong>Efficiency:</strong> Drastically reduce the time spent on manual calculations or formatting.</li>
            <li><strong>Accuracy:</strong> Eliminate human error with precise, algorithmic results.</li>
            <li><strong>Accessibility:</strong> As a web-based tool, ${toolName} is available anytime, anywhere, without the need for software installation.</li>
        </ul>

        <h2>Real-World Applications</h2>
        <p>Consider a scenario where you need to process data quickly. Instead of struggling with complex spreadsheets or manual conversions, ${toolName} provides an instant output. For example, in web development, ensuring code quality or optimizing assets is non-negotiable. This tool bridges the gap between complexity and usability.</p>

        <h2>How to Get Started</h2>
        <p>Using ${toolName} on Doodax is straightforward:</p>
        <ol>
            <li>Navigate to the tool page.</li>
            <li>Input your data or upload your file.</li>
            <li>Click the action button to generate results instantly.</li>
        </ol>
        <p>It's that simple. No sign-ups, no paywalls, just pure utility.</p>

        <h2>Conclusion</h2>
        <p>${topicTitle} is more than just a catchy headline; it's a reality for thousands of users. By integrating ${toolName} into your toolkit, you are taking a significant step towards a more optimized and productive digital life. Explore this and hundreds of other free tools on Doodax today.</p>
    `;
}

function generateFAQ(toolName) {
    return [
        {
            question: `Is ${toolName} free to use?`,
            answer: `Yes, ${toolName} is completely free to use on Doodax. We believe in accessible tools for everyone.`
        },
        {
            question: `Do I need to install software to use ${toolName}?`,
            answer: `No, ${toolName} runs entirely in your browser. You don't need to download or install anything.`
        },
        {
            question: `Is my data safe when using ${toolName}?`,
            answer: `Absolutely. We prioritize user privacy and most processing happens locally in your browser.`
        }
    ];
}

function generateRelatedTools(currentToolIndex) {
    // Pick 2 random other tools
    const related = [];
    while (related.length < 2) {
        const idx = Math.floor(Math.random() * tools.length);
        if (idx !== currentToolIndex && !related.includes(tools[idx])) {
            related.push(tools[idx].replace(/\s+/g, '-')); // Approximate fileName
        }
    }
    return related;
}

// 4. Main Generation Loop
const blogPosts = [];
let idCounter = 1;

tools.forEach((tool, index) => {
    topics.forEach(topic => {
        const title = topic.titleTemplate.replace('[Tool]', tool);
        const slug = generateSlug(title);

        const post = {
            id: String(idCounter++),
            title: title,
            slug: slug,
            excerpt: `Discover how ${tool} can revolutionize your workflow. A deep dive into its features, benefits, and practical applications for professionals.`,
            content: generateContent(tool, title),
            author: "Doodax Team",
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(), // Random date in past year
            category: topic.category,
            tags: [tool.toLowerCase(), "productivity", "tools", "guide"],
            faq: generateFAQ(tool),
            relatedTools: generateRelatedTools(index)
        };

        blogPosts.push(post);
    });
});

// 5. Write to File
const fileContent = `import { BlogPost } from '../types/BlogPost';

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};
`;

const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');
fs.writeFileSync(outputPath, fileContent);

console.log(`Successfully generated ${blogPosts.length} blog posts at ${outputPath}`);
