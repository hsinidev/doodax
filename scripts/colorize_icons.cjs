const fs = require('fs');
const path = require('path');

const generatedToolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');

// Tailwind-ish Palette (500 and 600 shades)
const palette = [
    { name: 'Red', primary: '#ef4444', secondary: '#dc2626' },
    { name: 'Orange', primary: '#f97316', secondary: '#ea580c' },
    { name: 'Amber', primary: '#f59e0b', secondary: '#d97706' },
    { name: 'Yellow', primary: '#eab308', secondary: '#ca8a04' },
    { name: 'Lime', primary: '#84cc16', secondary: '#65a30d' },
    { name: 'Green', primary: '#22c55e', secondary: '#16a34a' },
    { name: 'Emerald', primary: '#10b981', secondary: '#059669' },
    { name: 'Teal', primary: '#14b8a6', secondary: '#0d9488' },
    { name: 'Cyan', primary: '#06b6d4', secondary: '#0891b2' },
    { name: 'Sky', primary: '#0ea5e9', secondary: '#0284c7' },
    { name: 'Blue', primary: '#3b82f6', secondary: '#2563eb' },
    { name: 'Indigo', primary: '#6366f1', secondary: '#4f46e5' },
    { name: 'Violet', primary: '#8b5cf6', secondary: '#7c3aed' },
    { name: 'Purple', primary: '#a855f7', secondary: '#9333ea' },
    { name: 'Fuchsia', primary: '#d946ef', secondary: '#c026d3' },
    { name: 'Pink', primary: '#ec4899', secondary: '#db2777' },
    { name: 'Rose', primary: '#f43f5e', secondary: '#e11d48' }
];

function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function colorizeIcons() {
    let content = fs.readFileSync(generatedToolsPath, 'utf8');

    const match = content.match(/export const generatedTools: Tool\[\] = \[\s*([\s\S]*?)\];/);
    if (!match) {
        console.error("Could not parse GeneratedTools.ts");
        return;
    }

    let toolsArrayStr = match[1];

    // Split by "}," to isolate objects
    let toolBlocks = toolsArrayStr.split('},\n    {');

    if (toolBlocks.length > 1) {
        toolBlocks[0] = toolBlocks[0].replace(/^\s*{/, '');
        toolBlocks[toolBlocks.length - 1] = toolBlocks[toolBlocks.length - 1].replace(/}\s*$/, '');
    } else {
        toolBlocks[0] = toolBlocks[0].replace(/^\s*{/, '').replace(/}\s*$/, '');
    }

    let newToolsStr = "";

    toolBlocks.forEach((block, index) => {
        let fullBlock = `{${block}}`;

        const nameMatch = fullBlock.match(/name:\s*"([^"]+)"/);
        const name = nameMatch ? nameMatch[1] : `tool-${index}`;

        const colorIndex = getHash(name) % palette.length;
        const colors = palette[colorIndex];

        const iconMatch = fullBlock.match(/icon:\s*"([^"]+)"/);
        if (iconMatch) {
            let iconStr = iconMatch[1];

            const backgrounds = ['#0f172a', '#1e293b', '#030712', '#1B2735', '#090A0F', '#000000', '#111827'];

            // Replace hex codes
            iconStr = iconStr.replace(/#[0-9a-fA-F]{6}/g, (match) => {
                if (backgrounds.includes(match.toLowerCase())) return match;
                if (match.toLowerCase() === '#ffffff') return match;
                return colors.primary;
            });

            // Handle gradient stops
            let stopCount = 0;
            iconStr = iconStr.replace(/stop-color:\\?"(#[0-9a-fA-F]{6})\\?"/g, (match, hex) => {
                if (backgrounds.includes(hex.toLowerCase()) || hex.toLowerCase() === '#ffffff') return match;
                stopCount++;
                return `stop-color="${stopCount % 2 === 1 ? colors.primary : colors.secondary}"`;
            });

            stopCount = 0;
            iconStr = iconStr.replace(/style=\\?"stop-color:(#[0-9a-fA-F]{6})[^"]*\\?"/g, (match, hex) => {
                if (backgrounds.includes(hex.toLowerCase()) || hex.toLowerCase() === '#ffffff') return match;
                stopCount++;
                return `style="stop-color:${stopCount % 2 === 1 ? colors.primary : colors.secondary};stop-opacity:1"`;
            });

            fullBlock = fullBlock.replace(/icon:\s*"[^"]+"/, `icon: "${iconStr}"`);
        }

        newToolsStr += "    " + fullBlock + (index < toolBlocks.length - 1 ? ",\n    " : "\n");
    });

    const newContent = content.replace(/export const generatedTools: Tool\[\] = \[\s*([\s\S]*?)\];/, `export const generatedTools: Tool[] = [\n${newToolsStr}];`);

    fs.writeFileSync(generatedToolsPath, newContent);
    console.log("Icons colorized successfully.");
}

colorizeIcons();
