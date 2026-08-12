import { GoogleGenerativeAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("Imports successful");

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    console.log(".env found");
} else {
    console.log(".env NOT found");
}

try {
    const genAI = new GoogleGenerativeAI("test-key");
    console.log("GenAI initialized");
} catch (e) {
    console.error("GenAI init failed", e);
}
