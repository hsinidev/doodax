const fs = require('fs');
const path = require('path');

// Count tools in GeneratedTools.ts
const generatedToolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
const generatedContent = fs.readFileSync(generatedToolsPath, 'utf8');
const generatedMatches = generatedContent.match(/"name":/g);
const generatedCount = generatedMatches ? generatedMatches.length : 0;

// Count manual tools in ToolDefinitions.ts
const toolDefsPath = path.join(__dirname, '../src/utils/ToolDefinitions.ts');
const toolDefsContent = fs.readFileSync(toolDefsPath, 'utf8');
const manualMatches = toolDefsContent.match(/{ name:/g);
const manualCount = manualMatches ? manualMatches.length : 0;

// Count physical tool directories
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

console.log('='.repeat(60));
console.log('TOOL COUNT ANALYSIS');
console.log('='.repeat(60));
console.log(`\n📊 GeneratedTools.ts: ${generatedCount} tools`);
console.log(`📊 ToolDefinitions.ts (manual): ${manualCount} tools`);
console.log(`📊 Physical directories: ${physicalTools.size} unique tool folders`);
console.log(`\n📈 Total in code: ${generatedCount + manualCount} tools`);
console.log(`📈 Expected total: ${manualCount + physicalTools.size} tools`);
console.log(`\n❓ Missing: ${physicalTools.size - generatedCount} tools from GeneratedTools.ts`);

if (generatedCount < physicalTools.size) {
    console.log('\n⚠️  WARNING: GeneratedTools.ts has fewer tools than physical directories!');
    console.log('   This means some tools are not being displayed on the home page.');
}

console.log('\n' + '='.repeat(60));
