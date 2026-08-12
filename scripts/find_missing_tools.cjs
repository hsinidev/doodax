const fs = require('fs');
const path = require('path');

// Get all physical tool directories
const toolsDirs = [
    path.join(__dirname, '../tools'),
    path.join(__dirname, '../public/tools')
];

let physicalTools = new Set();
toolsDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        const subdirs = fs.readdirSync(dir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        subdirs.forEach(name => physicalTools.add(name));
    }
});

// Get tools from GeneratedTools.ts
const generatedToolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
const generatedContent = fs.readFileSync(generatedToolsPath, 'utf8');
const generatedTools = new Set();
const fileNameRegex = /"fileName":\s*"([^"]+)"/g;
let match;
while ((match = fileNameRegex.exec(generatedContent)) !== null) {
    generatedTools.add(match[1]);
}

// Find missing tools
const missingTools = [];
physicalTools.forEach(tool => {
    if (!generatedTools.has(tool)) {
        missingTools.push(tool);
    }
});

console.log('='.repeat(60));
console.log('MISSING TOOLS ANALYSIS');
console.log('='.repeat(60));
console.log(`\n📊 Physical directories: ${physicalTools.size} tools`);
console.log(`📊 GeneratedTools.ts: ${generatedTools.size} tools`);
console.log(`\n❌ Missing from GeneratedTools.ts: ${missingTools.length} tools\n`);

if (missingTools.length > 0) {
    console.log('Missing tools:');
    missingTools.forEach((tool, i) => {
        console.log(`  ${i + 1}. ${tool}`);
    });
} else {
    console.log('✅ All physical tools are in GeneratedTools.ts!');
}

console.log('\n' + '='.repeat(60));
