const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../tools');
const publicToolsDir = path.join(__dirname, '../public/tools');
const outputFile = path.join(__dirname, '../missing_tools.json');

// Helper to format tool name from directory name
function formatToolName(dirName) {
    return dirName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function scanTools() {
    const tools = [];
    const seen = new Set();

    // Check both directories
    const dirsToCheck = [toolsDir, publicToolsDir];

    dirsToCheck.forEach(dir => {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);
        items.forEach(item => {
            const itemPath = path.join(dir, item);
            if (fs.statSync(itemPath).isDirectory()) {
                // Check for index.html
                if (fs.existsSync(path.join(itemPath, 'index.html'))) {
                    if (!seen.has(item)) {
                        seen.add(item);
                        tools.push({
                            name: formatToolName(item),
                            role: formatToolName(item) + " Tool", // Placeholder
                            coreTechnology: "HTML/JS",
                            fileName: item,
                            icon: "<span>🔧</span>", // Placeholder
                            category: "Utilities", // Placeholder
                            isStatic: true
                        });
                    }
                }
            }
        });
    });

    console.log(`Found ${tools.length} tools.`);
    fs.writeFileSync(outputFile, JSON.stringify(tools, null, 2));
    console.log(`Wrote list to ${outputFile}`);
}

scanTools();
