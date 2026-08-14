<div align="center">
# 🚀 Doodax
### *High-Performance Autonomous Intelligence & Modular TypeScript Engine*

<p align="center">
  [![Architect](https://img.shields.io/badge/Architect-Hsini%20Mohamed-0055ff?style=for-the-badge&logo=github&logoColor=white)](https://hsini.dev)
  [![Portfolio](https://img.shields.io/badge/Portfolio-hsini.dev-00c853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://hsini.dev)
  [![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge)](https://github.com/hsinidev)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</p>

</div>

---
## 🌟 Executive Overview

**Doodax** is an enterprise-grade artificial intelligence solution engineered for low-latency reasoning, deterministic workflow automation, and high-accuracy data orchestration. Built with modern **TypeScript** and **TypeScript**, it delivers modular architecture and seamless developer ergonomics.

## ⚡ Key Highlights & Capabilities

- **Autonomous Orchestration**: Advanced state management and deterministic execution pipelines.
- **Modular Architecture**: Plug-and-play integrations with clean abstraction layers.
- **Zero-Overhead Processing**: High-throughput processing optimized for local and cloud environments.
- **Developer-First APIs**: Type-safe interfaces with comprehensive observability.

---
## 🏗️ Architecture & Technology Stack

- **Primary Language**: `TypeScript`
- **Design Pattern**: Modular Clean Architecture / Domain-Driven Design
- **License**: MIT Open Source Attribution

## 📖 Deep-Dive Technical Documentation

# 🛠️ Doodax — 100+ Free Online Tools & AI Utilities Portal



🔗 **Live Demo:** [https://doodax.com](https://doodax.com)  
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


Designed, developed, and maintained by **HSINI MOHAMED**.

- 🌐 **Website**: [https://hsini.dev](https://hsini.dev)
- 📧 **Email**: [contact@hsini.dev](mailto:contact@hsini.dev)
- 🐙 **GitHub Account**: [@hsinidev](https://github.com/hsinidev)

---

---
## 🚀 Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/hsinidev/doodax.git
cd doodax
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch the Application
```bash
npm start
```


---

## 👨‍💻 System Architect & Author

<table align="center" style="border: none; background: transparent; width: 100%;">
  <tr>
    <td align="center" width="160" style="border: none; padding: 12px;">
      <img src="https://avatars.githubusercontent.com/u/232697467?v=4" width="120" height="120" style="border-radius: 50%; box-shadow: 0 8px 24px rgba(99,102,241,0.3); border: 2.5px solid #6366f1;" alt="Hsini Mohamed" />
      <br /><br />
      <b>Hsini Mohamed</b><br />
      <sub>Morocco 🇲🇦</sub>
    </td>
    <td style="border: none; padding: 12px; vertical-align: middle;">
      <h3 style="margin-top: 0;">🚀 System Architect & Full-Stack Engineer</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #475569;">
        Specializing in high-performance autonomous AI systems, deterministic multi-agent swarms, enterprise cloud architecture, and modern full-stack engineering.
      </p>
      <p>
        <a href="https://hsini.dev"><img src="https://img.shields.io/badge/Portfolio-hsini.dev-2563eb?style=flat-square&logo=google-chrome&logoColor=white" alt="Portfolio" /></a>
        <a href="mailto:contact@hsini.dev"><img src="https://img.shields.io/badge/Email-contact@hsini.dev-ea4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
        <a href="https://github.com/hsinidev"><img src="https://img.shields.io/badge/GitHub-@hsinidev-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
        <a href="https://linkedin.com/in/hsinidev/"><img src="https://img.shields.io/badge/LinkedIn-hsinidev-0077b5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
      </p>
    </td>
  </tr>
</table>

---

## 📄 License & Attribution

This project is distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms.

<div align="center">
  <sub>⚡ Designed, architected, and maintained with engineering precision by <b><a href="https://hsini.dev">Hsini Mohamed</a></b>.</sub>
</div>
