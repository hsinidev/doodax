const fs = require('fs');
const path = require('path');

// Ollama API endpoint (default local installation)
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'gpt-oss:120b-cloud'; // Using GPT-OSS cloud model

const articleTypes = [
    {
        type: "How-To Guide",
        prompt: (toolName, toolRole) => `Write a comprehensive how-to guide about "${toolName}" (${toolRole}). Include step-by-step instructions, best practices, common mistakes to avoid, and expert tips. Make it practical and actionable. Focus on real-world usage scenarios.`
    },
    {
        type: "Benefits & Features",
        prompt: (toolName, toolRole) => `Write an in-depth article about the benefits and features of "${toolName}" (${toolRole}). Explain what makes it valuable, who should use it, and how it solves specific problems. Include use cases and comparisons with alternative methods.`
    },
    {
        type: "Complete Guide",
        prompt: (toolName, toolRole) => `Write a complete beginner-to-advanced guide for "${toolName}" (${toolRole}). Cover the basics, intermediate techniques, and advanced features. Include examples, screenshots descriptions, and troubleshooting tips.`
    },
    {
        type: "Use Cases & Applications",
        prompt: (toolName, toolRole) => `Write an article exploring various use cases and real-world applications of "${toolName}" (${toolRole}). Provide specific examples from different industries, professions, or scenarios. Make it relatable and practical.`
    },
    {
        type: "Tips & Best Practices",
        prompt: (toolName, toolRole) => `Write an article sharing expert tips, tricks, and best practices for using "${toolName}" (${toolRole}). Include productivity hacks, time-saving techniques, and professional insights. Make it valuable for both beginners and experienced users.`
    }
];

async function generateArticle(toolName, toolRole, articleType, index) {
    const prompt = `${articleType.prompt(toolName, toolRole)}

IMPORTANT REQUIREMENTS:
1. Write 800-1200 words of completely unique, original content
2. Use natural, conversational language - avoid corporate jargon
3. Include specific examples and scenarios
4. Structure with clear H2 and H3 headings
5. Add practical tips and actionable advice
6. Make it SEO-friendly with relevant keywords naturally integrated
7. Write in a helpful, expert tone

OUTPUT FORMAT (JSON):
{
  "title": "Engaging, SEO-friendly title (60-70 characters)",
  "excerpt": "Compelling 150-160 character summary",
  "content": "Full HTML article content with <h2>, <h3>, <p>, <ul>, <ol>, <strong>, <em> tags. NO <h1> tags. Start with engaging introduction paragraph.",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "faq": [
    {"question": "Relevant question about ${toolName}?", "answer": "Detailed answer"},
    {"question": "Another specific question?", "answer": "Helpful answer"},
    {"question": "Common user question?", "answer": "Clear answer"}
  ]
}

Write ONLY the JSON, no markdown code blocks or extra text.`;

    try {
        const response = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.9,
                    num_predict: 2048
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        let text = data.response;

        // Clean up response
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const article = JSON.parse(text);

        return {
            id: `blog-${index}`,
            title: article.title,
            slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            excerpt: article.excerpt,
            content: article.content,
            author: "Doodax Editorial Team",
            date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            category: articleType.type,
            tags: article.tags,
            faq: article.faq,
            relatedTools: []
        };
    } catch (error) {
        console.error(`❌ Error generating article for ${toolName}:`, error.message);
        return null;
    }
}

async function main() {
    console.log("🚀 Starting blog post generation with Ollama...\n");
    console.log(`📡 Using Ollama model: ${MODEL_NAME}`);
    console.log(`🔗 API endpoint: ${OLLAMA_API_URL}\n`);

    const toolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
    const toolsContent = fs.readFileSync(toolsPath, 'utf8');

    const tools = [];
    const toolRegex = /"name":\s*"([^"]+)",\s*"role":\s*"([^"]+)"/g;
    let match;
    while ((match = toolRegex.exec(toolsContent)) !== null) {
        tools.push({ name: match[1], role: match[2] });
    }

    console.log(`📊 Found ${tools.length} tools\n`);

    const outputPath = path.join(__dirname, '../src/data/blogPosts_new.ts');
    const articles = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < tools.length && articles.length < 210; i++) {
        const tool = tools[i];
        const articlesPerTool = i < 70 ? 3 : 2;

        for (let j = 0; j < articlesPerTool && articles.length < 210; j++) {
            const articleType = articleTypes[(i + j) % articleTypes.length];
            const articleNum = articles.length + 1;

            console.log(`📝 [${articleNum}/210] Generating ${articleType.type} for "${tool.name}"...`);

            const article = await generateArticle(tool.name, tool.role, articleType, articleNum);

            if (article) {
                articles.push(article);
                successCount++;
                console.log(`   ✅ Success: "${article.title}"`);

                if (articles.length % 10 === 0) {
                    const tempContent = `import { BlogPost } from '../types/BlogPost';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(articles, null, 2)};\n`;
                    fs.writeFileSync(outputPath, tempContent);
                    console.log(`   💾 Progress saved (${articles.length} articles)\n`);
                }
            } else {
                failCount++;
                console.log(`   ❌ Failed\n`);
            }

            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    const finalContent = `import { BlogPost } from '../types/BlogPost';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(articles, null, 2)};\n`;
    fs.writeFileSync(outputPath, finalContent);

    console.log("\n" + "=".repeat(60));
    console.log("✨ GENERATION COMPLETE!");
    console.log("=".repeat(60));
    console.log(`✅ Successfully generated: ${successCount} articles`);
    console.log(`❌ Failed: ${failCount} articles`);
    console.log(`📁 Output file: ${outputPath}`);
    console.log("\n💡 Next steps:");
    console.log("   1. Review the generated articles in blogPosts_new.ts");
    console.log("   2. If satisfied, replace blogPosts.ts with blogPosts_new.ts");
    console.log("   3. Delete blogPosts_new.ts after copying");
}

main().catch(console.error);
