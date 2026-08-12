const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../doodax blog');
const targetFile = path.join(__dirname, '../src/data/blogPosts.ts');

function cleanJsonContent(content) {
    let fixed = content;

    // 1. Fix multiline strings in content_body
    // We capture the body and escape characters inside it.
    const contentBodyRegex = /("content_body"\s*:\s*")([\s\S]*?)("\s*,\s*"(?:faq|schema_ld|relatedTools|meta_description|slug|title)")/g;

    fixed = fixed.replace(contentBodyRegex, (match, start, body, end) => {
        // Replace literal newlines with \n
        let newBody = body.replace(/\r?\n/g, '\\n');

        // Escape unescaped double quotes. 
        // We look for " that is NOT preceded by \
        newBody = newBody.replace(/(?<!\\)"/g, '\\"');

        return start + newBody + end;
    });

    // 2. Fix invalid escape sequences
    fixed = fixed.replace(/\\_/g, '_');
    fixed = fixed.replace(/\\%/g, '%');
    fixed = fixed.replace(/\\\$/g, '$');

    // Fix generic invalid escapes: backslash followed by something that isn't a valid escape char
    // Valid: " \ / b f n r t u
    // We use a negative lookahead to find invalid ones. 
    fixed = fixed.replace(/\\(?![/u"\\bfnrt])/g, '');

    return fixed;
}

function parseBatchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Attempt 1: Parse as is
    try {
        return JSON.parse(content);
    } catch (e) { }

    // Attempt 2: Apply cleaning fixes
    let fixedContent = cleanJsonContent(content);
    try {
        return JSON.parse(fixedContent);
    } catch (e) {
        // Attempt 3: Handle Truncated JSON
        // If the file ends abruptly, we might be missing closing brackets.
        // Or if it cuts off in the middle of an object.
        // We can try to find the last closing object '},' or '}' and cut off there.

        // Look for the last occurrence of "  }," or "}" at the start of a line (heuristically)
        // or just the last "}"
        const lastObjectEnd = fixedContent.lastIndexOf('  },');
        if (lastObjectEnd > 0) {
            // Find the last separator between objects
            const lastSeparator = fixedContent.lastIndexOf('\n  },');
            if (lastSeparator !== -1) {
                const recovered = fixedContent.substring(0, lastSeparator) + '\n  }\n]';
                try {
                    console.warn(`Attempting to recover truncated file ${path.basename(filePath)}...`);
                    return JSON.parse(recovered);
                } catch (e2) {
                    // console.warn(`Recovery failed: ${e2.message}`);
                }
            }
        }

        console.warn(`Failed to parse ${path.basename(filePath)}: ${e.message}`);
        return [];
    }
}

function inferCategory(title) {
    const t = title.toLowerCase();
    if (t.includes('how to')) return 'Guides';
    if (t.includes('vs') || t.includes('versus')) return 'Comparisons';
    if (t.includes('top 10') || t.includes('best')) return 'Tips & Tricks';
    if (t.includes('guide')) return 'Tutorials';
    if (t.includes('understand') || t.includes('what is')) return 'Tech Deep Dive';
    return 'Insights';
}

function migrate() {
    const allPosts = [];
    let idCounter = 1;

    // Read Batch-1 to Batch-21
    for (let i = 1; i <= 21; i++) {
        const fileName = `Batch-${i}.json`;
        const filePath = path.join(sourceDir, fileName);

        if (!fs.existsSync(filePath)) {
            console.warn(`Warning: ${fileName} not found.`);
            continue;
        }

        const batchData = parseBatchFile(filePath);

        if (!Array.isArray(batchData)) {
            console.warn(`Warning: ${fileName} did not return an array.`);
            continue;
        }

        batchData.forEach(item => {
            // Map to BlogPost interface
            const post = {
                id: String(idCounter++),
                title: item.title,
                slug: item.slug,
                excerpt: item.meta_description || '',
                content: item.content_body || '',
                author: "Doodax Team",
                date: item.schema_ld?.datePublished || new Date().toISOString(),
                category: inferCategory(item.title),
                tags: item.schema_ld?.keywords || [],
                faq: item.faq || [],
                relatedTools: [] // Placeholder
            };

            // Fix Schema Logo URL
            if (item.schema_ld && item.schema_ld.publisher && item.schema_ld.publisher.logo) {
                item.schema_ld.publisher.logo.url = "https://doodax.com/logo.png";
            }

            allPosts.push(post);
        });
    }

    // Generate TypeScript content
    const tsContent = `import { BlogPost } from '../types/BlogPost';

export const blogPosts: BlogPost[] = ${JSON.stringify(allPosts, null, 4)};
`;

    fs.writeFileSync(targetFile, tsContent);
    console.log(`Successfully migrated ${allPosts.length} posts to ${targetFile}`);
}

migrate();
