# 🛠️ Doodax — 100+ Free Online Tools & AI Utilities Portal

[![Live Demo](https://img.shields.io/badge/Live_Demo-doodax.com-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://doodax.com)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-AI_SDK-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Speedtest-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A high-performance, modular web application platform delivering 100+ free online tools across AI content generation, web developer utilities, network diagnostics, financial calculators, document generators, image manipulation, and privacy tools. Engineered with React 19, TypeScript, Vite, Tailwind CSS, Google Gemini API, and Cloudflare Speedtest integration.

🔗 **Live Demo:** [https://doodax.com](https://doodax.com)  
🌐 **Developer Website:** [https://hsini.dev](https://hsini.dev)  
👤 **Maintained by:** [Mohamed Hsini](https://hsini.dev) (`contact@hsini.dev`)

---

## 🌟 Key Features & Capabilities

- 🧰 **100+ Production-Ready Web Tools**:
  - **Web Development**: JSON Formatter/Validator, Base64 Encoder/Decoder, CSS Minifier/Beautifier, HTML/JS/SQL Formatters, Regex Tester, DNS Lookup, Meta Tag Generator, and User Agent Finder.
  - **AI & Content Suite**: AI Blog Post Title Generator, Image Caption Generator, Simple Sentiment Analyzer, Text Summarizer, Tweet & Social Post Rewriter powered by **Google Gemini AI SDK**.
  - **Network & System Diagnostics**: Internet Speed Test (powered by `@cloudflare/speedtest`), Website Speed Analyzer, Website Down Detector, Domain Availability Checker, and URL Redirect Tester.
  - **Finance & Business**: Mortgage Amortization Calculator, Inflation Calculator, Break-Even Point Calculator, Investment Return Calculator, Invoice Generator, and Paycheck Calculator.
  - **Document & Legal Generators**: Cover Letter Generator, Resume/CV Maker, FOIA Request Generator, Project Proposal Generator, Simple NDA Generator, and Will Template Generator.
  - **Image & Design Utilities**: Social Media Image Resizer, Favicon Generator, Image to Base64 Converter, Passport Photo Resizer, Image File Optimizer, and Color Contrast Checker.
- 🤖 **Google Gemini AI Integration**: Native SDK integration (`@google/genai`) for real-time generative text, title creation, and image caption analysis.
- ⚡ **Low-Latency Performance & Dynamic Imports**: Utilizes `React.lazy()` dynamic module loading for 100+ tool components and custom `ErrorBoundary` fallbacks to minimize bundle size.
- 🎨 **Immersive Galaxy Design System**: Dark-mode visual architecture with glassmorphic cards, gradient accents, responsive search indexing, and modal interaction drawers.
- 🔍 **Instant Search & Multi-Category Filtering**: Real-time client-side indexing across 100+ tools with category tags (Web Dev, AI, Finance, Time, Utilities, etc.).
- 📰 **Built-In Blog & SEO Engine**: Comprehensive SEO article integration per tool with structured JSON-LD schema markup, sitemap generation, and blog reader layouts.

---

## 🛠️ Technology Stack

| Category | Technology / Library | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19.2.0 | Next-gen React UI framework with concurrent features |
| **Build Tooling** | Vite 6.2.0 | High-performance HMR development server & production bundler |
| **Language** | TypeScript 5.8.2 | End-to-end type safety, interfaces, and tool state contracts |
| **Styling** | Tailwind CSS | Modern utility-first responsive styling and CSS animations |
| **AI Integration** | `@google/genai` (v1.29.1) | Official Google Gemini AI SDK integration |
| **Network Engine** | `@cloudflare/speedtest` (v1.7) | Client-side speed test and latency measurement library |
| **SEO & Schema** | JSON-LD & OpenGraph | Structured microdata schema for maximum search visibility |

---

## 📁 Project Directory Structure

```
doodax/
├── 📁 components/               # Core shell & layout components
│   ├── 📄 FAQ.tsx              # Frequently Asked Questions accordion
│   ├── 📄 SearchResults.tsx    # Live tool search results component
│   ├── 📄 ThemeLayout.tsx     # Global layout, navigation header & galaxy theme
│   └── 📄 ToolGrid.tsx         # Category grid & responsive tool card layout
├── 📁 src/                     # Source application logic
│   ├── 📁 articles/            # SEO article content for each tool
│   ├── 📁 components/          # Specialized UI components & blog loaders
│   ├── 📁 tools/               # 100+ Individual tool React components
│   │   ├── 📄 AI-Blog-Post-Title-Generator.tsx
│   │   ├── 📄 Internet-Speed-Test.tsx
│   │   ├── 📄 JSON-Formatter-Validator.tsx
│   │   ├── 📄 Resume-CV-Maker.tsx
│   │   └── ... (90+ additional tool components)
│   └── 📁 utils/               # Definitions, types & mock data
│       ├── 📄 GeneratedTools.ts
│       ├── 📄 ToolDefinitions.ts
│       └── 📄 types.ts
├── 📁 public/                  # Static web assets, robots.txt, sitemap.xml
├── 📄 App.tsx                  # Client router, dynamic tool loader & error boundaries
├── 📄 index.html               # Main HTML entry point & font loading
├── 📄 index.tsx                # React DOM root entry point
├── 📄 package.json             # Project dependencies and npm build scripts
├── 📄 tailwind.config.js       # Tailwind CSS custom theme settings
├── 📄 tsconfig.json            # TypeScript compiler configuration
└── 📄 vite.config.ts           # Vite build configuration & server settings
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have the following tools installed on your system:
- **Node.js**: `v18.x` or `v20.x`+
- **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`

### 2. Clone the Repository
```bash
git clone https://github.com/hsinidev/doodax.git
cd doodax
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory (optional for Gemini AI features):
```env
# Google Gemini API Key for AI Tools
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to test the portal.

---

## 📦 Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with instant HMR |
| `npm run build` | Compiles optimized production bundle to the `/dist` folder |
| `npm run preview` | Serves the production build locally for verification |

---

## 🔒 Security & Privacy

- **100% Client-Side Processing**: Data entered into client-side utilities (such as Base64 conversion, password generation, JSON validation, and text counters) stays strictly within the browser.
- **Isolated API Credentials**: AI credentials pass securely through environment variables and client-isolated storage.
- **Runtime Type Guarding**: Built with strict TypeScript schemas to prevent runtime errors and invalid state states.

---

## ✒️ Author & Credits

Designed, developed, and maintained by **HSINI MOHAMED**.

- 🌐 **Website**: [https://hsini.dev](https://hsini.dev)
- 📧 **Email**: [contact@hsini.dev](mailto:contact@hsini.dev)
- 🐙 **GitHub Account**: [@hsinidev](https://github.com/hsinidev)

---

## 📜 License

This project is open-source software licensed under the terms of the [MIT License](LICENSE).
