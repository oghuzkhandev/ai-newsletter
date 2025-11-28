# 🚀 AI Newsletter Automation Platform  
An advanced, fully automated AI-powered newsletter generation and distribution platform built using **Next.js**, **Node.js**, **OpenAI**, **Prisma**, **PostgreSQL**, **MongoDB (optional)**, **Upstash QStash**, and **Resend**.  
Designed as a premium SaaS product with an exceptional developer experience, strong architecture, and beautifully animated UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-20-43853d?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-336791?style=for-the-badge&logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-Optional-4ea94b?style=for-the-badge&logo=mongodb)
![OpenAI](https://img.shields.io/badge/OpenAI-AI_SDK-412991?style=for-the-badge&logo=openai)
![Resend](https://img.shields.io/badge/Resend-Email_API-ea4335?style=for-the-badge)
![QStash](https://img.shields.io/badge/Upstash-QStash-00e9a5?style=for-the-badge)

---

# 🌟 Overview

This platform automates the entire process of building a personalized AI-driven newsletter.  
From fetching RSS feeds → analyzing articles → summarizing content with AI → formatting newsletters → scheduling → delivering emails.

Everything works **without human intervention**.

### Key Highlights
- ✨ Fully automated content generation
- 🔁 Cron-based delivery pipeline
- 📡 Advanced RSS management system
- 🤖 Multi-model AI summarization & prompt engine
- 📧 Stunning email templates
- 🖥 Fully-featured dashboard
- 🎨 Premium landing page with 3D/animated UI
- 🔐 Authentication, user settings, and payment-ready SaaS structure

---

# 🚀 Features

## 🤖 AI Processing Engine  
- Article clustering & relevance detection  
- Multi-source text extraction  
- AI summarization pipeline (OpenAI)  
- Dynamic prompt chaining  
- Tone/style configuration  
- Real-time AI streaming  

## 📰 RSS Engine  
- Add / remove / reorder feeds  
- Feed validation with error reporting  
- Background refresh  
- Individual article scoring  
- Auto-deduplication  

## 🧠 Automation (Backend — Node.js)  
- Scheduled newsletter cron  
- QStash-based queue processing  
- Safe retries & atomic newsletter generation  
- Sync jobs for feeds & settings  
- Logging, status tracking & analytics  

## 📧 Newsletter Delivery  
- Resend transactional email API  
- Clean, responsive HTML templates  
- Delivery history & analytics  
- Personalized content per user  

## 🔐 Authentication & User System  
- Clerk auth system  
- Profile & preferences  
- Feed list per user  
- Newsletter timing settings  
- Admin mode  

## 🎨 Stunning UI/UX  
- Hero animations  
- Infinite moving cards  
- Interactive categories showcase  
- Bento grids  
- Smooth framer-motion transitions  
- Fully responsive layouts  

---

# 🧰 Extended Tech Stack

## **Frontend**
- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS 4
- Framer Motion
- Shadcn/UI
- next-intl (i18n)
- Three.js / R3F components (for visual effects)

## **Backend**
- Node.js 20+
- API Routes & Server Actions
- Prisma ORM
- PostgreSQL (primary)
- MongoDB (optional for caching/logging)
- QStash (distributed job scheduler)
- Resend Email API  
- RSS Parser  
- Custom cron + queue pipeline  

## **AI**
- OpenAI GPT models  
- Streaming completions  
- Multi-step summarization flow  
- Custom prompt builder  
- Topic clustering pipeline  

---

# 💾 Database

### Primary DB: PostgreSQL  
Used for:
- Users  
- Settings  
- Feeds  
- Articles  
- Newsletters  
- History  

### ORM: Prisma  
- Auto-generated client  
- Strict schema  
- Migratable migrations  

### Optional DB: MongoDB  
Used for:
- Logging  
- AI debugging  
- Temporary cache  
- Analytics  

---

# 🧠 AI Pipeline Explained

1-Fetch RSS feeds

2-Parse raw HTML

3-Extract readable content

4-Clean unwanted text

5-Chunk long articles

6-For each article:
→ OpenAI summary
→ Tone/style config

7-Build newsletter template

8- Save, Download, Send or schedule delivery

---

# ⏱ Cron Job Workflow (QStash)

Cron job Runs every 15 minutes:
→ check every user delivery times
→ check queued newsletters
→ fetch today’s feeds
→ summarize articles
→ generate final newsletter
→ email delivery
→ save to history logs

---

# 👨‍💻 About The Developer

**Oğuzhan Doğan**  
Full-Stack Developer — AI, Automation & Next.js Expert  
Passionate about clean architecture, automation, and creating polished UI/UX experiences.

🌐 Website: [oguzhandogan.com](https://oguzhandogan.com)  
📧 Email: [oguzhandogandev@hotmail.com](mailto:oguzhandogandev@hotmail.com)  
💼 LinkedIn: [linkedin.com/in/oguzhandogandev](https://linkedin.com/in/oguzhandogandev)  
🐙 GitHub: [github.com/oghuzkhandev](https://github.com/oghuzkhandev)

---

# 🤝 Contribution & Support

If you would like to contribute:

1. Fork the repository  
2. Create a feature branch  
3. Submit a pull request  

If you enjoy this project, please ⭐ star the repo!

---

# 🔐 Security Notes

- All tokens must remain private  
- QStash signatures must be validated  
- Webhooks should only accept trusted senders  
- Never commit `.env` files  

---

# 📄 License

MIT License.  
You may modify, distribute, or reuse for personal and commercial projects.
