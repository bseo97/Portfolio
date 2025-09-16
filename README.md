# Brian Seo — Portfolio

A personal website where I keep my work, experiments, and a lightweight chat that answers questions about me and my projects.

**Developer:** Brian Seo

## About

It's a Next.js app for my portfolio. You'll find a short intro, selected projects, and a simple chatbot you can ask about my background, tech stack, and what I've built. The goal: fast to load, easy to read, and easy for me (or you) to extend.

## Quick start

```bash
# 1) Install dependencies
npm install
# (or: yarn / pnpm / bun)

# 2) Run the dev server
npm run dev

# App runs at:
# http://localhost:3000
```

## Requirements (if you want to use the chatbot)

1. Install deps (`npm install`).

2. Put your LLM API key(s) in `.env.local`.

3. Adjust the intent/knowledge files to match your info:
   - `intent.js`
   - `knowledgeBase.js`
   - `data.js`

4. Install your model/client of choice (OpenAI shown below, but any LLM client works).

**Example `.env.local`:**

```bash
# Use whichever provider/model you prefer, make sure that chatbot matches the LLM model you use
OPENAI_API_KEY=sk-...
# Optional public config:
NEXT_PUBLIC_APP_NAME=Brian Seo — Portfolio
```

## Scripts

```bash
npm run dev       # Start local dev
npm run build     # Production build
npm run start     # Run the built app
npm run lint      # Lint (if configured)
```

## Customizing the chatbot

All the "who is Brian / what's this project" answers come from a tiny knowledge layer—no vector DB needed to get started.

- **`intent.js`** – lightweight routing for question types (about me, projects, contact, etc.)
- **`knowledgeBase.js`** – your facts/answers live here, gets converted into searchable chunks for the AI
- **`data.js`** – structured project portfolio data (titles, descriptions, tech stacks, links)

Swap the LLM client if you want: OpenAI, Groq, Anthropic, LM Studio, local models—just adapt the small API wrapper you'll see in the code.

## Project structure (simplified)

```
src/app/
  page.js               # Landing page
  components/           # React components
  utils/
    intent.js           # Intent routing logic
    knowledgeBase.js    # RAG knowledge extraction
  data.js               # Project portfolio data
  api/chat/
    route.js            # Chatbot API endpoint
public/
  (images, fonts)       # Static assets
.env.local              # Your API keys (not committed)
```

## Common gotchas (and fixes)

**"It won't start / weird build errors."**  
You may need to rebuild the ephemeral folders that are in `.gitignore`.

```bash
# Remove and rebuild
rm -rf .next node_modules
npm install
npm run build
```

Make sure `.gitignore` contains:

```
.next/
node_modules/
```

**API keys not found:** Verify `.env.local` exists at the project root and you restarted the dev server after edits.

## Deployment

You can deploy anywhere that supports Next.js.

- **Vercel:** Zero-config for Next.js; connect the repo and set your env vars.
- **Self-host:** `npm run build` then `npm run start` behind your reverse proxy.

Remember to set your environment variables in the hosting platform before going live.

## Why I built this

I wanted a clean place to point people to my work and a small, configurable chat that answers common questions about me without over-engineering. It's simple on purpose.

## License & reuse

All content (projects, copy, images) is mine. Feel free to use the structure as reference, but please don't copy my personal content verbatim.

## Contact

Have a question or feedback? Open an issue or ask the site's chat.  
Thanks for visiting!