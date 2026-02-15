<p align="center">
  <img src="https://img.shields.io/badge/Version-2026.1-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License">
</p>

<h1 align="center">⚡ Spark AI Builder</h1>
<p align="center"><strong>Open Source AI-Powered Development Dashboard</strong></p>
<p align="center">A modern, professional UI for AI-assisted software development</p>

---

## 🚀 What is Spark AI Builder?

Spark AI Builder is an **Open Source** dashboard UI for AI-assisted development. It provides a beautiful, intuitive interface for interacting with AI models to generate and preview code.

### Current Features
- ✅ **Professional UI Dashboard** - Dark/Light mode, collapsible sidebar
- ✅ **AI Chat Interface** - Interactive chat with simulated AI responses
- ✅ **Live Preview** - Device toggle (Desktop/Tablet/Mobile)
- ✅ **Block System** - Pre-built component blocks
- ✅ **Modern Stack** - Next.js 16, React 19, Tailwind CSS v4, shadcn/ui

### 🚧 In Development
- 🔄 **Real LLM Integration** - Connect to actual AI models
- 🔄 **Multi-Agent System** - Specialized AI agents
- 🔄 **Code Generation** - Generate actual code from prompts

---

## 🤖 Planned Model Support

### 🇨🇳 Chinese Models (Primary Priority)
| Model | Provider | Use Case |
|-------|----------|----------|
| DeepSeek V3.2 | DeepSeek | Coding, Algorithms |
| Qwen3-Max | Alibaba | Enterprise |
| Kimi K2.5 | Moonshot AI | Long Context |
| GLM-5 | Zhipu AI | General |
| Yi-Coder | 01.AI | Coding |

### 🌍 International Models (Fallback)
| Model | Provider | Use Case |
|-------|----------|----------|
| GPT-5.2 | OpenAI | Multimodal |
| Claude Opus 4.6 | Anthropic | Code Review |
| Gemini 3 Flash | Google | Long Context |

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/apnapriyanshu/Spark.git
cd Spark

# Install dependencies
bun install

# Setup environment
cp .env .env.local
# Edit .env.local with your API keys

# Setup database
bun run db:generate
bun run db:push

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

---

## 🎯 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Framework |
| React 19 | UI Library |
| Tailwind CSS v4 | Styling |
| shadcn/ui | Components |
| Prisma | Database ORM |
| SQLite | Database |

---

## 📁 Project Structure

```
Spark/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main Dashboard
│   │   ├── layout.tsx        # Root Layout
│   │   ├── globals.css       # Global Styles
│   │   └── api/              # API Routes
│   └── components/           # UI Components
├── prisma/
│   └── schema.prisma         # Database Schema
├── public/                   # Static Assets
└── package.json
```

---

## 💖 Support the Project

Spark AI Builder is **100% free and open source**. If this project helps you, consider supporting:

### 💰 Donate Crypto

| Network | Address |
|---------|---------|
| **USDT (BEP20)** | `0x5411920bb3325e49447484c22fb17b8052444ea6` |
| **BTC (BTC Chain)** | `3QMGi2wtsa8MMrDuo7fTRypxSi5rGmGJj1` |
| **SOL (Solana)** | `G3pedCQ5yYPhLq7NYYYBuKXFHWiM76kGESLt1g8K2hFf` |

### ⭐ Star the Repo

If you find Spark useful, please give it a star on GitHub!

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <strong>Built with ❤️ by the Spark AI Team</strong>
</p>
