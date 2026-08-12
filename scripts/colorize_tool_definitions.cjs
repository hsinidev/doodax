const fs = require('fs');
const path = require('path');

const toolDefinitionsPath = path.join(__dirname, '../src/utils/ToolDefinitions.ts');

const palette = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
];

function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function colorizeToolDefinitions() {
    let content = fs.readFileSync(toolDefinitionsPath, 'utf8');

    // Regex to find icon definitions
    // const someIcon = `...`
    const iconDefRegex = /(const\s+(\w+Icon)\s*=\s*`)([\s\S]*?)(`;)/g;

    const newContent = content.replace(iconDefRegex, (match, prefix, varName, svgContent, suffix) => {
        // Pick a color based on variable name
        const colorIndex = getHash(varName) % palette.length;
        const colorName = palette[colorIndex];

        // Replace text-gray-400 with text-[color]-500
        // Also remove group-hover:text-white if we want the color to stay? 
        // Or maybe make hover text-[color]-400?
        // The original was: text-gray-400 group-hover:text-white
        // Let's make it: text-[color]-500 group-hover:text-[color]-400

        let newSvgContent = svgContent.replace(/text-gray-400/g, `text-${colorName}-500`);
        newSvgContent = newSvgContent.replace(/group-hover:text-white/g, `group-hover:text-${colorName}-400`);

        // Some icons might not have text-gray-400 but use stroke="currentColor"
        // If text-gray-400 is NOT found, we might need to inject the class?
        // But looking at the file, most seem to have it.

        return `${prefix}${newSvgContent}${suffix}`;
    });

    fs.writeFileSync(toolDefinitionsPath, newContent);
    console.log("ToolDefinitions icons colorized.");
}

colorizeToolDefinitions();
