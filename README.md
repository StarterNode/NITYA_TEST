# NITYA AI V1.1 - Clean Rebuild

**Interactive AI Sales Discovery System**  
Built with lightweight HTML, modular brain architecture, and centralized pricing.

---

## 🎯 What This Is

Nitya is an AI sales consultant that:
- Collects website requirements through natural conversation
- Builds live mockups section-by-section with client
- Generates structured, production-ready data for designers
- Uses progressive approval flow for psychological buy-in

**Key Innovation:** Split-screen interface where clients see their website mockup update in real-time as they answer questions.

---

## 📋 Quick Start for Claude Code

**To build this system with Claude Code:**

1. Open terminal in this directory
2. Run: `claude code`
3. Paste the contents of `CLAUDE_CODE_PROMPT.md`
4. Claude Code will build everything in stages
5. If interrupted, resume by referencing the stage number

**Build Stages:**
1. Foundation (brain modules + proxy server)
2. Split-screen interface
3. Preview system
4. File management
5. Testing

---

## 🏗️ Architecture

```
Browser (localhost:8080)
    ├── Chat Panel (left)
    └── Preview Panel (right)
         ↓
Proxy Server (localhost:3000)
    ↓
Anthropic Claude API
    ↓
Brain Modules (4 JSON files)
```

---

## 🧠 Brain Modules

**personality.json** - WHO she is  
- Character traits, tone, communication style
- Will be populated by Perplexity

**sales.json** - HOW she sells  
- Traffic light system, NLP techniques, objection handling
- Will be populated by Perplexity

**web_landing.json** - WHAT she asks  
- Discovery questions, section templates
- Will be populated by Perplexity

**pricing.json** - 💰 PRICING (THE ONLY PLACE WITH NUMBERS!)  
- $40 first month, $199 second month, $26/month ongoing
- Already populated with current offer

---

## 🚨 CRITICAL RULE

**NO PRICE NUMBERS ANYWHERE EXCEPT `pricing.json`**

This is a hard rule. All other brain modules must reference pricing.json for any pricing information.

---

## 📁 Current Files

```
NITYA_V1.1/
├── brain_modules/              ← 4 JSON brain files (templates ready)
├── CHANGELOG.md                ← Build history from V1.0
├── CLAUDE_CODE_PROMPT.md       ← Complete build instructions
├── config.js                   ← API key + settings
├── global.css                  ← Design tokens
├── favicon.ico                 ← StarterNode icon
├── NITYA.md                    ← Complete vision document
└── README.md                   ← This file
```

**To be created by Claude Code:**
- `public/` (HTML, CSS, JS)
- `server/` (Node.js proxy + routes)
- `prospects/` (auto-generated user data)

---

## 🎨 Design System

Uses existing design tokens from `global.css`:

**Brand Colors:**
- Primary: #440DC3 → #00bf63 (purple to green gradient)
- Success: #00bf63
- Error: #ea5a37
- Warning: #ffcb01

**Typography:**
- Heading: SF Pro Display / system-ui
- Body: SF Pro Text / system-ui

---

## 🔧 How to Run (After Build)

### Terminal 1: Proxy Server
```bash
npm install
npm start
```

### Terminal 2: Static Files
```bash
cd public
python -m http.server 8080
```

### Access
Open: `http://localhost:8080`

---

## 📚 Documentation

- **CLAUDE_CODE_PROMPT.md** - Complete build instructions for Claude Code
- **NITYA.md** - Full vision, strategy, and technical specs
- **CHANGELOG.md** - Build history and lessons learned

---

## 🎓 Key Principles

1. **Modular brain** = Easy to scale to new services
2. **Centralized pricing** = Change prices in one place
3. **Lightweight HTML** = No framework bloat
4. **Structured output** = Designers get clear requirements
5. **Progressive approval** = Psychological buy-in

---

## 🚀 Next Steps

1. **Build the system:** Use Claude Code with `CLAUDE_CODE_PROMPT.md`
2. **Populate brain modules:** Use Perplexity to fill personality, sales, and web_landing
3. **Test the flow:** Run through discovery process
4. **Iterate:** Refine questions and preview templates

---

## 📞 Need Help?

- Check `CLAUDE_CODE_PROMPT.md` for detailed instructions
- Review `NITYA.md` for strategy and vision
- Look at `CHANGELOG.md` for lessons from V1.0

---

**Version:** 1.1  
**Build Date:** October 17, 2025  
**Status:** Ready for Claude Code execution

---

*Keep it modular. Keep it lightweight. Keep pricing centralized.*
