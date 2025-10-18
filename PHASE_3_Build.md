# PHASE 3: NITYA FOLDER BUILDER SYSTEM

**Goal:** Transform NITYA from a chatbot into a structured data collection system that fills prospect folders with everything designers need to build real sites.

---

## THE VISION (In One Sentence)

NITYA asks questions, fills files, and hands designers a complete folder with sitemap.json, metadata.json, styles.css, and assets - eliminating Calendly and replacing it with an intelligent intake system.

---

## WHAT WE'RE BUILDING

### The Prospect Folder (Created on Account Creation)

```
/prospects/UID_12345/
├── sitemap.json          ← Pages needed (Home, About, Services, etc.)
├── metadata.json         ← Domain, business info, social URLs
├── styles.css            ← Brand colors, fonts, visual direction
├── index.html            ← Homepage mockup (optional - future phase)
├── assets/
│   ├── icons/
│   │   └── logo.png      ← Logo files
│   └── images/
│       ├── hero.jpg      ← All uploaded images
│       └── about.jpg
└── conversation.json     ← Full chat history for context
```

---

## HOW NITYA FILLS THE FOLDER

### Core Concept: **Structured Extraction + Real-Time File Writing**

As Nitya talks, she:
1. **Detects** what data she's collecting (page names, colors, domain, etc.)
2. **Extracts** structured data from conversation
3. **Writes** to appropriate JSON/CSS files immediately
4. **Updates** preview in real-time

---

## THE ARCHITECTURE

### 1. **BACKEND: New API Endpoints**

Create these routes in `/server/routes/`:

#### A. `/api/update-sitemap` (POST)
```javascript
// Receives page data from Nitya
{
  userId: "UID_12345",
  pages: ["home", "about", "services", "contact", "gallery"]
}

// Writes to: /prospects/UID_12345/sitemap.json
```

#### B. `/api/update-metadata` (POST)
```javascript
// Receives business metadata
{
  userId: "UID_12345",
  data: {
    businessName: "Austin Tacos",
    domain: "austintacos.com",
    email: "hello@austintacos.com",
    phone: "(512) 555-0123",
    social: {
      facebook: "https://facebook.com/austintacos",
      instagram: "@austintacos"
    }
  }
}

// Writes to: /prospects/UID_12345/metadata.json
```

#### C. `/api/update-styles` (POST)
```javascript
// Receives style preferences
{
  userId: "UID_12345",
  styles: {
    primaryColor: "#FF5733",
    secondaryColor: "#440DC3",
    fontHeading: "Montserrat",
    fontBody: "Open Sans",
    referenceUrl: "https://www.mxpx.com/"
  }
}

// Writes to: /prospects/UID_12345/styles.css
```

#### D. `/api/save-conversation` (POST)
```javascript
// Saves full chat history
{
  userId: "UID_12345",
  messages: [
    { role: "assistant", content: "Hey! What's your business name?" },
    { role: "user", content: "Austin Tacos" }
  ]
}

// Writes to: /prospects/UID_12345/conversation.json
```

#### E. `/api/upload` (Already exists, needs minor update)
```javascript
// Current: saves to /prospects/UID/assets/images/
// Update: Add icon detection logic
// If fieldName === "logo" → save to /assets/icons/
// Else → save to /assets/images/
```

---

### 2. **SYSTEM PROMPT: Teach Nitya Her Real Job**

Update `/server/utils/systemPrompt.js` to include:

```
# YOUR REAL JOB

You are NOT building the final website. You are GATHERING DATA to fill a folder.

Your goal: Fill these files for the design team.

## Files You Must Complete:

1. **sitemap.json** - What pages does the client need?
   - Ask: "What pages should we include? Home, About, Services?"
   - Save their answer as a structured list

2. **metadata.json** - Business information
   - Business name
   - Domain (if they have one)
   - Email & phone
   - Social media URLs

3. **styles.css** - Visual direction
   - Ask: "Show me a website you absolutely love that we can model after"
   - Ask about brand colors (educate on hex codes if needed)
   - Ask about fonts they like

4. **assets/** - Collect files
   - Logo (ask them to upload)
   - Images (hero, about, team photos)

## How to Behave:

### SET EXPECTATIONS FIRST:
"Hey! Quick thing - StarterNode is a turnkey design agency. Our goal is to make sure your site increases visibility through SEO and converts visitors into customers. This conversation is just to gather details and create a mockup sketch. I'll ask questions, you answer, and we'll draft it together. Then our design team polishes it and makes it beautiful. Don't worry if you don't have everything ready - we're just getting started!"

### ASK ONE QUESTION AT A TIME
Don't dump paragraphs. Be concise.

### EDUCATE WHEN NEEDED
If they don't know what a hex code is, explain it simply.

### CALL BACKEND APIS
When you collect data, tell the frontend to save it:
- Collected business name? → update-metadata
- Collected pages list? → update-sitemap
- Collected colors? → update-styles
- They uploaded file? → Already handled by upload endpoint

### KEEP MOMENTUM
If they don't have something, use a placeholder and move on.
```

