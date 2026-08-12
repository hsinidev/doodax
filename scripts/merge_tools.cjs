const fs = require('fs');
const path = require('path');

const generatedToolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
const missingToolsPath = path.join(__dirname, '../missing_tools.json');

function mergeTools() {
    const missingTools = JSON.parse(fs.readFileSync(missingToolsPath, 'utf8'));
    let generatedToolsContent = fs.readFileSync(generatedToolsPath, 'utf8');

    // Extract the array content using regex
    const match = generatedToolsContent.match(/export const generatedTools: Tool\[\] = \[\s*([\s\S]*?)\];/);
    if (!match) {
        console.error("Could not parse GeneratedTools.ts");
        return;
    }

    const currentToolsStr = "[" + match[1] + "]";
    // This might fail if the file content is not valid JSON (it's TS).
    // So we'll do a simpler check: by fileName.

    // We will append new tools to the array string.
    let newToolsCount = 0;
    let addedContent = "";

    missingTools.forEach(tool => {
        // Check if fileName exists in the content
        if (!generatedToolsContent.includes(`"${tool.fileName}"`)) {
            console.log(`Adding missing tool: ${tool.name}`);
            const toolStr = JSON.stringify(tool, null, 4);
            addedContent += `    ${toolStr},\n`;
            newToolsCount++;
        }
    });

    if (newToolsCount > 0) {
        // Insert before the closing bracket
        const lastBracketIndex = generatedToolsContent.lastIndexOf('];');
        const newContent = generatedToolsContent.substring(0, lastBracketIndex) + addedContent + generatedToolsContent.substring(lastBracketIndex);
        fs.writeFileSync(generatedToolsPath, newContent);
        console.log(`Added ${newToolsCount} new tools.`);
    } else {
        console.log("No new tools to add.");
    }
}

mergeTools();
