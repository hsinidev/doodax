import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .env manually
const envPath = path.join(__dirname, '../.env');
let apiKey = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
}

if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generatedToolsPath = path.join(__dirname, '../src/utils/GeneratedTools.ts');
const outputPath = path.join(__dirname, '../src/data/generated_posts.json');

// Helper to extract tools from TS file
function getTools() {
    const content = fs.readFileSync(generatedToolsPath, 'utf8');
    const match = content.match(/export const generatedTools: Tool\[\] = \[\s*([\s\S]*?)\];/);
    if (!match) return [];
    
    const tools = [];
    const toolRegex = /name:\s*'([^']*)',\s*role:\s*'([^']*)'/g;
    let toolMatch;
    while ((toolMatch = toolRegex.exec(match[1])) !== null) {
        tools.push({ name: toolMatch[1], role: toolMatch[2] });
    }
    return tools;
}

async function generatePost(tool, type, index) {
    const prompt = `
    Write a comprehensive, SEO-optimized blog post about the tool "${tool.name}" which is used for "${tool.role}".
    
    The post should be of type "${type}" (e.g., "How-to Guide", "Benefits", "Use Cases").
    
    Output strictly valid JSON with the following structure:
    {
        "title": "Catchy Title",
        "slug": "url-friendly-slug-based-on-title",
        "excerpt": "Short engaging summary (approx 150 chars)",
        "content": "HTML content of the article. Use <h2>, <p>, <ul>, <li> tags. Do NOT use <h1> or <html> or <body>. Make it detailed and helpful.",
        "category": "${type}",
        "tags": ["tag1", "tag2", "tag3"],
        "faq": [
            { "question": "Q1", "answer": "A1" },
            { "question": "Q2", "answer": "A2" }
        ]
    }
    Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const post = JSON.parse(text);
        
        // Add metadata
        post.id = `gen-${Date.now()}-${index}`;
        post.author = "Doodax Team";
        post.date = new Date().toISOString();
        post.relatedTools = []; 

        return post;
    } catch (error) {
        console.error(`Error generating post for ${tool.name}:`, error);
        return null;
    }
}

async function main() {
    const tools = getTools();
    console.log(`Found ${tools.length} tools.`);
    
    let posts = [];
    if (fs.existsSync(outputPath)) {
        try {
            posts = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
            console.log(`Loaded ${posts.length} existing posts.`);
        } catch (e) {
            console.log("Could not load existing posts, starting fresh.");
        }
    }

    const targetPosts = 205;
    let createdCount = 0;

    const types = ["Guides", "Insights", "Tips & Tricks", "Tech Deep Dive", "Tutorials"];

    for (let i = 0; i < tools.length; i++) {
        if (posts.length >= targetPosts) break;

        const tool = tools[i];
        
        for (let j = 0; j < 2; j++) {
            if (posts.length >= targetPosts) break;

            const type = types[(i + j) % types.length];
            console.log(`Generating post ${posts.length + 1}/${targetPosts}: ${tool.name} (${type})...`);
            
            const post = await generatePost(tool, type, i * 2 + j);
            if (post) {
                posts.push(post);
                createdCount++;
                if (createdCount % 5 === 0) {
                    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 4));
                    console.log("Saved progress.");
                }
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 4));
    console.log(`Done! Generated ${createdCount} new posts. Total: ${posts.length}`);
}

main();