---

### 3. **FRONTEND: Detection & API Calls**

Update `/public/app.js` to detect when Nitya collects data:

#### A. Add Data Detection Logic

```javascript
// After receiving Nitya's response
detectDataCollection(nityaMessage) {
    // Detect sitemap updates
    if (nityaMessage.includes('[SITEMAP]')) {
        const pages = this.extractPages(nityaMessage);
        this.updateSitemap(pages);
    }
    
    // Detect metadata updates
    if (nityaMessage.includes('[METADATA]')) {
        const metadata = this.extractMetadata(nityaMessage);
        this.updateMetadata(metadata);
    }
    
    // Detect styles updates
    if (nityaMessage.includes('[STYLES]')) {
        const styles = this.extractStyles(nityaMessage);
        this.updateStyles(styles);
    }
}
```

#### B. Add API Call Functions

```javascript
async updateSitemap(pages) {
    await fetch('http://localhost:3000/api/update-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: this.userId,
            pages: pages
        })
    });
}

async updateMetadata(data) {
    await fetch('http://localhost:3000/api/update-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: this.userId,
            data: data
        })
    });
}

async updateStyles(styles) {
    await fetch('http://localhost:3000/api/update-styles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: this.userId,
            styles: styles
        })
    });
}

// Save conversation after every message
async saveConversation() {
    await fetch('http://localhost:3000/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: this.userId,
            messages: this.messageHistory
        })
    });
}
```

---

### 4. **THE TAGGING PROTOCOL**

Teach Nitya to use special tags when she collects data:

#### Example Conversation:

**Nitya:** "What pages should we include on your site?"

**User:** "Home, About, Menu, and Contact"

**Nitya:** "Perfect! [SITEMAP: home, about, menu, contact] Got it - Home, About, Menu, and Contact. Now, what's your business name?"

**User:** "Austin Tacos"

**Nitya:** "Love it! [METADATA: businessName=Austin Tacos] And what's your domain if you have one?"

---

### 5. **FILE GENERATION LOGIC**

Backend routes that write actual files:

