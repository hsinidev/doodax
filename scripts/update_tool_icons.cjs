const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');
const toolDefsPath = path.join(__dirname, '../src/utils/ToolDefinitions.ts');

// Color palette for icons
const colors = [
    { name: 'cyan', from: '#06b6d4', to: '#3b82f6' },
    { name: 'emerald', from: '#10b981', to: '#14b8a6' },
    { name: 'purple', from: '#a855f7', to: '#ec4899' },
    { name: 'orange', from: '#f97316', to: '#ef4444' },
    { name: 'blue', from: '#3b82f6', to: '#8b5cf6' },
    { name: 'pink', from: '#ec4899', to: '#f43f5e' },
    { name: 'teal', from: '#14b8a6', to: '#06b6d4' },
    { name: 'amber', from: '#f59e0b', to: '#f97316' },
    { name: 'rose', from: '#f43f5e', to: '#ec4899' },
    { name: 'indigo', from: '#6366f1', to: '#8b5cf6' },
    { name: 'green', from: '#22c55e', to: '#10b981' },
    { name: 'yellow', from: '#eab308', to: '#f59e0b' }
];

// Hash function to get consistent color for each tool
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

// Read ToolDefinitions.ts
let toolDefsContent = fs.readFileSync(toolDefsPath, 'utf8');

// Find all tools with placeholderIcon
const toolRegex = /{\s*name:\s*'([^']+)',\s*role:\s*'([^']+)',\s*coreTechnology:\s*'([^']+)',\s*fileName:\s*'([^']+)',\s*icon:\s*placeholderIcon,\s*category:\s*'([^']+)'\s*}/g;

let match;
const toolsToUpdate = [];

while ((match = toolRegex.exec(toolDefsContent)) !== null) {
    toolsToUpdate.push({
        fullMatch: match[0],
        name: match[1],
        role: match[2],
        coreTechnology: match[3],
        fileName: match[4],
        category: match[5]
    });
}

console.log(`Found ${toolsToUpdate.length} tools with placeholder icons\n`);

// Track icon definitions to add at the top
const iconDefinitions = [];
let updatedCount = 0;

toolsToUpdate.forEach((tool, index) => {
    const svgPath = path.join(assetsDir, `${tool.fileName}.svg`);

    if (fs.existsSync(svgPath)) {
        // Read SVG file
        let svgContent = fs.readFileSync(svgPath, 'utf8');

        // Get color for this tool
        const colorIndex = hashString(tool.fileName) % colors.length;
        const color = colors[colorIndex];

        // Clean up SVG - make it inline-friendly
        svgContent = svgContent
            .replace(/<\?xml[^>]*\?>/g, '')
            .replace(/<!DOCTYPE[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        // Add gradient to SVG if it doesn't have one
        if (!svgContent.includes('linearGradient') && !svgContent.includes('gradient')) {
            // Add gradient definition and apply to paths/shapes
            const gradientId = `grad-${tool.fileName.toLowerCase()}`;
            const gradientDef = `<defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color.from};stop-opacity:1" /><stop offset="100%" style="stop-color:${color.to};stop-opacity:1" /></linearGradient></defs>`;

            // Insert gradient after opening svg tag
            svgContent = svgContent.replace(/(<svg[^>]*>)/, `$1${gradientDef}`);

            // Apply gradient to fill and stroke
            svgContent = svgContent
                .replace(/fill="[^"]*"/g, `fill="url(#${gradientId})"`)
                .replace(/stroke="[^"]*"/g, `stroke="url(#${gradientId})"`);
        }

        // Create icon constant name
        const iconConstName = tool.fileName.split('-').map(word =>
            word.charAt(0).toLowerCase() + word.slice(1)
        ).join('') + 'Icon';

        // Add icon definition
        iconDefinitions.push(`const ${iconConstName} = \`${svgContent}\`;`);

        // Replace in tool definition
        const newToolDef = tool.fullMatch.replace('placeholderIcon', iconConstName);
        toolDefsContent = toolDefsContent.replace(tool.fullMatch, newToolDef);

        updatedCount++;
        console.log(`✅ ${updatedCount}. ${tool.name} → ${color.name} gradient`);
    } else {
        console.log(`⚠️  No SVG found for: ${tool.fileName}`);
    }
});

// Add icon definitions after the existing icon definitions
const iconSectionEnd = toolDefsContent.indexOf('\n\nexport const tools');
if (iconSectionEnd !== -1) {
    const iconDefsText = '\n// ---- COLORFUL TOOL ICONS ----\n' + iconDefinitions.join('\n') + '\n';
    toolDefsContent = toolDefsContent.slice(0, iconSectionEnd) + iconDefsText + toolDefsContent.slice(iconSectionEnd);
}

// Write back
fs.writeFileSync(toolDefsPath, toolDefsContent);

console.log(`\n✅ Successfully updated ${updatedCount} tool icons with colorful SVGs!`);
console.log(`📁 Updated: ${toolDefsPath}`);
