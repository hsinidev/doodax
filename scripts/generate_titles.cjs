const fs = require('fs');
const path = require('path');

// Read tools from GeneratedTools.ts
const toolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
const toolsContent = fs.readFileSync(toolsPath, 'utf8');

const tools = [];
const toolRegex = /"name":\s*"([^"]+)",\s*"role":\s*"([^"]+)"/g;
let match;
while ((match = toolRegex.exec(toolsContent)) !== null) {
    tools.push({ name: match[1], role: match[2] });
}

console.log(`Found ${tools.length} tools\n`);

// Article title templates
const titleTemplates = [
    (tool) => `How to Use ${tool} to Boost Your Productivity`,
    (tool) => `${tool}: Complete Guide for Beginners and Experts`,
    (tool) => `Top 10 Ways to Use ${tool} Effectively`,
    (tool) => `${tool} Best Practices and Expert Tips`,
    (tool) => `Why ${tool} is Essential for Modern Workflows`,
    (tool) => `${tool}: Features, Benefits, and Use Cases`,
    (tool) => `Mastering ${tool}: A Step-by-Step Tutorial`,
    (tool) => `${tool} vs Alternatives: Which is Better?`,
    (tool) => `Common Mistakes to Avoid When Using ${tool}`,
    (tool) => `${tool}: Everything You Need to Know`
];

const titles = [];
let titleIndex = 1;

// Generate 2-3 titles per tool to reach 210
for (let i = 0; i < tools.length && titles.length < 210; i++) {
    const tool = tools[i];
    const titlesPerTool = i < 70 ? 3 : 2;

    for (let j = 0; j < titlesPerTool && titles.length < 210; j++) {
        const template = titleTemplates[(i + j) % titleTemplates.length];
        const title = template(tool.name);
        titles.push(`${titleIndex}. ${title}`);
        titleIndex++;
    }
}

// Save to file
const outputPath = path.join(__dirname, '../blog_titles.txt');
fs.writeFileSync(outputPath, titles.join('\n'));

console.log(`✅ Generated ${titles.length} article titles`);
console.log(`📁 Saved to: ${outputPath}`);
console.log('\nFirst 10 titles:');
titles.slice(0, 10).forEach(title => console.log(title));
