const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../tools');
const publicToolsDir = path.join(__dirname, '../public/tools');
const outputTsFile = path.join(__dirname, '../src/utils/GeneratedTools.ts');

// Ensure public/tools exists
if (!fs.existsSync(publicToolsDir)) {
    fs.mkdirSync(publicToolsDir, { recursive: true });
}

const generatedTools = [];

// Get all subdirectories in tools folder
const folders = fs.readdirSync(toolsDir).filter(f => {
    const fullPath = path.join(toolsDir, f);
    return fs.statSync(fullPath).isDirectory();
});

console.log(`Found ${folders.length} folders in tools directory.`);

folders.forEach(folder => {
    const srcPath = path.join(toolsDir, folder);
    const destPath = path.join(publicToolsDir, folder);

    // Check for index.html to confirm it's a valid tool
    if (!fs.existsSync(path.join(srcPath, 'index.html'))) {
        console.warn(`Skipping ${folder}: No index.html found.`);
        return;
    }

    // Copy folder to public/tools
    try {
        // Remove destination if it exists to ensure clean copy
        if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true });
        }
        fs.cpSync(srcPath, destPath, { recursive: true });
    } catch (err) {
        console.error(`Error copying ${folder}:`, err);
        return;
    }

    // Find SVG Icon
    let svgContent = '';
    let iconPath = null;

    // Priority 1: Check root for any .svg (excluding favicon.svg if possible, but user said "an SVG file inside each folder")
    const rootSvgs = fs.readdirSync(srcPath).filter(f => f.endsWith('.svg'));
    // Try to find one that isn't favicon.svg, otherwise take whatever is there
    const mainSvg = rootSvgs.find(f => f !== 'favicon.svg') || rootSvgs[0];

    if (mainSvg) {
        iconPath = path.join(srcPath, mainSvg);
    } else {
        // Priority 2: Check assets folder
        const assetsPath = path.join(srcPath, 'assets');
        if (fs.existsSync(assetsPath)) {
            const assetSvgs = fs.readdirSync(assetsPath).filter(f => f.endsWith('.svg'));
            if (assetSvgs.length > 0) {
                iconPath = path.join(assetsPath, assetSvgs[0]);
            }
        }
    }

    if (iconPath) {
        try {
            svgContent = fs.readFileSync(iconPath, 'utf-8');
            // Basic cleanup of SVG string if needed (e.g., removing <?xml...?>)
            svgContent = svgContent.replace(/<\?xml.*?\?>/, '').trim();
        } catch (err) {
            console.error(`Error reading SVG for ${folder}:`, err);
        }
    } else {
        console.warn(`No SVG found for ${folder}, using placeholder.`);
        // Default placeholder icon
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`;
    }

    // Generate Metadata
    const name = folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Categorize
    let category = 'Utilities';
    const lowerName = name.toLowerCase();
    if (lowerName.includes('calculator') || lowerName.includes('finance') || lowerName.includes('money') || lowerName.includes('debt') || lowerName.includes('payoff') || lowerName.includes('inflation') || lowerName.includes('mortgage') || lowerName.includes('loan')) category = 'Finance & Calculators';
    else if (lowerName.includes('image') || lowerName.includes('photo') || lowerName.includes('video') || lowerName.includes('youtube') || lowerName.includes('thumbnail') || lowerName.includes('cropper') || lowerName.includes('resizer')) category = 'Image & Video';
    else if (lowerName.includes('text') || lowerName.includes('word') || lowerName.includes('pdf') || lowerName.includes('markdown') || lowerName.includes('readability') || lowerName.includes('summarizer') || lowerName.includes('scriptwriter')) category = 'Reading & Writing';
    else if (lowerName.includes('seo') || lowerName.includes('web') || lowerName.includes('css') || lowerName.includes('html') || lowerName.includes('json') || lowerName.includes('domain') || lowerName.includes('dns') || lowerName.includes('speed') || lowerName.includes('redirect') || lowerName.includes('link') || lowerName.includes('minifier') || lowerName.includes('formatter')) category = 'Web Dev';
    else if (lowerName.includes('generator') || lowerName.includes('maker') || lowerName.includes('business') || lowerName.includes('resume') || lowerName.includes('letter') || lowerName.includes('proposal') || lowerName.includes('invoice') || lowerName.includes('permit')) category = 'Business & Productivity';
    else if (lowerName.includes('time') || lowerName.includes('date') || lowerName.includes('clock') || lowerName.includes('countdown') || lowerName.includes('calendar') || lowerName.includes('age')) category = 'Time & Date';
    else if (lowerName.includes('legal') || lowerName.includes('law') || lowerName.includes('foia') || lowerName.includes('will') || lowerName.includes('claim') || lowerName.includes('notary')) category = 'Legal & Public Services';
    else if (lowerName.includes('ai') || lowerName.includes('gpt') || lowerName.includes('bot') || lowerName.includes('llm') || lowerName.includes('prompt')) category = 'AI & Content';

    generatedTools.push({
        name,
        role: `Online ${name} Tool`, // Simple role
        coreTechnology: 'HTML/JS',
        fileName: folder,
        icon: svgContent,
        category,
        isStatic: true
    });
});

const fileContent = `import { Tool } from './types';

export const generatedTools: Tool[] = ${JSON.stringify(generatedTools, null, 4)};
`;

fs.writeFileSync(outputTsFile, fileContent);
console.log(`Successfully processed ${generatedTools.length} tools and generated ${outputTsFile}`);
