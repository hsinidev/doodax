const fs = require('fs');
const path = require('path');

// Get all tool files from src/tools
const toolsDir = path.join(__dirname, '../src/tools');
const toolFiles = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.tsx') && !f.includes('index'))
    .map(f => f.replace('.tsx', ''));

console.log(`Found ${toolFiles.length} tool files in src/tools/\n`);

// Read current ToolDefinitions.ts to see what's already there
const toolDefsPath = path.join(__dirname, '../src/utils/ToolDefinitions.ts');
const toolDefsContent = fs.readFileSync(toolDefsPath, 'utf8');

// Extract existing tool fileNames
const existingTools = [];
const fileNameRegex = /fileName:\s*'([^']+)'/g;
let match;
while ((match = fileNameRegex.exec(toolDefsContent)) !== null) {
    existingTools.push(match[1]);
}

console.log(`Found ${existingTools.length} tools already in ToolDefinitions.ts\n`);

// Find missing tools
const missingTools = toolFiles.filter(tool => !existingTools.includes(tool));

console.log(`Missing ${missingTools.length} tools:\n`);
missingTools.forEach((tool, i) => {
    console.log(`${i + 1}. ${tool}`);
});

// Generate tool definitions for missing tools
const toolDefinitions = missingTools.map(fileName => {
    const name = fileName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Determine category based on file name patterns
    let category = 'Utilities';
    if (fileName.includes('calculator') || fileName.includes('budget') || fileName.includes('mortgage') || fileName.includes('debt') || fileName.includes('savings') || fileName.includes('paycheck') || fileName.includes('investment') || fileName.includes('rental') || fileName.includes('retirement') || fileName.includes('net-worth') || fileName.includes('vat') || fileName.includes('tip')) {
        category = 'Finance';
    } else if (fileName.includes('image') || fileName.includes('photo') || fileName.includes('favicon')) {
        category = 'Image & Video';
    } else if (fileName.includes('text') || fileName.includes('markdown') || fileName.includes('character') || fileName.includes('word')) {
        category = 'Reading & Writing';
    } else if (fileName.includes('time') || fileName.includes('date') || fileName.includes('clock') || fileName.includes('countdown') || fileName.includes('holiday')) {
        category = 'Time & Date';
    } else if (fileName.includes('ai-') || fileName.includes('generator') && (fileName.includes('blog') || fileName.includes('cover') || fileName.includes('caption') || fileName.includes('video'))) {
        category = 'AI Tools';
    } else if (fileName.includes('business') || fileName.includes('invoice') || fileName.includes('resume') || fileName.includes('meeting') || fileName.includes('proposal') || fileName.includes('nda') || fileName.includes('will') || fileName.includes('foia') || fileName.includes('letter')) {
        category = 'Business & Productivity';
    } else if (fileName.includes('permit') || fileName.includes('court') || fileName.includes('dmv') || fileName.includes('voter') || fileName.includes('clerk') || fileName.includes('notary') || fileName.includes('claims')) {
        category = 'Legal & Government';
    }

    const role = `${name} tool`;

    return `    { name: '${name}', role: '${role}', coreTechnology: 'React', fileName: '${fileName}', icon: placeholderIcon, category: '${category}' },`;
}).join('\n');

console.log('\n' + '='.repeat(60));
console.log('Generated tool definitions:');
console.log('='.repeat(60));
console.log(toolDefinitions);
console.log('\n' + '='.repeat(60));
console.log('\nAdd these lines to ToolDefinitions.ts before the "...generatedTools" line');
