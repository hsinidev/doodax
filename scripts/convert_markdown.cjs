const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/blogPosts.ts');

function convertMarkdownToHtml(markdown) {
    let html = markdown;

    // 1. Convert Headers
    // Note: We process from h4 to h2 to avoid partial matches if we were careless, 
    // but regex anchors help.
    // #### Heading -> <h4>Heading</h4>
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    // ### Heading -> <h3>Heading</h3>
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    // ## Heading -> <h2>Heading</h2>
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');

    // 2. Convert Bold
    // **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // 3. Convert Lists
    // Find blocks of list items
    // This regex looks for one or more lines starting with "* "
    html = html.replace(/(?:^\*\s+.+(?:\r?\n|$))+/gm, (match) => {
        const items = match.trim().split(/\r?\n/);
        const listItems = items.map(item => {
            // Remove "* " and wrap in <li>
            return `<li>${item.replace(/^\*\s+/, '')}</li>`;
        }).join('');
        return `<ul>${listItems}</ul>`;
    });

    // 4. Paragraphs
    // Convert double newlines to <p> tags.
    // We need to be careful not to wrap headers or lists in <p> tags if they are already handled.
    // But typically, text separated by \n\n should be a paragraph.
    // A simple approach is to split by \n\n and wrap anything that isn't already an HTML tag block.
    // However, the user specifically asked: "Convert two consecutive line breaks (\n\n) into paragraph tags (<p>)."

    // Let's try a replacement strategy.
    // First, normalize newlines
    html = html.replace(/\r\n/g, '\n');

    // Split by double newlines
    const blocks = html.split(/\n\n+/);

    const processedBlocks = blocks.map(block => {
        block = block.trim();
        if (!block) return '';

        // If it starts with an HTML block tag, assume it's already formatted
        if (block.match(/^<(h[2-6]|ul|ol|li|p|div|blockquote)/i)) {
            return block;
        }

        // Otherwise wrap in <p>
        return `<p>${block}</p>`;
    });

    html = processedBlocks.join('\n\n');

    // 5. Sanitize / Cleanup
    // Remove residual *** or #### if any (though regex above should handle headers)
    // User mentioned "***".
    html = html.replace(/\*\*\*/g, '');

    // Fix any potential empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    return html;
}

function processFile() {
    if (!fs.existsSync(targetFile)) {
        console.error(`File not found: ${targetFile}`);
        return;
    }

    const content = fs.readFileSync(targetFile, 'utf8');

    // Extract JSON part
    // The file structure is: export const blogPosts: BlogPost[] = [...];
    const match = content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);\s*$/);

    if (!match) {
        console.error("Could not find blogPosts array in file.");
        return;
    }

    const jsonString = match[1];
    let blogPosts;

    try {
        blogPosts = JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON content:", e.message);
        return;
    }

    console.log(`Processing ${blogPosts.length} articles...`);

    let modifiedCount = 0;
    blogPosts.forEach(post => {
        if (post.content) {
            const original = post.content;
            const converted = convertMarkdownToHtml(original);
            if (original !== converted) {
                post.content = converted;
                modifiedCount++;
            }
        }
    });

    console.log(`Converted content for ${modifiedCount} articles.`);

    // Write back
    const newContent = `import { BlogPost } from '../types/BlogPost';

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};
`;

    fs.writeFileSync(targetFile, newContent);
    console.log("File updated successfully.");
}

processFile();
