# NITYA V1.1 - Lead Design Consultant System

**Intelligent Requirements Gathering & Designer Handoff**  
Built with lightweight HTML, modular brain architecture, and folder-based output.

---

## 🎯 What This Is

Nitya is StarterNode's Lead Design Consultant - a requirements gathering system that **replaces Calendly** with intelligent intake.

**What Nitya Does:**
- Collects website requirements through natural conversation
- Fills prospect folders with structured data (sitemap.json, metadata.json, styles.css, assets)
- Generates turnkey designer handoff packages
- Uses interactive preview for client co-creation

**What Nitya Doesn't Do:**
- Build the actual website (that's for human designers)
- Replace designers (she enables them to work faster)

**Key Innovation:** Every conversation fills a folder with everything designers need to build without guessing.

---

## 📁 The Folder System

### What Gets Created

When a user chats with Nitya, a folder is filled:

```
/prospects/UID_12345/
├── sitemap.json          ← Pages they need
├── metadata.json         ← Business info, domain, social URLs
├── styles.css            ← Brand colors, fonts, reference site
├── assets/
│   ├── icons/
│   │   └── logo.png      ← Their logo
│   └── images/
│       └── [photos]      ← All uploaded images
└── conversation.json     ← Full chat history
```

### Designer Handoff

Designers receive a complete folder:
- Open folder → Read files → Import data → Build site
- No guessing, no back-and-forth, just clarity

---

## 🧠 Brain Modules

**personality.json** - WHO she is  
- Character traits, tone, communication style
- 22-year-old from Texas with wedding sales background

**sales.json** - HOW she sells  
- Traffic light system, NLP techniques, objection handling
- One question at a time (concise mode)

**web_landing.json** - WHAT she asks  
- Discovery questions, section templates
- Pages, business info, style preferences

**pricing.json** - 💰 PRICING (THE ONLY PLACE WITH NUMBERS!)  
- $40 first month, $199 second month, $26/month ongoing
- Payment options and timelines

---

## 🚨 CRITICAL RULES

1. **NO PRICE NUMBERS ANYWHERE EXCEPT `pricing.json`**
2. **Nitya is "Lead Design Consultant"** (never mention anything else)
3. **She fills folders, not websites** (designers build the real thing)

---

## 🏗️ Architecture

```
Browser (localhost:8080/public/)
    ├── Chat Panel (left)
    └── Preview Panel (right)
         ↓
Proxy Server (localhost:3000)
    ↓
Anthropic Claude API
    ↓
Brain Modules (4 JSON files)
         ↓
Prospect Folder (/prospects/UID/)
    ├── sitemap.json
    ├── metadata.json
    ├── styles.css
    └── assets/
```

---

## 🔧 How to Run

### Terminal 1: Proxy Server
```bash
cd "C:\Users\matth\Documents\StarterNode 2.0\APP\NITYA_V1.1"
npm start
```

### Terminal 2: Static File Server
```bash
cd "C:\Users\matth\Documents\StarterNode 2.0\APP\NITYA_V1.1"
python -m http.server 8080
```

### Terminal 3: Manual Folder Creation (For Testing Phase 3)
```bash
cd "C:\Users\matth\Documents\StarterNode 2.0\APP\NITYA_V1.1"
mkdir -p prospects/test_user_001/assets/icons
mkdir -p prospects/test_user_001/assets/images
```

### Access
Open: `http://localhost:8080/public/`

---

## 📚 Documentation

- **NITYA.md** - Complete vision, strategy, and technical specs
- **CHANGELOG.md** - Build history and current phase status
- **phase_3_build.md** - Architecture for folder-filling system (in chat artifact)

---

## 🎯 Current Status

**Phase 1:** ✅ Complete - Foundation & CORS solution  
**Phase 2:** ✅ Complete - Split-screen interface & file uploads  
**Phase 3:** 🔨 In Development - Folder-based designer handoff

### Phase 3 Goals

Building the folder-filling system:
- [ ] Backend routes write JSON files (sitemap, metadata, styles)
- [ ] System prompt uses tagging protocol
- [ ] Frontend detects tags and calls APIs
- [ ] Files fill in real-time as Nitya talks
- [ ] Designer receives complete folder

**Estimated Time:** 6-8 hours

---

## 🎓 Key Principles

1. **Nitya fills folders, not websites** - Designers build the real thing
2. **Replaces Calendly** - Instant engagement vs scheduling friction
3. **Structured output** = happy designers (no guessing)
4. **One question at a time** - Concise, focused, efficient
5. **Keep momentum** - Perfection kills deals, placeholders work

---

## 🚀 Next Steps

1. **Complete Phase 3:** Folder-filling system with JSON generation
2. **Phase 4:** PocketBase integration (real user auth, conversation storage)
3. **Phase 5:** Proposal generation + Stripe payment
4. **Phase 6:** Production deployment to starternode.com

---

## 📞 Need Help?

- Check `CHANGELOG.md` for current phase status and build order
- Review `NITYA.md` for complete strategy and vision
- Reference `phase_3_build.md` artifact for folder architecture

---

**Version:** 1.1  
**Build Date:** October 17, 2025  
**Status:** Phase 2 Complete | Phase 3 In Development

---

*"Nitya fills folders. Designers build websites. Clients get exactly what they described."*