#### `/server/routes/update-sitemap.js`

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, pages } = req.body;
        
        const sitemap = {
            pages: pages.map(page => ({
                name: page,
                slug: page.toLowerCase().replace(/\s+/g, '-'),
                order: pages.indexOf(page) + 1
            })),
            updatedAt: new Date().toISOString()
        };
        
        const filePath = path.join(__dirname, `../../prospects/${userId}/sitemap.json`);
        await fs.writeFile(filePath, JSON.stringify(sitemap, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

#### `/server/routes/update-metadata.js`

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, data } = req.body;
        
        const filePath = path.join(__dirname, `../../prospects/${userId}/metadata.json`);
        
        // Read existing metadata if it exists
        let metadata = {};
        try {
            const existing = await fs.readFile(filePath, 'utf8');
            metadata = JSON.parse(existing);
        } catch (e) {
            // File doesn't exist yet, start fresh
        }
        
        // Merge new data
        metadata = {
            ...metadata,
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        await fs.writeFile(filePath, JSON.stringify(metadata, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

#### `/server/routes/update-styles.js`

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, styles } = req.body;
        
        // Generate actual CSS
        const css = `
/* Auto-generated by NITYA AI */
/* Client: ${userId} */
/* Generated: ${new Date().toISOString()} */

:root {
    /* Brand Colors */
    --primary: ${styles.primaryColor || '#440DC3'};
    --secondary: ${styles.secondaryColor || '#00bf63'};
    
    /* Typography */
    --font-heading: '${styles.fontHeading || 'system-ui'}', sans-serif;
    --font-body: '${styles.fontBody || 'system-ui'}', sans-serif;
}

/* Reference Site: ${styles.referenceUrl || 'None provided'} */
`;
        
        const filePath = path.join(__dirname, `../../prospects/${userId}/styles.css`);
        await fs.writeFile(filePath, css);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

#### `/server/routes/save-conversation.js`

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, messages } = req.body;
        
        const conversation = {
            userId: userId,
            messages: messages,
            savedAt: new Date().toISOString()
        };
        
        const filePath = path.join(__dirname, `../../prospects/${userId}/conversation.json`);
        await fs.writeFile(filePath, JSON.stringify(conversation, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

---

### 6. **WIRE UP NEW ROUTES IN PROXY SERVER**

Update `/server/proxy-server.js`:

```javascript
const express = require('express');
const cors = require('cors');

// Import routes
const chatRoute = require('./routes/chat');
const uploadRoute = require('./routes/upload');
const saveRoute = require('./routes/save');
const updateSitemapRoute = require('./routes/update-sitemap');
const updateMetadataRoute = require('./routes/update-metadata');
const updateStylesRoute = require('./routes/update-styles');
const saveConversationRoute = require('./routes/save-conversation');

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.post('/api/chat', chatRoute);
app.post('/api/upload', uploadRoute);
app.post('/api/save', saveRoute);
app.post('/api/update-sitemap', updateSitemapRoute);
app.post('/api/update-metadata', updateMetadataRoute);
app.post('/api/update-styles', updateStylesRoute);
app.post('/api/save-conversation', saveConversationRoute);

// Serve prospect files statically
app.use('/prospects', express.static('../prospects'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Nitya AI Proxy Server running on http://localhost:${PORT}`);
});
```

---

## TESTING PLAN

### Manual Setup (For This Phase):

1. **Create test folder structure:**
```bash
mkdir -p prospects/test_user_001/assets/icons
mkdir -p prospects/test_user_001/assets/images
```

2. **Start both servers:**
```bash
# Terminal 1
npm start

# Terminal 2  
python -m http.server 8080
```

3. **Test conversation flow:**
   - Open: `http://localhost:8080/public/`
   - Chat with Nitya
   - She asks about pages → Check `prospects/test_user_001/sitemap.json`
   - She asks about business → Check `prospects/test_user_001/metadata.json`
   - She asks about colors → Check `prospects/test_user_001/styles.css`
   - Upload logo → Check `prospects/test_user_001/assets/icons/`
   - Upload images → Check `prospects/test_user_001/assets/images/`

4. **Verify file contents:**
After conversation, all files should exist with real data.

---

## THE BUILD ORDER

### Step 1: Backend Routes (2-3 hours)
- Create 4 new route files
- Implement file writing logic
- Wire up in proxy-server.js

### Step 2: System Prompt Update (1 hour)
- Add expectation-setting greeting
- Add tagging protocol
- Add file completion instructions

### Step 3: Frontend Detection (2 hours)
- Add tag parsing logic
- Add API call functions
- Test data flow

### Step 4: Upload Route Update (30 min)
- Add icon vs image detection
- Update save paths

### Step 5: Testing (1-2 hours)
- Run full conversation
- Verify all files generate correctly
- Check data accuracy

**Total Time: 6-8 hours**

---

## SUCCESS CRITERIA

After Phase 3 is complete, this should happen:

1. ✅ User chats with Nitya
2. ✅ Nitya fills `sitemap.json` with page list
3. ✅ Nitya fills `metadata.json` with business info
4. ✅ Nitya fills `styles.css` with brand colors/fonts
5. ✅ Nitya collects logo → `assets/icons/`
6. ✅ Nitya collects images → `assets/images/`
7. ✅ Full conversation saved to `conversation.json`
8. ✅ Designer opens `/prospects/UID/` and has EVERYTHING needed

---

## WHAT COMES NEXT (Phase 4)

- PocketBase integration (real user accounts)
- Auto-generate `index.html` mockup
- Email notification to design team
- Designer inbox/dashboard
- Stripe payment integration
- Proposal generation

---

## THE BOTTOM LINE

**Current:** NITYA is a chatbot that uploads files to the wrong place.

**After Phase 3:** NITYA is a structured data collector that fills designer-ready folders.

**The Shift:** From "AI website builder" to "AI intake specialist."

This is what you've been saying 300 times. Now let's build it.