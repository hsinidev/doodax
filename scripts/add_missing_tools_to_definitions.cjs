const fs = require('fs');
const path = require('path');

// Get all tool files from src/tools
const toolsDir = path.join(__dirname, '../src/tools');
const toolFiles = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.tsx') && !f.includes('index') && !f.includes('ApiKeyInput') && !f.includes('BlogIndex') && !f.includes('BlogPostTemplate'))
    .map(f => f.replace('.tsx', ''));

// Read current ToolDefinitions.ts
const toolDefsPath = path.join(__dirname, '../src/utils/ToolDefinitions.ts');
let toolDefsContent = fs.readFileSync(toolDefsPath, 'utf8');

// Extract existing tool fileNames
const existingTools = [];
const fileNameRegex = /fileName:\s*'([^']+)'/g;
let match;
while ((match = fileNameRegex.exec(toolDefsContent)) !== null) {
    existingTools.push(match[1]);
}

// Find missing tools
const missingTools = toolFiles.filter(tool => !existingTools.includes(tool));

console.log(`Adding ${missingTools.length} missing tools to ToolDefinitions.ts\n`);

// Generate tool definitions
const toolDefinitions = missingTools.map(fileName => {
    const name = fileName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Determine category
    let category = 'Utilities';
    if (fileName.includes('calculator') || fileName.includes('budget') || fileName.includes('mortgage') || fileName.includes('debt') || fileName.includes('savings') || fileName.includes('paycheck') || fileName.includes('investment') || fileName.includes('rental') || fileName.includes('retirement') || fileName.includes('net-worth') || fileName.includes('vat') || fileName.includes('tip') || fileName.includes('bmi') || fileName.includes('break-even') || fileName.includes('inflation') || fileName.includes('percentage')) {
        category = 'Finance';
    } else if (fileName.includes('image') || fileName.includes('photo') || fileName.includes('favicon')) {
        category = 'Image & Video';
    } else if (fileName.includes('text') || fileName.includes('markdown') || fileName.includes('character') || fileName.includes('word') || fileName.includes('readability')) {
        category = 'Reading & Writing';
    } else if (fileName.includes('time') || fileName.includes('date') || fileName.includes('clock') || fileName.includes('countdown') || fileName.includes('holiday') || fileName.includes('age')) {
        category = 'Time & Date';
    } else if (fileName.includes('ai-') || fileName.includes('caption') || fileName.includes('video-idea') || fileName.includes('blog-post-title')) {
        category = 'AI Tools';
    } else if (fileName.includes('business') || fileName.includes('invoice') || fileName.includes('resume') || fileName.includes('meeting') || fileName.includes('proposal') || fileName.includes('nda') || fileName.includes('will') || fileName.includes('foia') || fileName.includes('letter') || fileName.includes('cover-letter')) {
        category = 'Business & Productivity';
    } else if (fileName.includes('permit') || fileName.includes('court') || fileName.includes('dmv') || fileName.includes('voter') || fileName.includes('clerk') || fileName.includes('notary') || fileName.includes('claims') || fileName.includes('local-permit')) {
        category = 'Legal & Government';
    } else if (fileName.includes('currency') || fileName.includes('recipe') || fileName.includes('file-size')) {
        category = 'Converters';
    } else if (fileName.includes('stock') || fileName.includes('sentiment') || fileName.includes('summarizer') || fileName.includes('tweet') || fileName.includes('whiteboard')) {
        category = 'Utilities';
    }

    const role = `${name} tool`;

    return `    { name: '${name}', role: '${role}', coreTechnology: 'React', fileName: '${fileName}', icon: placeholderIcon, category: '${category}' },`;
}).join('\n');

// Find the line with "...generatedTools" and insert before it
const generatedToolsLine = toolDefsContent.indexOf('    ...generatedTools');
if (generatedToolsLine === -1) {
    console.error('Could not find ...generatedTools line');
    process.exit(1);
}

// Insert the new tool definitions
const before = toolDefsContent.substring(0, generatedToolsLine);
const after = toolDefsContent.substring(generatedToolsLine);
const newContent = before + '\n' + toolDefinitions + '\n\n' + after;

// Write back
fs.writeFileSync(toolDefsPath, newContent);

console.log(`✅ Successfully added ${missingTools.length} tools to ToolDefinitions.ts`);
console.log('\nTools added:');
missingTools.forEach((tool, i) => {
    console.log(`  ${i + 1}. ${tool}`);
});
