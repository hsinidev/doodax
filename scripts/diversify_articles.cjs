const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../src/articles');

// Different article layout templates to add diversity
const templates = {
    // Template 1: Standard with code example
    addCodeExample: (content) => {
        const codeExample = `
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>`;
        return content.replace('</article>', `${codeExample}\n                </article>`);
    },

    // Template 2: Add blockquote/callout
    addCallout: (content) => {
        const callout = `
                    <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-4 my-4">
                        <p className="text-yellow-200 font-semibold">💡 Pro Tip:</p>
                        <p className="text-gray-300 mt-2">This feature can significantly improve your workflow.</p>
                    </div>`;
        return content.replace('</article>', `${callout}\n                </article>`);
    },

    // Template 3: Add comparison table
    addTable: (content) => {
        const table = `
                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-gray-700">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-700 text-cyan-400">Feature</th>
                                    <th className="px-4 py-2 border border-gray-700 text-cyan-400">Benefit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700">Fast Processing</td>
                                    <td className="px-4 py-2 border border-gray-700">Saves time</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`;
        return content.replace('</article>', `${table}\n                </article>`);
    }
};

// Different color schemes for variety
const colorSchemes = [
    { heading: 'text-cyan-400', button: 'text-cyan-400 hover:text-cyan-300' },
    { heading: 'text-emerald-400', button: 'text-emerald-400 hover:text-emerald-300' },
    { heading: 'text-blue-400', button: 'text-blue-400 hover:text-blue-300' },
    { heading: 'text-purple-400', button: 'text-purple-400 hover:text-purple-300' },
    { heading: 'text-pink-400', button: 'text-pink-400 hover:text-pink-300' },
    { heading: 'text-amber-400', button: 'text-amber-400 hover:text-amber-300' },
    { heading: 'text-rose-400', button: 'text-rose-400 hover:text-rose-300' },
    { heading: 'text-teal-400', button: 'text-teal-400 hover:text-teal-300' }
];

// Different background styles
const bgStyles = [
    'bg-gray-800/50',
    'bg-gray-800/60',
    'bg-slate-800/50',
    'bg-zinc-800/50',
    'bg-gray-900/40'
];

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function diversifyArticle(filePath, fileName) {
    let content = fs.readFileSync(filePath, 'utf8');

    const hash = hashString(fileName);
    const colorScheme = colorSchemes[hash % colorSchemes.length];
    const bgStyle = bgStyles[hash % bgStyles.length];

    // Change color scheme
    content = content.replace(/text-cyan-400/g, colorScheme.heading);
    content = content.replace(/text-cyan-400 hover:text-cyan-300/g, colorScheme.button);

    // Change background
    content = content.replace(/bg-gray-800\/50/g, bgStyle);

    // Add random template enhancement (1 in 3 articles)
    const templateKeys = Object.keys(templates);
    if (hash % 3 === 0 && templateKeys.length > 0) {
        const templateKey = templateKeys[hash % templateKeys.length];
        content = templates[templateKey](content);
    }

    // Vary the max-height for collapsed state
    const maxHeights = ['max-h-48', 'max-h-52', 'max-h-56', 'max-h-60'];
    const selectedHeight = maxHeights[hash % maxHeights.length];
    content = content.replace(/max-h-48/g, selectedHeight);

    // Vary transition duration
    const durations = ['duration-700', 'duration-500', 'duration-600'];
    const selectedDuration = durations[hash % durations.length];
    content = content.replace(/duration-700/g, selectedDuration);

    fs.writeFileSync(filePath, content);
    console.log(`✓ Diversified: ${fileName}`);
}

function processAllArticles() {
    const files = fs.readdirSync(articlesDir);
    const tsxFiles = files.filter(f => f.endsWith('.tsx'));

    console.log(`Found ${tsxFiles.length} article files to diversify...\\n`);

    tsxFiles.forEach(file => {
        const filePath = path.join(articlesDir, file);
        diversifyArticle(filePath, file);
    });

    console.log(`\\n✅ Successfully diversified ${tsxFiles.length} articles!`);
}

processAllArticles();
