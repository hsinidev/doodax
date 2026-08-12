const fs = require('fs');
const path = require('path');

/**
 * This script helps you replace blog post content after generating articles externally.
 * 
 * INSTRUCTIONS:
 * 1. Generate your 210 articles using your alternative script
 * 2. Save each article as a JSON file in the format:
 *    {
 *      "title": "Article Title",
 *      "excerpt": "Short summary (150-160 chars)",
 *      "content": "Full HTML content with <h2>, <h3>, <p> tags",
 *      "tags": ["tag1", "tag2", "tag3"],
 *      "faq": [
 *        {"question": "Question?", "answer": "Answer"},
 *        {"question": "Question 2?", "answer": "Answer 2"}
 *      ]
 *    }
 * 3. Place all JSON files in a folder called 'generated_articles'
 * 4. Run this script: node scripts/import_articles.cjs
 */

const articlesFolder = path.join(__dirname, '../generated_articles');
const outputPath = path.join(__dirname, '../src/data/blogPosts_new.ts');

// Article categories to rotate through
const categories = ["How-To Guide", "Complete Guide", "Best Practices", "Tips & Tricks", "Expert Guide"];

function importArticles() {
    if (!fs.existsSync(articlesFolder)) {
        console.error(`❌ Folder not found: ${articlesFolder}`);
        console.log('\n📝 Please create a "generated_articles" folder and add your JSON files there.');
        return;
    }

    const files = fs.readdirSync(articlesFolder).filter(f => f.endsWith('.json'));

    if (files.length === 0) {
        console.error('❌ No JSON files found in generated_articles folder');
        return;
    }

    console.log(`📊 Found ${files.length} article files\n`);

    const articles = [];

    files.forEach((file, index) => {
        try {
            const filePath = path.join(articlesFolder, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const article = JSON.parse(content);

            // Create blog post object
            const blogPost = {
                id: `blog-${index + 1}`,
                title: article.title,
                slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                excerpt: article.excerpt,
                content: article.content,
                author: "Doodax Editorial Team",
                date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
                category: categories[index % categories.length],
                tags: article.tags || [],
                faq: article.faq || [],
                relatedTools: []
            };

            articles.push(blogPost);
            console.log(`✅ [${index + 1}/${files.length}] Imported: ${article.title}`);
        } catch (error) {
            console.error(`❌ Error importing ${file}:`, error.message);
        }
    });

    // Save to TypeScript file
    const tsContent = `import { BlogPost } from '../types/BlogPost';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(articles, null, 2)};\n`;
    fs.writeFileSync(outputPath, tsContent);

    console.log('\n' + '='.repeat(60));
    console.log('✨ IMPORT COMPLETE!');
    console.log('='.repeat(60));
    console.log(`✅ Successfully imported: ${articles.length} articles`);
    console.log(`📁 Output file: ${outputPath}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the generated blogPosts_new.ts');
    console.log('   2. If satisfied, replace blogPosts.ts with blogPosts_new.ts');
    console.log('   3. Delete blogPosts_new.ts after copying');
}

importArticles();
