const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const baseUrl = 'https://doodax.com';

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Read tools from GeneratedTools.ts
const generatedToolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
const generatedContent = fs.readFileSync(generatedToolsPath, 'utf8');

const staticTools = [];
const fileNameRegex = /"fileName":\s*"([^"]+)"/g;
let match;
while ((match = fileNameRegex.exec(generatedContent)) !== null) {
    staticTools.push(match[1]);
}

// Read manual tools from ToolDefinitions.ts
const toolDefsPath = path.join(__dirname, '../src/utils/ToolDefinitions.ts');
const toolDefsContent = fs.readFileSync(toolDefsPath, 'utf8');

const manualTools = [];
const manualToolRegex = /fileName:\s*'([^']+)'/g;
while ((match = manualToolRegex.exec(toolDefsContent)) !== null) {
    manualTools.push(match[1]);
}

// Read blog posts from blogPosts.ts
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
let blogPosts = [];
if (fs.existsSync(blogPostsPath)) {
    const blogContent = fs.readFileSync(blogPostsPath, 'utf8');
    // Extract JSON array using regex
    const match = blogContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);\s*$/);
    if (match) {
        try {
            blogPosts = JSON.parse(match[1]);
        } catch (e) {
            console.warn('Failed to parse blog posts JSON:', e.message);
        }
    }
}

// Define static pages
const staticPages = [
    { url: '', priority: '1.0' }, // Home
    { url: 'blog', priority: '0.8' }, // Blog Index
];

// Function to escape XML entities
const escapeXml = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

const generateSitemap = () => {
    const currentDate = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    staticPages.forEach(page => {
        xml += `  <url>
    <loc>${escapeXml(baseUrl + '/' + page.url)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Add static tools (from GeneratedTools.ts) - use /tools/ path
    staticTools.forEach(tool => {
        xml += `  <url>
    <loc>${escapeXml(baseUrl + '/tools/' + tool + '/index.html')}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Add manual/dynamic tools (from ToolDefinitions.ts) - use /tool/ path
    manualTools.forEach(tool => {
        xml += `  <url>
    <loc>${escapeXml(baseUrl + '/tool/' + tool)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Add blog posts
    blogPosts.forEach(post => {
        xml += `  <url>
    <loc>${escapeXml(baseUrl + '/blog/' + post.slug)}</loc>
    <lastmod>${post.date || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

    xml += `</urlset>`;

    fs.writeFileSync(sitemapPath, xml);

    // Also write to dist if it exists
    const distDir = path.join(__dirname, '../dist');
    if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
        console.log(`📁 Also wrote to: ${path.join(distDir, 'sitemap.xml')}`);
    }

    const totalUrls = staticPages.length + staticTools.length + manualTools.length + blogPosts.length;
    console.log('='.repeat(60));
    console.log('SITEMAP GENERATED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log(`📁 Location: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${totalUrls}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Static tools (/tools/): ${staticTools.length}`);
    console.log(`   - Dynamic tools (/tool/): ${manualTools.length}`);
    console.log(`   - Blog posts: ${blogPosts.length}`);
    console.log('='.repeat(60));
};

generateSitemap();
