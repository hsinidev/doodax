const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../tools');
const homeLinkHtml = `
    <!-- Back to Home Link -->
    <a href="https://doodax.com" class="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group" style="text-decoration: none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform">
        <path d="m12 19-7-7 7-7"/>
        <path d="M19 12H5"/>
      </svg>
      <span class="text-sm font-medium">Back to Home</span>
    </a>
`;

function addHomeLink() {
    if (!fs.existsSync(toolsDir)) {
        console.error(`Tools directory not found: ${toolsDir}`);
        return;
    }

    const tools = fs.readdirSync(toolsDir);
    let updatedCount = 0;
    let skippedCount = 0;

    tools.forEach(tool => {
        const toolDir = path.join(toolsDir, tool);
        const indexHtmlPath = path.join(toolDir, 'index.html');

        if (fs.statSync(toolDir).isDirectory() && fs.existsSync(indexHtmlPath)) {
            let content = fs.readFileSync(indexHtmlPath, 'utf8');

            if (content.includes('href="https://doodax.com"')) {
                console.log(`Skipping ${tool}: Link already exists.`);
                skippedCount++;
                return;
            }

            // Inject before </body> or append if missing
            if (content.includes('</body>')) {
                content = content.replace('</body>', `${homeLinkHtml}\n  </body>`);
                fs.writeFileSync(indexHtmlPath, content, 'utf8');
                console.log(`Updated ${tool}`);
                updatedCount++;
            } else {
                console.warn(`Warning: No </body> tag found in ${tool}/index.html. Appending to end.`);
                content += `\n${homeLinkHtml}`;
                fs.writeFileSync(indexHtmlPath, content, 'utf8');
                console.log(`Updated ${tool} (Appended)`);
                updatedCount++;
            }
        }
    });

    console.log(`\nSummary:`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Skipped: ${skippedCount}`);
}

addHomeLink();
