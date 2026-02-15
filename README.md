<p align="center">
  <img src="https://img.shields.io/badge/Version-2026.1-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Status-Active-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License">
</p>

<h1 align="center">⚡ Spark AI Builder</h1>
<p align="center"><strong>Open Source AI-Powered Development Dashboard</strong></p>
<p align="center">A modern, professional UI for AI-assisted software development</p>

---

## 🚀 What is Spark AI Builder?

Spark AI Builder is an **Open Source** dashboard UI for AI-assisted development. It provides a beautiful, intuitive interface for interacting with AI models to generate and preview code.

### ✅ Current Features
- **Professional UI Dashboard** - Dark/Light mode, collapsible sidebar
- **AI Chat Interface** - Interactive chat with AI responses
- **Live Preview** - Device toggle (Desktop/Tablet/Mobile)
- **Block System** - Pre-built component blocks (Hero, Features, Pricing, CTA, Testimonials)
- **Theme System** - Auto theme generator with gradient presets
- **Modern Stack** - Next.js 16, React 19, Tailwind CSS v4, shadcn/ui
- **Model Registry API** - 32+ AI model configurations ready to use

### ✅ Completed Features
- **Real LLM Integration** - Connect to actual AI models via API routes
- **Multi-Model Support** - Chinese & International models configured
- **Dynamic Model Registry** - Add any model via API without code changes
- **Cost Optimized** - 70% Chinese models for 10x cost savings

---

## 🤖 Supported Models

### Chinese Models (Primary - 70%)
| Model | Provider | Use Case | Price/1K |
|-------|----------|----------|----------|
| DeepSeek V3.2 | DeepSeek | Coding, Algorithms | $0.0003 |
| DeepSeek R1 | DeepSeek | Deep Reasoning | $0.0005 |
| Qwen3-Max | Alibaba | Enterprise | $0.0005 |
| Qwen3-Coder | Alibaba | Full-stack | $0.0004 |
| Kimi K2.5 | Moonshot AI | Long Context (2M) | $0.008 |
| GLM-5 | Zhipu AI | General | $0.002 |
| Yi-Coder | 01.AI | Coding | $0.0003 |
| Doubao 2.0 | ByteDance | Content | $0.003 |
| MiniMax m2.5 | MiniMax | Multimodal | $0.005 |

### International Models (Fallback - 30%)
| Model | Provider | Use Case | Price/1K |
|-------|----------|----------|----------|
| GPT-5.2 | OpenAI | Multimodal | $0.00175 |
| Claude Opus 4.6 | Anthropic | Code Review | $0.005 |
| Gemini 3 Flash | Google | Long Context | FREE |
| Grok 3 | xAI | Real-time | $0.002 |

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/apnapriyanshu/Spark.git
cd Spark

# Install dependencies
bun install

# Setup environment
cp .env.example .env.local
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
│   │       └── models/       # Model Registry API
│   └── components/           # UI Components
├── prisma/
│   └── schema.prisma         # Database Schema
├── public/                   # Static Assets
└── .zscripts/                # Build Scripts
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/models` | GET | List all models |
| `/api/models` | POST | Add new model |
| `/api/models` | DELETE | Remove model |
| `/api/models/quick-add/[provider]` | POST | Quick add by provider |

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
